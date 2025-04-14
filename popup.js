document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("toggleBlur");

  chrome.storage.sync.get("blurEnabled", (data) => {
    checkbox.checked = data.blurEnabled ?? true;
  });

  checkbox.addEventListener("change", () => {
    chrome.storage.sync.set({ blurEnabled: checkbox.checked }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
});
