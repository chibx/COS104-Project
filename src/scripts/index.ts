import { pow } from "./mod";

console.log("Yo I am loaded!");

let base: HTMLInputElement = document.querySelector("#base")!;
let power: HTMLInputElement = document.querySelector("#power")!;
let calculateBtn: HTMLInputElement = document.querySelector("#calculate")!;

function calculate() {
    let b = parseInt(base.value) || 0;
    let p = parseInt(power.value) || 0;

    console.log(`The value of ${b} ^ ${p} is: ${pow(b, p)}`);
}

calculateBtn.addEventListener("click", calculate);
