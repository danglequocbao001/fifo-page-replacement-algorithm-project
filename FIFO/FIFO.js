let reference_string = [1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3];
let frames = 4;
let pageFaults = 0,
  counter,
  pages = reference_string.length,
  pagesFaultsArray = ["✘"];

async function PageReplacementFIFOAlgorithm() {
  let tempAnswer = new Array();
  let answer = new Array();
  tempAnswer.length = frames;
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
    answer = answer.concat(tempAnswer);
  }
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
  mainTable.style.width = "750px";
  mainTable.style.height = "100px";
  mainTable.style.textAlign = "center";

  handlePagesFaultsArray(handledAnswer);

  for (let i = 0; i < 1; i++) {
    const tr = mainTable.insertRow();
    for (let j = 0; j <= pages; j++) {
      const td = tr.insertCell();
      if (j == 0) {
        td.appendChild(document.createTextNode("Trang"));
      } else {
        td.appendChild(document.createTextNode(reference_string[j - 1]));
      }

      td.style.height = "30px";
      td.style.color = "#fff";
      td.style.backgroundColor = "#343a40";
      td.style.borderColor = "#454d55";
      td.style.fontWeight = "bold";
    }
  }

  for (let i = 0; i < frames; i++) {
    const tr = mainTable.insertRow();
    for (let j = 0; j <= pages; j++) {
      const td = tr.insertCell();
      if (j == 0) {
        if (tempFrames <= frames) {
          tempFrames++;
          td.appendChild(document.createTextNode("Frame " + tempFrames));
          td.style.fontWeight = "bold";
        }
      } else {
        td.appendChild(document.createTextNode(handledAnswer[j - 1][i]));
      }
      td.style.border = "1px solid black";
      td.style.height = "30px";
    }
  }

  for (let i = 0; i < 1; i++) {
    const tr = mainTable.insertRow();
    for (let j = 0; j <= pages; j++) {
      const td = tr.insertCell();
      if (j == 0) {
        td.appendChild(document.createTextNode("Trạng thái"));
        td.style.fontWeight = "bold";
      } else {
        td.appendChild(document.createTextNode(pagesFaultsArray[j - 1]));
      }
      td.style.border = "1px solid black";
      td.style.height = "30px";
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
