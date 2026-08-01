// Utilitário de seleção de voz para narração (SpeechSynthesis)
// Intercepta window.speechSynthesis.speak para aplicar a voz escolhida pelo usuário
// em TODAS as narrações do app, sem precisar modificar cada página.

const VOICE_STORAGE_KEY = 'forja_selected_voice_uri';

export function getSelectedVoiceURI() {
  try {
    return localStorage.getItem(VOICE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setSelectedVoiceURI(uri) {
  try {
    if (uri) {
      localStorage.setItem(VOICE_STORAGE_KEY, uri);
    } else {
      localStorage.removeItem(VOICE_STORAGE_KEY);
    }
  } catch {}
}

export function getAvailableVoices() {
  if (!window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

// Filtra vozes em português primeiro; se não houver, retorna todas
export function getPortugueseVoices() {
  const voices = getAvailableVoices();
  const pt = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('pt'));
  return pt.length > 0 ? pt : voices;
}

let _originalSpeak = null;
let _initialized = false;

// Inicializa o interceptador global — chamar uma vez no boot do app
export function initSpeechVoice() {
  if (_initialized || !window.speechSynthesis) return;
  _initialized = true;

  // Força o carregamento das vozes (alguns navegadores carregam assíncrono)
  window.speechSynthesis.getVoices();

  _originalSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
  window.speechSynthesis.speak = function (utterance) {
    const selectedURI = getSelectedVoiceURI();
    if (selectedURI) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.voiceURI === selectedURI);
      if (voice) {
        utterance.voice = voice;
      }
    }
    return _originalSpeak(utterance);
  };
}