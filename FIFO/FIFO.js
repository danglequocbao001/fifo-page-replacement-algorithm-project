// let referenceString = [1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3];
let referenceString = [
  7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1,
];
let frames = 4;
let pageFaults = 0,
  counter,
  pagesLength = referenceString.length,
  pagesFaultsArray = ["✘"];

async function PageReplacementFIFOAlgorithm() {
  let answer = new Array();
  let tempAnswer = [frames];

  for (let i = 0; i < frames; i++) {
    tempAnswer[i] = "";
  }

  for (let i = 0; i < referenceString.length; i++) {
    let counter = 0;
    for (let j = 0; j < frames; j++) {
      if (referenceString[i] === tempAnswer[j]) {
        counter++;
        pageFaults--;
      }
    }
    pageFaults++;
    if (pageFaults <= frames && counter === 0) {
      tempAnswer[i] = referenceString[i];
    } else if (counter === 0) {
      let pageHitAndPageRatio = (pageFaults - 1) % frames;
      tempAnswer[pageHitAndPageRatio] = referenceString[i];
    }
    let elementsAnswer = [];
    for (let j = 0; j < frames; j++) {
      elementsAnswer.push(tempAnswer[j]);
    }
    answer = answer.concat(elementsAnswer);
  }
  console.log("Total Page Faults: ", pageFaults);
  return answer;
}

async function handleAnswerVariableTo2DArray(answer) {
  let count = 0;
  let handledAnswer = [];
  tempHandledAnswer = [];
  for (let i = 0; i < pagesLength; i++) {
    for (let j = 0; j < frames; j++) {
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

function tableGenerator(handledAnswer, referenceString) {
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
        cell.appendChild(document.createTextNode(referenceString[j - 1]));
      }
      cell.style.height = "40px";
      cell.style.color = "#fff";
      cell.style.backgroundColor = "#343a40";
      cell.style.fontWeight = "bold";
      cell.style.fontSize = "18";
    }
  }

  for (let i = 0; i < frames; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pagesLength; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        if (tempFrames <= frames) {
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
  pagesLength > 0 &&
    frames > 0 &&
    referenceString.length > 0 &&
    PageReplacementFIFOAlgorithm().then((answer) => {
      handleAnswerVariableTo2DArray(answer).then((handledAnswer) => {
        tableGenerator(handledAnswer, referenceString);
      });
    });
}

interpretCode();
