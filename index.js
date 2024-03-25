speechSynthesis.addEventListener("voiceschanged", () => {
  const voices = speechSynthesis.getVoices();
  console.log(voices);
});
