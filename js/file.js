let btnBasket = document.querySelector(".header__basket");
let basketBar = document.querySelector(".basket__bar");
let btnBasketClose = document.querySelector(".btn__close");
let btnAddToBasket = document.querySelectorAll(".add--to--basket");
let basketCardContainer = document.querySelector(".basket__card__container");
let basketTotalPrice = document.querySelector(".basket__total-price");


let arrBasket = [];


btnBasket.addEventListener("click", () => {
  basketBar.style.display =
    basketBar.style.display === "flex" ? "none" : "flex";
});


btnBasketClose.addEventListener("click", () => {
  basketBar.style.display = "none";
});


function generateId(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}


function sumPrice(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].price;
  }
  return sum;
}

function updateTotal() {
  basketTotalPrice.textContent = `${sumPrice(arrBasket)}$`;
}


function addToBusket(obj) {
  let basketCard = document.createElement("div");
  basketCard.classList.add("basket__card");
  basketCardContainer.append(basketCard);
  basketCard.dataset.id = obj.id;

  let img = document.createElement("img");
  img.classList.add("basket__card__image");
  img.src = obj.image;
  img.alt = `${obj.name} image`;
  basketCard.append(img);

  let cardName = document.createElement("p");
  cardName.classList.add("basket__card--name");
  cardName.textContent = obj.name;
  basketCard.append(cardName);

  let cardItem = document.createElement("div");
  cardItem.classList.add("card__item");
  basketCard.append(cardItem);

  let buttonCardClose = document.createElement("button");
  buttonCardClose.classList.add("btn__close");
  buttonCardClose.classList.add("btn__card__close");
  cardItem.append(buttonCardClose);

  let cardPriceText = document.createElement("p");
  let cardPrice = document.createElement("span");
  cardPrice.innerText = `${obj.price}`;
  cardPriceText.textContent = `Цена: ${cardPrice.innerText}`;
  cardItem.append(cardPriceText);

  buttonCardClose.addEventListener("click", (e) => {
    let card = e.target.closest(".basket__card");

    const id = card.dataset.id;
    arrBasket = arrBasket.filter(item => item.id !== id);

    card.remove();

    updateTotal();

  });
}

btnAddToBasket.forEach((button) => {
  button.addEventListener("click", (e) => {
    let card = e.target.closest(".card");

    let name = card.querySelector(".card__name").textContent;
    let price = +card.querySelector("span").textContent;
    let image = card.querySelector("img").src;
    let id = generateId()

    let product = {
      id,
      name,
      price,
      image
    };
    
    arrBasket.push(product);
    addToBusket(product);
    updateTotal();

    console.log(arrBasket)
  });
});
