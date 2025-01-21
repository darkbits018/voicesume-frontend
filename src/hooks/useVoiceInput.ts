import { useEffect, useState, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn('Browser does not support speech recognition.');
    }
  }, [browserSupportsSpeechRecognition]);

  const startListening = useCallback(() => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  }, [resetTranscript]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition
  };
}