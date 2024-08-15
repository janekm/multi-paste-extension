(function() {
  console.log("Content script loaded");

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in content script:", request);
    
    if (request.action === "ping") {
      console.log("Ping received, sending response");
      sendResponse({status: "ready"});
      return true;
    }
    
    if (request.action === "replaceText") {
      const activeElement = document.activeElement;
      console.log("Active element:", activeElement);
      
      const replaceText = (element) => {
        console.log("Attempting to replace text with:", request.text);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          const oldValue = element.value;
          element.value = request.text;
          element.selectionStart = element.selectionEnd = request.text.length;
          
          // Trigger input event
          const inputEvent = new Event('input', { bubbles: true });
          element.dispatchEvent(inputEvent);
          
          console.log("Text replaced. Old value:", oldValue, "New value:", element.value);
        } else if (element.isContentEditable) {
          // For contenteditable elements, we need to clear the content first
          const oldValue = element.textContent;
          element.textContent = '';
          document.execCommand('insertText', false, request.text);
          console.log("Text replaced in contenteditable element. Old value:", oldValue, "New value:", element.textContent);
        }
      };

      if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable) {
        console.log("Replacing text in active element");
        replaceText(activeElement);
      } else {
        console.log("No suitable active element found");
      }
      
      sendResponse({status: "text replacement attempted"});
      return true;
    }
  });
})();