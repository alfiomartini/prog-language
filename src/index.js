import { programs } from "./examples/examples.js";
import { evalPrg } from "./evaluator/interpreter.js";
// https://stackoverflow.com/questions/10911526/how-do-i-change-an-html-selected-option-using-javascript

const textarea = document.getElementById("prgtext");
const evalBtn = document.getElementById("eval");
const result = document.getElementById("result");
const select = document.getElementById("programs");
buildSelect();

select.addEventListener("change", evalSelect);
evalBtn.addEventListener("click", evalTextArea);

function buildSelect() {
  programs.forEach((prg, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = `prg${index}`;
    select.append(option);
  });
  let selected = 0;
  select.value = selected;
  textarea.value = programs[selected];
}
function evalSelect(event) {
  textarea.value = programs[event.target.value];
}
function evalTextArea() {
  const prg = textarea.value;
  const val = evalPrg(prg);
  result.innerText = "> " + val;
}
