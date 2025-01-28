export const speakText = (text: string) => {
    console.log('speakText called with:', text);
    const synth = window.speechSynthesis;
    if (!synth) {
        console.error('Speech synthesis not supported');
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => console.log('Speech started');
    utterance.onend = () => console.log('Speech ended');
    utterance.onerror = (event) => console.error('Speech error', event);
    synth.speak(utterance);
};