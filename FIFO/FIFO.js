let page = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
let frame = 3;
let pageFaults = 0,
  pagesLength = page.length,
  pagesFaultsArray = ["✘"];

var inputPage = document.getElementById("inputPage");
inputPage.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("buttonRun").click();
  }
});

var inputFrame = document.getElementById("inputFrame");
inputFrame.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("buttonRun").click();
  }
});

async function PageReplacementFIFOAlgorithm() {
  let answer = new Array();
  let tempAnswer = [frame];

  for (let i = 0; i < frame; i++) {
    tempAnswer[i] = "";
  }

  for (let i = 0; i < page.length; i++) {
    let counter = 0;
    for (let j = 0; j < frame; j++) {
      if (page[i] === tempAnswer[j]) {
        counter++;
        pageFaults--;
      }
    }
    pageFaults++;
    if (pageFaults <= frame && counter === 0) {
      tempAnswer[i] = page[i];
    } else if (counter === 0) {
      let pageHitAndPageRatio = (pageFaults - 1) % frame;
      tempAnswer[pageHitAndPageRatio] = page[i];
    }
    let elementsAnswer = [];
    for (let j = 0; j < frame; j++) {
      elementsAnswer.push(tempAnswer[j]);
    }
    answer = answer.concat(elementsAnswer);
  }
  document.getElementById("hit").innerHTML =
    "Số lần truy cập: " + (pagesLength - pageFaults) || 0;
  document.getElementById("pageFaults").innerHTML =
    "Số lỗi trang: " + pageFaults || 0;
  return answer;
}

async function handleAnswerVariableTo2DArray(answer) {
  let count = 0;
  let handledAnswer = [];
  tempHandledAnswer = [];
  for (let i = 0; i < pagesLength; i++) {
    for (let j = 0; j < frame; j++) {
      tempHandledAnswer.push(answer[count]);
      count++;
    }
    handledAnswer.push(tempHandledAnswer);
    tempHandledAnswer = [];
  }
  return handledAnswer;
}

async function handlePagesFaultsArray(handledAnswer) {
  for (let i = 0; i < pagesLength; i++) {
    if (i + 1 != undefined) {
      if (
        JSON.stringify(handledAnswer[i]) == JSON.stringify(handledAnswer[i + 1])
      ) {
        pagesFaultsArray.push("✔");
      } else {
        pagesFaultsArray.push("✘");
      }
    }
  }
  return pagesFaultsArray;
}

function tableGenerator(page, handledAnswer) {
  let tempFrames = 0;
  const body = document.body,
    mainTable = document.createElement("table");
  mainTable.style.width = "50%";
  mainTable.style.height = "300px";
  mainTable.style.textAlign = "center";
  mainTable.style.boxShadow =
    "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px";
  mainTable.style.padding = "15px";
  mainTable.style.marginLeft = "25%";
  mainTable.style.border = "none";
  handlePagesFaultsArray(handledAnswer);

  for (let i = 0; i < 1; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pagesLength; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        cell.appendChild(document.createTextNode("Tiến trình"));
      } else {
        cell.appendChild(document.createTextNode(page[j - 1]));
      }
      cell.style.height = "40px";
      cell.style.color = "#fff";
      cell.style.backgroundColor = "#343a40";
      cell.style.fontWeight = "bold";
      cell.style.fontSize = "18";
    }
  }

  for (let i = 0; i < frame; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pagesLength; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        if (tempFrames <= frame) {
          tempFrames++;
          cell.appendChild(document.createTextNode("Frame " + tempFrames));
          cell.style.fontWeight = "bold";
          if (tempFrames % 2 == 0) {
            cell.style.backgroundColor = "rgba(204, 255, 204, 0.75)";
          }
        }
      } else {
        cell.appendChild(document.createTextNode(handledAnswer[j - 1][i]));
        if (i % 2 != 0) {
          cell.style.backgroundColor = "rgba(204, 255, 204, 0.75)";
        }
      }
      cell.style.height = "40px";
      cell.style.fontSize = "18";
    }
  }

  for (let i = 0; i < 1; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pagesLength; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        cell.appendChild(document.createTextNode("Trạng thái"));
        cell.style.fontWeight = "bold";
      } else {
        cell.appendChild(document.createTextNode(pagesFaultsArray[j - 1]));
        if (pagesFaultsArray[j - 1] == "✔") {
          cell.style.color = "green";
        } else {
          cell.style.color = "red";
        }
      }
      cell.style.height = "40px";
      cell.style.fontWeight = "bold";
      cell.style.fontSize = "18";
      cell.style.backgroundColor = "rgb(204, 255, 255)";
    }
  }

  body.appendChild(mainTable);
}

