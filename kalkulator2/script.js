"use strict";

let input = document.getElementById('input'), // input/output knapp
  number = document.querySelectorAll('.numbers div'), // number knapper
  operator = document.querySelectorAll('.operators div'), // operator knapper
  result = document.getElementById('result'), // = knapp
  clear = document.getElementById('clear'), // clear knapp
  resultDisplayed = false; // flagg-variabel for å holde øye med hvilket output som vises 

// number knapper
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // lagrer nåverende input-string og den siste bokstaven i variabler - brukes senere 
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    // hvis resultatet ikke vises, fortsett
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // hvis resultatet vises og bruker trykker på en operator
      // må fortsette å legge til i stringen for neste regneoperasjon
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // hvis resultatet vises og bruker trykker på et tall 
      // trenger å fjerne input string og legge til den nye inputen for å starte en ny regneoperasjon
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// tall knapper
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // lagrer nåværende input string og den siste tegn i variabler - brukes senere
    let currentString = input.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    // hvis siste tegn er en operator, erstatt den med den nyeste trykket på
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // hvis første knapp som trykkes er en operator skjer det ingenting:
      console.log("skriv inn tall først");
    } else {
      // ellers bare legg til operatoren i input
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// = knapp
result.addEventListener("click", function() {

  // dette er stringen med regnestykket, eks. -10+26+33-56*34/23
  let inputString = input.innerHTML;

  // lager en array med tall, for eksempelet ovenfor: ["10", "26", "33", "56", "34", "23"]
  let numbers = inputString.split(/\+|\-|\×|\÷/g); //regex - bruker her for å kunne splitte ved flere enn én operator

  // lager en array med operatorer, for eksempelet ovenfor: ["+", "+", "-", "*", "/"]
  // erstatter først alle tallene og punktum med tom string og så splitter
  let operators = inputString.replace(/[0-9]|\./g, "").split(""); //regex igjn

  /*
  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  */
  // looper nå gjennom arrayen og gjør en operasjon om gangen 
  // føst deling, så ganging, så minus og så pluss
  // bytter mellom array for originale tall og operator
  // det siste elementet som er igjen i arrayen blir output
  let divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    // nødvendig å bruke parseFloat for å ungå sammenslåing av selve stringen
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // viser output

  resultDisplayed = true; // flagg-variablen er sann når resultatet vises 
});

// fjerner inputen når bruker trykker clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})