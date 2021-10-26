// let reference_string = [1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3];
let reference_string = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
let frames = 3;
let pageFaults = 0,
  counter,
  pages = reference_string.length,
  pagesFaultsArray = ["✘"];

async function PageReplacementFIFOAlgorithm() {
  let tempAnswer = new Array();
  let answer = new Array();
  // tempAnswer.length = frames;
  for (let i = 0; i < frames; i++) {
    tempAnswer[i] = "";
  }
  for (let i = 0; i < pages; i++) {
    counter = 0;
    for (let j = 0; j < frames; j++) {
      if (reference_string[i] == tempAnswer[j]) {
        counter++;
        pageFaults--;
      }
    }
    pageFaults++;
    if (pageFaults <= frames && counter == 0) {
      tempAnswer[i] = reference_string[i];
    } else if (counter == 0) {
      tempAnswer[(pageFaults - 1) % frames] = reference_string[i];
    }
    console.log(tempAnswer)
    answer = answer.concat(tempAnswer);
  }
  console.log(answer)
  return answer;
}

async function handleAnswerVariableTo2DArray(answer) {
  let count = 0;
  let handledAnswer = [];
  tempHandledAnswer = [];
  for (let i = 0; i < pages; i++) {
    for (let j = 0; j < 4; j++) {
      tempHandledAnswer.push(answer[count]);
      count++;
    }
    handledAnswer.push(tempHandledAnswer);
    tempHandledAnswer = [];
  }
  return handledAnswer;
}

async function handlePagesFaultsArray(handledAnswer) {
  for (let i = 0; i < pages; i++) {
    if (i + 1 != undefined) {
      if (
        JSON.stringify(handledAnswer[i]) == JSON.stringify(handledAnswer[i + 1])
      ) {
        pagesFaultsArray.push("✓");
      } else {
        pagesFaultsArray.push("✘");
      }
    }
  }
  return pagesFaultsArray;
}

function tableGenerator(handledAnswer, reference_string) {
  let tempFrames = 0;
  const body = document.body,
    mainTable = document.createElement("table");
  mainTable.style.width = "50%";
  mainTable.style.height = "100px";
  mainTable.style.textAlign = "center";
  mainTable.style.boxShadow =
    "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px";
  mainTable.style.padding = "15px";
  mainTable.style.marginLeft = "25%";
  handlePagesFaultsArray(handledAnswer);

  for (let i = 0; i < 1; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pages; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        cell.appendChild(document.createTextNode("Trang"));
      } else {
        cell.appendChild(document.createTextNode(reference_string[j - 1]));
      }
      cell.style.height = "30px";
      cell.style.color = "#fff";
      cell.style.backgroundColor = "#343a40";
      cell.style.fontWeight = "bold";
      cell.style.fontSize = "18";
    }
  }

  for (let i = 0; i < frames; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pages; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        if (tempFrames <= frames) {
          tempFrames++;
          cell.appendChild(document.createTextNode("Frame " + tempFrames));
          cell.style.fontWeight = "bold";
        }
      } else {
        cell.appendChild(document.createTextNode(handledAnswer[j - 1][i]));
      }
      cell.style.height = "30px";
      cell.style.fontSize = "18";
    }
  }

  for (let i = 0; i < 1; i++) {
    const row = mainTable.insertRow();
    for (let j = 0; j <= pages; j++) {
      const cell = row.insertCell();
      if (j == 0) {
        cell.appendChild(document.createTextNode("Trạng thái"));
        cell.style.fontWeight = "bold";
      } else {
        cell.appendChild(document.createTextNode(pagesFaultsArray[j - 1]));
        if (pagesFaultsArray[j - 1] == "✓") {
          cell.style.color = "green";
        } else {
          cell.style.color = "red";
        }
      }
      cell.style.height = "30px";
      cell.style.fontWeight = "bold";
      cell.style.fontSize = "18";
    }
  }

  body.appendChild(mainTable);
}

function interpretCode() {
  pages > 0 &&
    frames > 0 &&
    reference_string.length > 0 &&
    PageReplacementFIFOAlgorithm().then((answer) => {
      handleAnswerVariableTo2DArray(answer).then((handledAnswer) => {
        // console.log(JSON.stringify(handledAnswer[3]) == JSON.stringify(handledAnswer[4]));
        tableGenerator(handledAnswer, reference_string);
        // console.log(pageFaults);
        // console.log(pagesFaultsArray);
      });
    });
}

interpretCode();
