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
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Fade,
  Divider,
} from "@mui/material";
import {
  ContentCopy,
  Delete,
  Send,
  Refresh,
  AutoAwesome,
  Email,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import API_CONFIG from "./config";
import "./App.css";

function App() {
  const [emailContent, setemailContent] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setloading] = useState(false);
  const [generatedReply, setgeneratedReply] = useState("");
  const [copied, setCopied] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  // Update character and word count
  useEffect(() => {
    setCharCount(emailContent.length);
    const words = emailContent.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [emailContent]);

  const handleSubmit = async () => {
    setloading(true);
    setError("");
    setShowResult(false);
    
    try {
      const res = await axios.post(`${API_CONFIG.baseURL}/api/email/generate`, {
        emailContent,
        tone,
      });
      setgeneratedReply(
        typeof res.data === "string" ? res.data : JSON.stringify(res.data)
      );
      setShowResult(true);
    } catch (error) {
      console.error("Error generating email:", error);
      
      // Handle different error types
      if (error.response?.status === 429) {
        setError("⚠️ Rate limit exceeded. Please wait a moment and try again.");
      } else if (error.response?.data?.error) {
        setError(`${error.response.data.error}`);
      } else {
        setError("Failed to generate email. Please check your connection and try again.");
      }
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
    setShowResult(false);
    setError("");
  };

  const handleRegenerate = () => {
    handleSubmit();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={24}
            className="glassmorphism"
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
                <AutoAwesome sx={{ fontSize: 40, color: "#667eea" }} />
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{ 
                    fontWeight: "bold", 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "2rem", md: "3rem" }
                  }}
                >
                  AI Email Writer
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ color: "#666", mb: 2 }}>
                Generate professional email replies in seconds with AI
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Chip label="Fast" size="small" color="primary" variant="outlined" />
                <Chip label="Smart" size="small" color="secondary" variant="outlined" />
                <Chip label="Professional" size="small" color="success" variant="outlined" />
              </Stack>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Input Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: "#333", fontWeight: 600 }}>
                📥 Original Email
              </Typography>
              
              <TextField
                fullWidth
                multiline
                autoFocus
                rows={6}
                variant="outlined"
                label="Paste the email you want to reply to"
                placeholder="Enter the email content here..."
                value={emailContent}
                onChange={(e) => setemailContent(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f8f9fa",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#fff",
                    },
                  },
                }}
              />
              
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip 
                  icon={<Email />} 
                  label={`${charCount} characters`} 
                  size="small" 
                  variant="outlined" 
                />
                <Chip 
                  label={`${wordCount} words`} 
                  size="small" 
                  variant="outlined" 
                />
              </Stack>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Tone</InputLabel>
                <Select
                  value={tone}
                  label="Tone"
                  onChange={(e) => setTone(e.target.value)}
                  sx={{
                    backgroundColor: "#f8f9fa",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Auto (Let AI decide)</em>
                  </MenuItem>
                  <MenuItem value="Professional">💼 Professional</MenuItem>
                  <MenuItem value="Friendly">😊 Friendly</MenuItem>
                  <MenuItem value="Casual">👋 Casual</MenuItem>
                  <MenuItem value="Formal">🎩 Formal</MenuItem>
                  <MenuItem value="Enthusiastic">🎉 Enthusiastic</MenuItem>
                </Select>
              </FormControl>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleSubmit}
                  disabled={!emailContent || loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                    },
                    "&:disabled": {
                      background: "#ccc",
                    },
                  }}
                >
                  {loading ? "Generating..." : "Generate Reply"}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={handleClear}
                  startIcon={<Delete />}
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    borderColor: "#667eea",
                    color: "#667eea",
                    "&:hover": {
                      borderColor: "#764ba2",
                      backgroundColor: "rgba(102, 126, 234, 0.05)",
                    },
                  }}
                >
                  Clear All
                </Button>
              </Stack>
            </Box>

            {/* Error Message */}
            {error && (
              <Fade in={true}>
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
                  {error}
                </Alert>
              </Fade>
            )}

            {/* Output Section */}
            {showResult && generatedReply && (
              <Fade in={showResult} timeout={500}>
                <Box>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h6" sx={{ color: "#333", fontWeight: 600 }}>
                      📤 Generated Reply
                    </Typography>
                    <Chip 
                      icon={<AutoAwesome />} 
                      label="AI Generated" 
                      size="small" 
                      color="primary" 
                    />
                  </Box>

                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    variant="outlined"
                    value={generatedReply}
                    inputProps={{ readOnly: true }}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#f8f9fa",
                        fontFamily: "inherit",
                      },
                    }}
                  />

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleCopy}
                      startIcon={<ContentCopy />}
                      sx={{
                        py: 1.2,
                        fontWeight: "bold",
                        borderRadius: 2,
                        textTransform: "none",
                        background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                        boxShadow: "0 4px 15px rgba(56, 239, 125, 0.4)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 20px rgba(56, 239, 125, 0.6)",
                        },
                      }}
                    >
                      Copy to Clipboard
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleRegenerate}
                      disabled={loading}
                      startIcon={<Refresh />}
                      sx={{
                        py: 1.2,
                        fontWeight: "bold",
                        borderRadius: 2,
                        textTransform: "none",
                        borderColor: "#667eea",
                        color: "#667eea",
                        "&:hover": {
                          borderColor: "#764ba2",
                          backgroundColor: "rgba(102, 126, 234, 0.05)",
                        },
                      }}
                    >
                      Regenerate
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            )}

            {/* Footer */}
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="caption" sx={{ color: "#999" }}>
                Powered by Google Gemini AI • Made with ❤️
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          ✅ Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
