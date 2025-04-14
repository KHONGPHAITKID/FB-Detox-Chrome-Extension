# FB-Detox-Chrome-Extension

**FB Detox** is a Chrome Extension designed to help you stay focused by automatically blurring distracting media (images and videos) on Facebook. Only when you consciously click on the content will it be revealed — giving you full control over your attention.

---

## 🚀 Features

- 🔒 **Blur Images & Videos**: Automatically blur media elements on Facebook to reduce distractions.
- 🖱️ **Click to Reveal**: Click on a blurred image or video to reveal it temporarily.
- 🧠 **Focus-Friendly**: Supports intentional viewing and helps break doom-scrolling habits.
- 🎛️ **Enable/Disable Toggle**: Easily turn the extension on or off via the popup.
- 📏 **Smart Filtering**: Excludes small media (e.g. profile pictures under 100x100).
- ✨ **Excludes Messenger**: Automatically ignores `facebook.com/messages` to keep your chats distraction-free.

---

## 📦 Installation

1. Clone or download this repo.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer Mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. The extension icon should now appear in your toolbar!

---

## 🧪 Development

This project uses:

- `manifest_version: 2`
- `content_scripts` to apply blurring on Facebook
- `storage.sync` for saving toggle state
- `MutationObserver` and URL polling to handle dynamic Facebook changes
