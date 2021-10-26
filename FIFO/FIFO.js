function tableCreate(chore, pages) {
  // console.log(temp);
  const body = document.body,
    tbl = document.createElement("table");
  tbl.style.width = "100px";
  // tbl.style.border = "1px solid black";

  for (let i = 0; i < pages; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 4; j++) {
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(chore[i][j]));
      td.style.border = "1px solid black";
    }
  }
  body.appendChild(tbl);
}

let reference_string = [1, 2, 3, 4, 2, 1, 5, 6, 2, 1, 2, 3, 7, 6, 3];
let page_faults = 0,
  m,
  n,
  s,
  pages,
  frames;
pages = 15;
frames = 4;
let temp = new Array();
let answer = new Array();
temp.length = frames;
for (m = 0; m < frames; m++) {
  temp[m] = null;
}
for (m = 0; m < pages; m++) {
  s = 0;
  for (n = 0; n < frames; n++) {
    if (reference_string[m] == temp[n]) {
      s++;
      page_faults--;
    }
  }
  page_faults++;
  if (page_faults <= frames && s == 0) {
    temp[m] = reference_string[m];
  } else if (s == 0) {
    temp[(page_faults - 1) % frames] = reference_string[m];
  }
  //   for (n = 0; n < frames; n++) {
  //     console.log(temp[n]);
  //   }
  answer = answer.concat(temp);
  // console.log(answer)
  // temp.map((value) => {
  //   console.log(value);
  // });
}
// console.log(page_faults);
let count = 0;
let chore = [];
toPush = [];
for (let i = 0; i < 15; i++) {
  for (let j = 0; j < 4; j++) {
    toPush.push(answer[count]);

    count++;
  }
  chore.push(toPush);
  toPush = [];
}
console.log(chore);
tableCreate(chore, pages);
