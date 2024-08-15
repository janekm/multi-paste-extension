# Text Replacer Chrome Extension

## Overview

The Text Replacer is a Chrome extension that allows users to quickly replace text in input fields and textareas with predefined content. It's especially useful for repetitive data entry tasks or for inserting frequently used text snippets.

## Features

- Replace text in any input field or textarea with a single keyboard shortcut
- Define multiple lines of replacement text
- Add a custom prepend string to each line of replacement text
- Cycle through replacement text lines with each use of the shortcut

## How It Works

1. Users can enter multiple lines of replacement text in the extension's popup window.
2. An optional prepend string can be set, which will be added to the beginning of each line of replacement text.
3. When the user activates the extension using the keyboard shortcut (default: Ctrl+Shift+Y), it replaces the text in the currently focused input field or textarea with the next line of replacement text.
4. The extension cycles through the lines of replacement text, returning to the first line after using the last one.

## Installation

To install the Text Replacer extension:

1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" button that appears after enabling developer mode.
5. Navigate to the directory where you saved the extension files and select it.
6. The Text Replacer extension should now appear in your list of installed extensions.

## Usage

1. Click on the Text Replacer icon in your Chrome toolbar to open the popup.
2. In the popup window:
   - Enter your desired prepend string in the top input field (optional).
   - Enter your replacement text in the large text area, with each line representing a separate piece of text to be inserted.
   - Click "Save" to store your settings.
3. Focus on any input field or textarea on a webpage.
4. Press Ctrl+Shift+Y (or your custom shortcut if changed) to replace the existing text with the next line from your saved replacement text.

## Customization

You can customize the keyboard shortcut for the extension:

1. Go to `chrome://extensions/shortcuts`.
2. Find "Text Replacer" in the list.
3. Click on the pencil icon next to the current shortcut.
4. Press your desired key combination.
5. Click "OK" to save the new shortcut.

## Troubleshooting

If the extension doesn't work as expected:

1. Make sure you've saved your replacement text in the popup window.
2. Check that you're focused on an input field or textarea when using the shortcut.
3. Reload the webpage you're trying to use the extension on.
4. If issues persist, try disabling and re-enabling the extension, or uninstalling and reinstalling it.

## Contributing

Contributions to improve Text Replacer are welcome. Please feel free to submit pull requests or create issues for bugs and feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
