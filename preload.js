const { createWindow } = require("./main.js");

window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }
  //
  // for (const dependency of ['chrome', 'node', 'electron']) {
  //   replaceText(`${dependency}-version`, process.versions[dependency])
  // }

  // if(document.all.length === 3){
  //   document.location.href = "https://www.root-me.org/";
  // } else {
  //   document.querySelector("title").innerHTML = "Hacker Trainer";
  // }

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("onclick", () => {
      createWindow(card.id);
    });
  });

})
