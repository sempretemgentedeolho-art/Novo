import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { initSpeechVoice } from '@/lib/speech'

initSpeechVoice();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)