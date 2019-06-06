const TypeWriter = function(textElement, words, wait = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.wait = parseInt(wait, 10);
  this.text = "";
  this.wordIndex = 0;
  this.type();
  this.isDeleting = false;
};

// Type function
TypeWriter.prototype.type = function() {
  const currentIndex = this.wordIndex % this.words.length;
  const fullTxt = this.words[currentIndex];

  if (this.isDeleting) {
    this.text = fullTxt.substring(0, this.text.length - 1);
  } else {
    this.text = fullTxt.substring(0, this.text.length + 1);
  }

  this.textElement.innerHTML = `<span class="txt">${this.text}</span>`;

  // Initial Type Speed

  let typeSpeed = 100;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.text === fullTxt) {
    typeSpeed = this.wait;
    console.log("Completed ");

    this.isDeleting = true;
  } else if (this.isDeleting && this.text === "") {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 400;
  }

  setTimeout(() => {
    this.type();
  }, typeSpeed);
};

// Init on DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init app
function init() {
  const textElement = document
    .getElementsByClassName("animate-text-type")
    .item(0);
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const wait = textElement.getAttribute("data-wait");

  new TypeWriter(textElement, words, wait);
}
