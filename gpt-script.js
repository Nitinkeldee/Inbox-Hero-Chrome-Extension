chrome.runtime.onMessage.addListener(function (
  emailContent,
  sender,
  sendResponse
) {
  const textArea = document.querySelector("textarea");
  textArea.value =
    "Respond to the most recent email in a professional tone and sign off with my name (Nitin Kelde) at the end: /n" +
    emailContent;
  const button = textArea.nextElementSibling;
  button.removeAttribute("disabled");
  button.click();

  const callback = function (mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.attributeName === "disabled") {
        if (button.disabled === false) {
          const responses = document.querySelector(
            "#__next div div main div div div div"
          ).childNodes;
          const lastResponse = responses[responses.length - 2];
          const lastResponseText = lastResponse.innerText;
        }
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(button, { attributes: true });
  return true;
});
