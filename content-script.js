document.addEventListener("selectionchange", () => {
  const selectedText = window.getSelection().toString();

  console.log(JSON.stringify(chrome.runtime));

  if (selectedText.length > 0) {
    chrome.runtime
      .sendMessage({
        message: selectedText,
      })
      .catch((e) => console.error(e));
  }
});
