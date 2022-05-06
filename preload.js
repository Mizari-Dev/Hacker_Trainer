const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

window.addEventListener('DOMContentLoaded', async () => {

  const folders = await globPromise(`${process.cwd()}/categories/*`);
  var elements = document.getElementById("elements");

  folders.forEach(async folder => {
    var name = folder.split("/");
    name = name[name.length - 1];

    var titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "d-sm-flex align-items-center justify-content-between mb-4");
    var title = document.createElement("h3");
    title.setAttribute("class", "mb-0 text-gray-800");
    title.innerHTML = name;
    titleDiv.appendChild(title);
    elements.appendChild(titleDiv);

    var contents = document.createElement("div");
    contents.setAttribute("class", "row");

    const files = await globPromise(`${folder}/*.json`);
    await files.forEach(file => {
      file = require(file);

      var elementDiv = document.createElement("div");
      elementDiv.setAttribute("class", "col-xl-3 col-md-6 mb-4");
      elementDiv.setAttribute("onclick", `Open("${file.url}")`)
      var cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", `card border-left-${file.color} shadow h-100 py-2`);
      var cardBody = document.createElement("div");
      cardBody.setAttribute("class", "card-body");
      var cardElements = document.createElement("div");
      cardElements.setAttribute("class", "row no-gutters align-items-center");
      var cardText = document.createElement("div");
      cardText.setAttribute("class", "col mr-2");
      var cardTitle = document.createElement("div");
      cardTitle.setAttribute("class", "h5 font-weight-bold text-rootme text-uppercase mb-1");
      cardTitle.innerHTML = file.title;
      cardText.appendChild(cardTitle);
      var cardDesc = document.createElement("div");
      cardDesc.setAttribute("class", "text-xs mb-0 font-weight-bold text-gray-800");
      cardDesc.innerHTML = `"${file.description}"`;
      cardText.appendChild(cardDesc);
      cardElements.appendChild(cardText);
      var cardImg = document.createElement("div");
      cardImg.setAttribute("class", "col-auto");
      cardImg.setAttribute("style", `width: 64px; height: 64px; background-image: url('${folder}/${file.icon}'); background-size: cover;`);
      cardElements.appendChild(cardImg);
      cardBody.appendChild(cardElements);
      cardDiv.appendChild(cardBody);
      elementDiv.appendChild(cardDiv);
      contents.appendChild(elementDiv);
    });

    elements.appendChild(contents);

  });

})
