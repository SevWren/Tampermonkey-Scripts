// ==UserScript==
// @name         Chatgpt Unofficial Notepad
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Adds a small context window for note-taking on the openai.com website for usages with chatgpt.
// @author       GUI Edits SevWren
// @author       Lefty & Chatgpt3/4
// @match        https://chat.openai.com/*
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/466476/Chatgpt%20Unofficial%20Notepad.user.js
// @updateURL https://update.greasyfork.org/scripts/466476/Chatgpt%20Unofficial%20Notepad.meta.js
// ==/UserScript==

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