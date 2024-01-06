let isEditMode = false;
const defaultCards = [
  {
    productName: "Пепе",
    hrefToIMG: "https://i.pinimg.com/236x/4f/e1/0d/4fe10d9381df7676050d2626d3bb4dc3.jpg",
    description: "Лягушонок Пепе (Pepe the Frog, Грустная лягушка, Sad Frog, Feels bad man) - популярная пикча с зеленой плачущей лягушкой. Мем означает грусть, хотя на оригинальных рисунках лягушонок был радостным.\n",
    provider: "Мемопедия",
    productCode: "0",
  },
  {
    productName: "Грустный пепе",
    hrefToIMG: "https://usagif.com/wp-content/uploads/2021/4fh5wi/pepefrg-13.gif",
    description: "Пепе уронил еду.",
    provider: "Китайская партия",
    productCode: "1",
  },
  {
    productName: "Весёлый пепе",
    hrefToIMG: "https://abrakadabra.fun/uploads/posts/2022-02/1645078923_3-abrakadabra-fun-p-malenkii-lyagushonok-pepe-10.jpg",
    description: "feels good man",
    provider: "Мои сохраненки",
    productCode: "2",
  },
];

const initializeStartValues = () => {
  clearCards();
  localStorage.setItem("cards", JSON.stringify(defaultCards));
  loadCards();
};

const clearCards = () => {
  document.querySelector(".showcaseOfCards .row").innerHTML = "";
};

const createCard = (cardData) => {
  let root;
  if (document.querySelector(`[data-id='${cardData.productCode}']`)) {
    root = document
        .querySelector(`[data-id='${cardData.productCode}']`)
        .closest(".col-6");
    document
        .querySelector(`[data-id='${cardData.productCode}']`)
        .closest(".col-6").innerHTML = "";
  } else {
    root = document;
  }
  const wrapperCard = document.createElement("div");
  wrapperCard.innerHTML = `
          <div class="card" data-id="${cardData.productCode}">
          <div class="row">
              <div class="col-6">
                  <div class="productId">Id:${cardData.productCode}</div>
              </div>
          </div>
          <div class="row">
              <div class="col-6">
                  <div class="hrefToIMG"><img src="${cardData.hrefToIMG}"/></div>
              </div>
              <div class="col-6">
                  <div class="productName">${cardData.productName}</div>
              </div>
          </div>
              <div class="row">
                  <div class="col-6">
                      <div class="description">${cardData.description}</div>
                  </div>
                  <div class="col-6">
                      <div class="provider">Производитель: ${cardData.provider}</div>
                  </div>
              </div>
              <div class="col-6">
                  <div class="card-edit mb-1" data-id="${cardData.productCode}" data-init="false">Редактировать</div>
                  <div class="card-remove" data-id="${cardData.productCode}" data-init="false">Удалить</div>
              </div>
          </div>
      `;
  if (root == document) {
    root
        .querySelector(".showcaseOfCards .row")
        .insertAdjacentHTML(
            "beforeend",
            '<div class="col-6 mb-4">' + wrapperCard.innerHTML + "</div>"
        );
  } else {
    root.insertAdjacentHTML("beforeend", wrapperCard.innerHTML);
  }
};

const getIdToSaveCard = (cardData) => {
  if (cardData.get("productCode")) {
    isEditMode = true;
    return cardData.get("productCode");
  }
  let cards = JSON.parse(localStorage.getItem("cards"));
  let cardId = !!cards ? cards.length : 0;
  return cardId;
};

const saveCard = (cardData) => {
  let cards = localStorage.getItem("cards");
  if (!!cards) {
    cards = JSON.parse(cards);
    if (!isEditMode) {
      cards[cards.length] = cardData;
    } else {
      cards[cardData.productCode] = cardData;
      isEditMode = false;
    }
    localStorage.setItem("cards", JSON.stringify(cards));
  } else {
    localStorage.setItem("cards", JSON.stringify([cardData]));
  }
};

const loadCards = () => {
  let cards = localStorage.getItem("cards");
  if (!!cards) {
    cards = JSON.parse(cards);
    cards.forEach((el) => createCard(el));
  }
};

const editCard = (id) => {
  let cardProduct = JSON.parse(localStorage.getItem("cards")).filter(
      (el) => el.productCode == id
  )[0];
  const form = document.querySelector("#form-product");
  for (let key in cardProduct) {
    form.querySelector(`[name="${key}"]`).value = cardProduct[key];
  }
};

const removeCard = (id) => {
  let cardProducts = JSON.parse(localStorage.getItem("cards")).filter(
      (el) => el.productCode != id
  );
  console.log(cardProducts)
  localStorage.setItem("cards", JSON.stringify(cardProducts));
  console.log(
      document.querySelector(`.card[data-id="${id}"]`).closest(".col-6")
  );
  document.querySelector(`.card[data-id="${id}"]`).closest(".col-6").remove();
};

const validateForm = (formData) => {
  let cardData = {};
  for (let [key, value] of formData) {
    if (!value) return null;
    cardData[key] = value;
  }
  return cardData;
};

const initializeEdit = () => {
  document.querySelectorAll('.card-edit[data-init="false"]').forEach((el) => {
    el.addEventListener("click", () => {
      editCard(el.dataset.id);
    });
    el.dataset.init = "true";
  });
};

const initializeRemove = () => {
  document.querySelectorAll('.card-remove[data-init="false"]').forEach((el) => {
    el.addEventListener("click", () => {
      removeCard(el.dataset.id);
    });
    el.dataset.init = "true";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  loadCards();
  initializeEdit();
  initializeRemove();
  document.querySelector("form .btn").addEventListener("click", () => {
    const form = document.querySelector("#form-product");
    const data = new FormData(form);
    document.querySelector('input[name="productCode"').value = "";
    let cardId = getIdToSaveCard(data);
    data.set("productCode", cardId);
    let card = validateForm(data);
    if (card == null) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }
    form.reset();
    saveCard(card);
    createCard(card);
    initializeEdit();
    initializeRemove();
  });
  document.querySelector(".setupStartValue").addEventListener("click", () => {
    initializeStartValues();
  });
});