function buttonRunAlgFIFO() {
  let stringPage = document.querySelector("#inputPage").value;
  stringPage = stringPage.replace(/\s/g, "");
  if (stringPage.charAt(0) == ",") stringPage = stringPage.substring(1);
  if (stringPage.charAt(stringPage.length - 1) == ",")
    stringPage = stringPage.substring(0, stringPage.length - 1);

  page = JSON.parse("[" + stringPage + "]");
  frame = parseInt(document.querySelector("#inputFrame").value);
  (pageFaults = 0), (pagesLength = page.length), (pagesFaultsArray = ["✘"]);
  if (pagesLength <= 0) alert("Không được bỏ trống dãy trang!");
  else if (frame <= 0) alert("Frame tối thiểu bằng 1!");
  else if (pagesLength > 0 && frame > 0) {
    document.querySelector("table").remove();
    interpretCode();
  }
}

function initExampleTable(page, handledAnswer) {
  let tempFrames = 0;
  pagesFaultsArray = [];
  const body = document.body,
    mainTable = document.createElement("table");
  mainTable.style.width = "50%";
  mainTable.style.height = "300px";
  mainTable.style.textAlign = "center";
  mainTable.style.boxShadow =
    "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px";
  mainTable.style.padding = "15px";
  mainTable.style.marginLeft = "25%";
  mainTable.style.border = "none";

  for (let i = 0; i <= pagesLength; i++) {
    pagesFaultsArray.push("");
  }

  for (let i = 0; i < 1; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pagesLength; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        cell.appendChild(document.createTextNode("Tiến trình"));
      } else {
        cell.appendChild(document.createTextNode(page[j - 1]));
      }
      cell.style.height = "40px";
      cell.style.color = "#fff";
      cell.style.backgroundColor = "#343a40";
      cell.style.fontWeight = "bold";
      cell.style.fontSize = "18";
    }
  }

  for (let i = 0; i < frame; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pagesLength; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        if (tempFrames <= frame) {
          tempFrames++;
          cell.appendChild(document.createTextNode("Frame " + tempFrames));
          cell.style.fontWeight = "bold";
          if (tempFrames % 2 == 0) {
            cell.style.backgroundColor = "rgba(204, 255, 204, 0.75)";
          }
        }
      } else {
        cell.appendChild(document.createTextNode(handledAnswer[j - 1][i]));
        if (i % 2 != 0) {
          cell.style.backgroundColor = "rgba(204, 255, 204, 0.75)";
        }
      }
      cell.style.height = "40px";
      cell.style.fontSize = "18";
    }
  }

  for (let i = 0; i < 1; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pagesLength; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        cell.appendChild(document.createTextNode("Trạng thái"));
        cell.style.fontWeight = "bold";
      } else {
        cell.appendChild(document.createTextNode(pagesFaultsArray[j - 1]));
        if (pagesFaultsArray[j - 1] == "✔") {
          cell.style.color = "green";
        } else {
          cell.style.color = "red";
        }
      }
      cell.style.height = "40px";
      cell.style.fontWeight = "bold";
      cell.style.fontSize = "18";
      cell.style.backgroundColor = "rgb(204, 255, 255)";
    }
  }

  body.appendChild(mainTable);
}

function interpretCode() {
  PageReplacementFIFOAlgorithm().then((answer) => {
    handleAnswerVariableTo2DArray(answer).then((handledAnswer) => {
      tableGenerator(page, handledAnswer);
    });
  });
}
function init() {
  let answer = [];
  for (let i = 0; i < 60; i++) {
    answer.push("");
  }
  handleAnswerVariableTo2DArray(answer).then((handledAnswer) => {
    initExampleTable(page, handledAnswer);
  });
}

init();
// interpretCode();
