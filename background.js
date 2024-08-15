(function() {
  console.log('%c Extension Background Script Loaded ', 'background: #222; color: #bada55; font-size: 20px;');

  let currentLine = 0;

  chrome.commands.onCommand.addListener((command) => {
    console.log('%c Command Received: ' + command, 'background: #222; color: #bada55');
    if (command === "replace-text") {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          ensureContentScriptLoaded(tabs[0].id, () => {
            sendReplaceTextMessage(tabs[0].id);
          });
        }
      });
    }
  });

  function ensureContentScriptLoaded(tabId, callback) {
    chrome.tabs.sendMessage(tabId, {action: "ping"}, response => {
      if (chrome.runtime.lastError) {
        console.log("Content script not ready. Injecting content script.");
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        }, () => {
          if (chrome.runtime.lastError) {
            console.error('Failed to inject content script:', chrome.runtime.lastError);
          } else {
            console.log("Content script injected successfully");
            callback();
          }
        });
      } else {
        console.log("Content script is ready");
        callback();
      }
    });
  }

  function sendReplaceTextMessage(tabId) {
    chrome.storage.local.get(['replacementText', 'prependString'], (data) => {
      console.log("Stored replacement text:", data.replacementText);
      console.log("Stored prepend string:", data.prependString);
      if (data.replacementText) {
        const lines = data.replacementText.split('\n');
        if (currentLine >= lines.length) {
          currentLine = 0;
        }
        let lineToInsert = lines[currentLine].trim();
        if (data.prependString) {
          lineToInsert = data.prependString + lineToInsert;
        }
        currentLine++;
        
        console.log("Sending message to content script. Line to insert:", lineToInsert);
        chrome.tabs.sendMessage(tabId, {action: "replaceText", text: lineToInsert}, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Message sent successfully. Response:", response);
          }
        });
      } else {
        console.log("No replacement text found in storage");
      }
    });
  }
})();