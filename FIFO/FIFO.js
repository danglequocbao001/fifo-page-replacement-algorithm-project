let reference_string = [1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3];
let page_faults = 0,
  counter,
  pages,
  frames;
pages = 15;
frames = 4;

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
        page_faults--;
      }
    }
    page_faults++;
    if (page_faults <= frames && counter == 0) {
      tempAnswer[i] = reference_string[i];
    } else if (counter == 0) {
      tempAnswer[(page_faults - 1) % frames] = reference_string[i];
    }
    answer = answer.concat(tempAnswer);
  }
  return answer;
}

async function handleAnswerVariableTo2DArray(answer) {
  let count = 0;
  let handledAnswer = [];
  tempHandledAnswer = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 4; j++) {
      tempHandledAnswer.push(answer[count]);
      count++;
    }
    handledAnswer.push(tempHandledAnswer);
    tempHandledAnswer = [];
  }
  return handledAnswer;
}

function tableGenerator(handledAnswer, pages) {
  const body = document.body,
    tbl = document.createElement("table");
  tbl.style.width = "500px";
  tbl.style.height = "100px";
  tbl.style.textAlign = "center";

  for (let i = 0; i < 4; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < pages; j++) {
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(handledAnswer[j][i]));
      td.style.border = "1px solid black";
      td.style.height = "30px";
    }
  }
  body.appendChild(tbl);
}

function interpretCode() {
  pages > 0 &&
    frames > 0 &&
    reference_string.length > 0 &&
    PageReplacementFIFOAlgorithm().then((answer) => {
      handleAnswerVariableTo2DArray(answer).then((handledAnswer) => {
        tableGenerator(handledAnswer, pages);
        // console.log(page_faults);
      });
    });
}

interpretCode();
