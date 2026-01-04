import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function App() {
  const [emailContent, setemailContent] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setloading] = useState(false);
  const [generatedReply, setgeneratedReply] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setloading(true);
    try {
      const res = await axios.post("https://ai-email-writer-1-v7tp.onrender.com/api/email/generate" || "http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
      });
      setgeneratedReply(
        typeof res.data === "string" ? res.data : JSON.stringify(res.data)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
  };

  const handleClear = () => {
    setemailContent("");
    setTone("");
    setgeneratedReply("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "#1e1e1e",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            ✉️ AI Email Reply Generator
          </Typography>

          {/* Input Section */}
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              multiline
              autoFocus
              rows={6}
              variant="outlined"
              label="Original Email Content"
              value={emailContent}
              onChange={(e) => setemailContent(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiInputBase-root": { color: "white" },
                "& .MuiInputLabel-root": { color: "#aaa" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
              }}
            />

            <FormControl
              fullWidth
              sx={{
                mb: 3,
                "& .MuiInputLabel-root": { color: "#aaa" },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#555" },
                },
              }}
            >
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Professional">Professional</MenuItem>
                <MenuItem value="Friendly">Friendly</MenuItem>
                <MenuItem value="Casual">Casual</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleSubmit}
                disabled={!emailContent || loading}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 3,
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "#bbb",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  "&.Mui-disabled": {
                    color: "rgba(255,255,255,0.5)", // lighter gray text
                    borderColor: "rgba(255,255,255,0.3)", // subtle border
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Generate Reply"
                )}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleClear}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 3,
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "#bbb",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Clear
              </Button>
            </Box>
          </Box>

          {/* Output Section */}
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={generatedReply}
              inputProps={{ readOnly: true }}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
              }}
            />

            <Button
              variant="outlined"
              fullWidth
              disabled={!generatedReply}
              onClick={handleCopy}
              sx={{
                py: 1.2,
                borderRadius: 3,
                fontWeight: "bold",
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "#bbb",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
                "&.Mui-disabled": {
                  color: "rgba(255,255,255,0.5)", // lighter gray text
                  borderColor: "rgba(255,255,255,0.3)", // subtle border
                },
              }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar for copy success */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}

export default App;