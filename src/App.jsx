import { useState } from 'react'
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
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import EmailBackground from './components/EmailBackground'
import axios from 'axios'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      })
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
    } catch (error) {
      setError('Failed to generate email reply. Please try again')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="fixed inset-0 z-0">
        <EmailBackground />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full"
        >
          <Container
            maxWidth="md"
            className="w-full p-8 bg-white/10 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                className="text-center font-bold text-white drop-shadow-md mb-6"
              >
                Email Reply Generator
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TextField
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                label="Original email content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.75rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#aaa',
                  },
                }}
                InputLabelProps={{ style: { color: '#aaa' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ color: '#aaa' }}>Tone (Optional)</InputLabel>
                <Select
                  value={tone}
                  label="Tone (Optional)"
                  onChange={(e) => setTone(e.target.value)}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '0.75rem',
                    '& .MuiSvgIcon-root': {
                      color: '#ccc',
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                  <MenuItem value="concise">Concise</MenuItem>
                  <MenuItem value="apologetic">Apologetic</MenuItem>
                  <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
                  <MenuItem value="persuasive">Persuasive</MenuItem>
                  <MenuItem value="empathetic">Empathetic</MenuItem>
                  <MenuItem value="appreciative">Appreciative</MenuItem>
                  <MenuItem value="informative">Informative</MenuItem>
                </Select>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!emailContent || loading}
                fullWidth
                sx={{
                  backgroundColor: '#3b82f6',
                  '&:hover': { backgroundColor: '#2563eb' },
                  mb: 3,
                  height: 48,
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: '#93c5fd' }} />
                ) : (
                  'Generate Reply'
                )}
              </Button>
            </motion.div>

            <AnimatePresence>
              {generatedReply && !error && (
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h6" className="text-white mb-2">
                    Generated Reply:
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    variant="outlined"
                    value={generatedReply}
                    inputProps={{ readOnly: true }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '0.75rem',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: 'white',
                      },
                    }}
                  />
                  <Button variant="outlined" onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy to clipboard'}
                  </Button>
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Typography
                          sx={{ mt: 1 }}
                          variant="body2"
                          className="text-green-400"
                        >
                          Copied to clipboard!
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Box className="p-3 mt-2 rounded-lg border border-red-500 bg-red-500/10 text-red-300">
                  {error}
                </Box>
              </motion.div>
            )}
          </Container>
        </motion.div>
      </div>
    </div>
  )
}

export default App
