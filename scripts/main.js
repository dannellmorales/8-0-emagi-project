const API = "https://pure-cove-46727.herokuapp.com/api/emojis";

fetch(API)
  .then((response) => response.json()) //gathers json date
  .then((data) => emaji(data)); // the data is passed in to a function called emaji

const emaji = (data) => {
  let categories = [];
  for (let emoji of data) {
    for (let cat of emoji.categories) {
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    }
  }
  console.log(categories);
  const categoryList = document.querySelector("#random form #category");
  for (let cat of categories) {
    let option = document.createElement("option");
    option.textContent = cat[0].toUpperCase() + cat.slice(1);
    categoryList.append(option);
  }

  const encodeForm = document.querySelector("#encode form");
  const searchForm = document.querySelector("#search form");
  const randomForm = document.querySelector("#random form");
  const replaceForm = document.querySelector("#replace form");

  encodeForm.addEventListener("submit", (event) => encode(event, data));
  searchForm.addEventListener("submit", (event) => search(event, data));
  randomForm.addEventListener("submit", (event) => random(event, data));
  replaceForm.addEventListener("submit", (event) => replace(event, data));
};

const encode = (event, data) => {
  event.preventDefault(); //stop a refresh
  const enInput = event.target.encode.value; //this
  let encoded = "";
  const enResult = document.querySelector("#encode .result p");
  const result = document.querySelector("#encode .result");
  if (!enInput) {
    enResult.textContent =
      'Sam Jackson says "No God Damned input Mutha So and So"';
    result.classList.add("error");
    result.classList.remove("success");
    return;
  }
  for (let char of enInput) {
    if (char === " " || char === ",") {
      encoded = encoded + char;
    }
    for (let emoji of data) {
      if (char.toLowerCase() === emoji.letter) {
        encoded = encoded + emoji.symbol;
      }
      console.log(encoded);
    }
  }
  enResult.textContent = encoded;
  result.classList.remove("error");
  result.classList.add("success");
  if (event.target.encode.value) event.target.encode.value = "";
};

const search = (event, data) => {
  event.preventDefault();
  const seaInput = event.target.search.value;
  let searched = "";
  const seaResult = document.querySelector("#search .result p");
  const result = document.querySelector("#search .result");

  if (!seaInput) {
    seaResult.textContent = "Please input something";
    result.classList.add("error");
    result.classList.remove("success");
    return;
  }
  for (let emoji of data) {
    if (emoji.name.includes(seaInput)) {
      searched += emoji.symbol;
    }
  }

  seaResult.textContent = searched;
  result.classList.remove("error");
  result.classList.add("success");
  event.target.search.value = "";
};

const random = (event, data) => {
  event.preventDefault();
  const raInput = event.target.category.value.toLowerCase(); //turns the category to lower case

  const raResult = document.querySelector("#random .result p"); //deliver the message
  const result = document.querySelector("#random .result"); // to change the color

  if (raInput === "-- choose a category --") {
    raResult.textContent = "Error no input";
    result.classList.add("error");
    result.classList.remove("success");
    return;
  }

  let emojis = [];
  for (let emoji of data) {
    if (emoji.categories.includes(raInput)) {
      emojis.push(emoji.symbol);

const animator = setInterval(() => {
        console.log ('animate');
        raResult.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    }, 500);
      result.classList.remove("error");
      result.classList.add("success");
    }
  }
};

const replace = (event, data) => {
  event.preventDefault(); //stop a refresh
  const repInput = event.target.replace.value.split(" ");
  const repResult = document.querySelector("#replace .result p");
  const result = document.querySelector("#replace .result");

  let replaced = [];

  if (repInput.length === 1 && repInput[0]==="") {
    repResult.textContent = "Please input something";
    result.classList.add("error");
    result.classList.remove("success");
    return;
  }

  inputLoop: for (let word of repInput) {
    for (let emoji of data) {
      if (word.toLowerCase().includes(emoji.name)) {
        let newWord = word.toLowerCase().replace(emoji.name, emoji.symbol);
        replaced.push(newWord);
        continue inputLoop;
      }
    }
    replaced.push(word);
  }
  repResult.textContent = replaced.join(" ");
  result.classList.remove("error");
  result.classList.add("success");
  event.target.replace.value = "";
};
