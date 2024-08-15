document.addEventListener('DOMContentLoaded', function() {
  const textBox = document.getElementById('textBox');
  const prependInput = document.getElementById('prependString');
  const saveButton = document.getElementById('saveButton');
  const statusDiv = document.getElementById('status');

  function updateStatus(message) {
    console.log(message);
    statusDiv.textContent = message;
    setTimeout(() => {
      statusDiv.textContent = '';
    }, 3000);
  }

  // Load saved text and prepend string
  chrome.storage.local.get(['replacementText', 'prependString'], function(result) {
    if (chrome.runtime.lastError) {
      updateStatus('Error loading saved data: ' + chrome.runtime.lastError.message);
    } else {
      if (result.replacementText) {
        textBox.value = result.replacementText;
        updateStatus('Loaded saved text');
      }
      if (result.prependString) {
        prependInput.value = result.prependString;
        updateStatus('Loaded prepend string');
      }
    }
  });

  // Save text and prepend string when button is clicked
  saveButton.addEventListener('click', function() {
    const newText = textBox.value;
    const newPrependString = prependInput.value;
    chrome.storage.local.set({
      replacementText: newText,
      prependString: newPrependString
    }, function() {
      if (chrome.runtime.lastError) {
        updateStatus('Error saving data: ' + chrome.runtime.lastError.message);
      } else {
        updateStatus('Data saved successfully');
        // Verify the save by immediately reading it back
        chrome.storage.local.get(['replacementText', 'prependString'], function(result) {
          if (result.replacementText === newText && result.prependString === newPrependString) {
            console.log('Verified: Data saved and retrieved successfully');
          } else {
            console.log('Verification failed: Saved data does not match retrieved data');
          }
        });
      }
    });
  });

  console.log('Popup script loaded');
});