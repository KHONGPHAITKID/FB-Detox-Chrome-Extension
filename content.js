// content.js

/**
 * Determines whether the current page should be excluded from blurring.
 * @returns {boolean}
 */
function isExcludedPage() {
  return location.href.includes("facebook.com/messages");
}

/**
 * Checks whether the given media element should be blurred.
 * @param {HTMLElement} element - The image or video element.
 * @param {number} minSize - Minimum dimension threshold.
 * @returns {boolean}
 */
function shouldBlurElement(element, minSize = 100) {
  const width = element.naturalWidth || element.videoWidth || element.width || element.clientWidth;
  const height = element.naturalHeight || element.videoHeight || element.height || element.clientHeight;
  return width >= minSize && height >= minSize && !element.classList.contains("fb-blurred");
}

/**
 * Applies blur effect and click toggle to an image element.
 * @param {HTMLImageElement} img
 */
function blurImage(img) {
  if (!shouldBlurElement(img)) return;

  img.classList.add("fb-blurred");
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    img.classList.toggle("fb-blurred");
  });
}

/**
 * Applies blur effect and click toggle to a video element.
 * @param {HTMLVideoElement} video
 */
function blurVideo(video) {
  if (!shouldBlurElement(video)) return;

  video.classList.add("fb-blurred");
  video.pause();
  video.muted = true;
  video.removeAttribute("autoplay");
  video.setAttribute("preload", "none");

  video.addEventListener("click", (e) => {
    e.stopPropagation();
    video.classList.toggle("fb-blurred");

    if (video.classList.contains("fb-blurred")) {
      video.pause();
    } else {
      video.play();
    }
  });
}

/**
 * Blurs media elements on the page based on extension settings.
 */
function blurMediaElements() {
  chrome.storage.sync.get("blurEnabled", ({ blurEnabled }) => {
    if (!blurEnabled || isExcludedPage()) return;

    document.querySelectorAll("img").forEach(blurImage);
    document.querySelectorAll("video").forEach(blurVideo);
  });
}

/**
 * Initialize blur logic and listeners.
 */
function initBlurScript() {
  blurMediaElements();

  // Observe for dynamically loaded media
  const observer = new MutationObserver(blurMediaElements);
  observer.observe(document.body, { childList: true, subtree: true });

  // Monitor SPA-style URL changes
  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      blurMediaElements();
    }
  }, 1000);
}

// Run it
initBlurScript();
