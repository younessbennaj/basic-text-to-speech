document.addEventListener("DOMContentLoaded", () => {
  /* Elements */
  const voicesSelect = document.getElementById("voice");
  const langSelect = document.getElementById("lang");
  const textArea = document.getElementById("text");
  const form = document.getElementById("speech-form");
  const radioInputs = document.querySelectorAll("input[type=radio]");
  const submitButton = document.getElementById("submit");

  /* Local states */
  let text = "";
  let voices = [];
  // It can range between 0.1 (lowest) and 10 (highest), 1 default.
  let rate = 1;
  let currentVoice = null;

  /* Functions */

  function fillVoiceSelectWithOptions(lang) {
    const newVoices = voices.filter((voice) => {
      return voice.lang === lang;
    });

    newVoices.forEach((voice) => {
      const option = document.createElement("option");
      option.innerText = voice.name;
      voicesSelect.appendChild(option);
    });

    currentVoice = newVoices[0];
  }

  function fillLangSelectWithOptions(languages) {
    languages.forEach((lang) => {
      const option = document.createElement("option");
      option.innerText = lang;
      langSelect.appendChild(option);
    });
  }

  /* Event listeners */

  speechSynthesis.addEventListener("voiceschanged", () => {
    voices = speechSynthesis.getVoices();

    let languages = Array.from(new Set(voices.map((voice) => voice.lang)));

    fillLangSelectWithOptions(languages);
    fillVoiceSelectWithOptions(languages[0]);
  });

  langSelect.addEventListener("change", (e) => {
    voicesSelect.innerHTML = "";
    const lang = e.currentTarget.value;
    fillVoiceSelectWithOptions(lang);
  });

  voicesSelect.addEventListener("change", (e) => {
    const voiceName = e.currentTarget.value;
    const voice = voices.find((voice) => voice.name === voiceName);
    currentVoice = voice;
  });

  textArea.addEventListener("change", (e) => {
    text = e.currentTarget.value;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.rate = rate;
    utterThis.voice = currentVoice;
    speechSynthesis.speak(utterThis);

    utterThis.addEventListener("start", (event) => {
      submitButton.setAttribute("disabled", true);
    });

    utterThis.addEventListener("end", (event) => {
      submitButton.removeAttribute("disabled");
    });
  });

  radioInputs.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      rate = Number(e.currentTarget.value);
      console.log(rate);
    });
  });
});
