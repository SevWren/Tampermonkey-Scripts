// ==UserScript==
// @name         Chatgpt Unofficial Notepad
// @namespace    https://github.com/SevWren/Tampermonkey-Scripts/tree/main
// @version      0.9
// @description  Adds a small context window for note-taking on the openai.com website for usages with chatgpt.
// @author       GUI Edits SevWren
// @grant        none
// @license      MIT
// @downloadURL https://raw.githubusercontent.com/SevWren/Tampermonkey-Scripts/main/Chatgpt%20Unofficial%20Notepad.js
// @updateURL   https://raw.githubusercontent.com/SevWren/Tampermonkey-Scripts/main/Chatgpt%20Unofficial%20Notepad.js
// @connect             raw.githubusercontent.com
// @homepageURL         https://github.com/SevWren/Tampermonkey-Scripts/tree/main
// @supportURL          https://github.com/SevWren/Tampermonkey-Scripts/tree/main
// @match        https://chat.openai.com/*


(function() {
  'use strict';

  var numWindows = 5; // Number of text windows
  var currentIndex = 0; // Index of the currently displayed text window
  var isDragging = false; // Flag to track whether the window is being dragged
  var offsetX, offsetY; // Offsets for calculating position during drag

  // Create a new div element for the floating window
  var newDiv = document.createElement("div");
  newDiv.style.position = "fixed";
  newDiv.style.top = "20px";
  newDiv.style.right = "20px";
  newDiv.style.zIndex = "1000";
  newDiv.style.width = "292px"; // Set initial width to 292px
  newDiv.style.height = "312px"; // Set initial height to 312px
  newDiv.style.backgroundColor = "#333"; // Dark background
  newDiv.style.border = "1px solid white"; // White border
  newDiv.style.color = "white"; // White text
  newDiv.style.padding = "10px";

  // Add drag-and-drop functionality to the entire floating window
  newDiv.addEventListener('mousedown', function(e) {
    if (e.target === newDiv) {
      isDragging = true;
      offsetX = e.clientX - newDiv.getBoundingClientRect().left;
      offsetY = e.clientY - newDiv.getBoundingClientRect().top;
    }
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      newDiv.style.left = e.clientX - offsetX + 'px';
      newDiv.style.top = e.clientY - offsetY + 'px';
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });

  // Append the div to the body of the document
  document.body.appendChild(newDiv);
})();
