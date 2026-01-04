// console.log("Paras Ningune")

function getEmailContent () {
    const selectors = ['.h7', '.a3s.aiL', '.gmail_quote', '[role="presentation"]'];

    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        }
        return '';
    }
} 
function findComposeToolbar() {
    const selectors = ['.btC','.aDh',  '[role="dialog"]', '.gU.Up'];
    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;
        }
        return null;
    }
}

function createAiButton() {
    const button = document.createElement('div');
    button.className= 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    return button;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if(existingButton){
        existingButton.remove();
    }

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("ToolBar Not Found");
    }

    console.log("ToolBar Found");

    const button = createAiButton();
    button.classList.add('.ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = "Generating..."
            button.disabled = true;
            const emailContent = getEmailContent();

            const res = await fetch('https://ai-email-writer-1-v7tp.onrender.com/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
                }
            );
            
            if(!res.ok) {
                throw new Error("API Request Failed");
            }
            
            // Get the plain text response
            let generatedReply = await res.text();
            
            // Remove any JSON quotes if present
            if (generatedReply.startsWith('"') && generatedReply.endsWith('"')) {
                generatedReply = generatedReply.slice(1, -1);
            }
            
            // Unescape newlines and other escape sequences
            generatedReply = generatedReply
                .replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t')
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\');
            
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]')

            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply)
            }
        } catch (error) {
            
        } finally {
            button.innerHTML = "AI Reply"
            button.disabled = false;
        }
    })

    toolbar.insertBefore(button, toolbar.firstChild)
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if(hasComposeElements){
            console.log("Elmaillllll")
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
})