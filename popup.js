document.addEventListener('DOMContentLoaded', function() {
  const textBox = document.getElementById('textBox');
  const prependInput = document.getElementById('prependString');
  const saveButton = document.getElementById('saveButton');
  const statusDiv = document.getElementById('status');

  const CHUNK_SIZE = 8000; // Adjust this value if needed

  function updateStatus(message) {
    console.log(message);
    statusDiv.textContent = message;
    setTimeout(() => {
      statusDiv.textContent = '';
    }, 3000);
  }

  function saveTextInChunks(text) {
    const chunks = [];
    for (let i = 0; i < text.length; i += CHUNK_SIZE) {
      chunks.push(text.slice(i, i + CHUNK_SIZE));
    }
    
    const storageObject = {
      chunkCount: chunks.length,
      prependString: prependInput.value
    };

    // Add each chunk to the storage object with a unique key
    chunks.forEach((chunk, index) => {
      storageObject[`chunk_${index}`] = chunk;
    });

    return new Promise((resolve, reject) => {
      chrome.storage.local.set(storageObject, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  function loadTextFromChunks() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(null, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (result.chunkCount) {
          const chunks = [];
          for (let i = 0; i < result.chunkCount; i++) {
            chunks.push(result[`chunk_${i}`]);
          }
          resolve({
            text: chunks.join(''),
            prependString: result.prependString || ''
          });
        } else {
          resolve({ text: '', prependString: '' });
        }
      });
    });
  }

  // Load saved text and prepend string
  loadTextFromChunks().then((data) => {
    textBox.value = data.text;
    prependInput.value = data.prependString;
    updateStatus('Loaded saved data');
  }).catch((error) => {
    updateStatus('Error loading saved data: ' + error.message);
  });

  // Save text and prepend string when button is clicked
  saveButton.addEventListener('click', function() {
    saveTextInChunks(textBox.value).then(() => {
      updateStatus('Data saved successfully');
      console.log('Verified: Data saved successfully');
    }).catch((error) => {
      updateStatus('Error saving data: ' + error.message);
    });
  });

  console.log('Popup script loaded');
});