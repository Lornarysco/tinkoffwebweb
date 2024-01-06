import { api, apiAuthor } from "./modules/api.js";

import {
  POST,
  DELETE,
  PUT,
  UPDATE,
  REMOVE,
  DEFAILT_VALUE,
} from "./modules/constants.js";

import { getEl, uuid } from "./modules/helpers.js";

let cards = [],
    blockElements = false;

const formEl = getEl("form");
const productCodeInput = getEl('input[name="id"]');
const productNameInput = getEl('input[name="productName"]');
const hrefToIMGInput = getEl('input[name="hrefToIMG"]');
const descriptionInput = getEl('textarea[name="description"]');
const providerInput = getEl('input[name="provider"]');
const listEl = getEl(".showcaseOfCards .row");
const elLoading = getEl(".movie-isloading");
const authorPlace = getEl(".author-name");
const authorPlacePlaceholder = getEl(".author-name-placeholder");

const renderCard = (card, replace = false) => {
  const cardTemplate = `
    <div class="card" data-id="${card.id}">
      <div class="row">
        <div class="col-6">
          <div class="productId">Id:${card.id}</div>
        </div>
        <div class="col-6">
          <div class="card-edit mb-1" data-id="${card.id}" data-init="false">Редактировать</div>
          <div class="card-remove" data-id="${card.id}" data-init="false">Удалить</div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="hrefToIMG"><img src="${card.hrefToIMG}"/></div>
        </div>
        <div class="col-6">
          <div class="productName">${card.productName}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="description">${card.description}</div>
        </div>
        <div class="col-6">
          <div class="provider">Производитель: ${card.provider}</div>
        </div>
      </div>
    </div>
  `;

  if (replace) return cardTemplate;

  listEl.insertAdjacentHTML("beforeend", cardTemplate);
};

const toggleLoadingAnimation = (show) => {
  if (show) {
    elLoading.classList.remove("d-none");
  } else {
    elLoading.classList.add("d-none");
  }
};

const fetchAuthorInfo = async () => {
  try {
    const author = await apiAuthor();
    authorPlace.querySelector(".name").innerHTML = author.name;
    authorPlace.querySelector(".group").innerHTML = author.group;
    authorPlacePlaceholder.classList.add("d-none");
    authorPlace.classList.remove("d-none");
  } catch (error) {
    console.error(error);
  }
};
fetchAuthorInfo();

async function fetchCards() {
  blockElements = true;
  listEl.innerHTML = "";
  toggleLoadingAnimation(true);
  try {
    cards = await api();

    cards.forEach((card) => renderCard(card));
    toggleLoadingAnimation(false);

    initButtons();
  } catch (error) {
    console.error(error);
  }
  blockElements = false;
}
fetchCards();

const setDefaultButton = async () => {
  if (blockElements) return;
  blockElements = true;

  cards.forEach(async (el) => {
    let id = el.id;
    document.querySelector(`.card[data-id="${id}"]`).remove();
    try {
      await api(DELETE, { id });
    } catch (error) {
      console.error(error);
    }
  });
  toggleLoadingAnimation(true);
  cards = DEFAILT_VALUE;

  DEFAILT_VALUE.forEach(async (card) => {
    renderCard(card);
    try {
      await api(POST, { body: card });
    } catch (error) {
      console.error(error);
    }
  });
  toggleLoadingAnimation(false);
  initButtons();
  blockElements = false;
};

document
    .querySelector(".setupStartValue")
    .addEventListener("click", setDefaultButton);

function initButtons() {
  const editButtons = getEl(".card-edit", true, listEl);
  const removeButtons = getEl(".card-remove", true, listEl);

  editButtons.forEach((input) => (input.onclick = (e) => handleClick(e, UPDATE)));

  removeButtons.forEach((btn) => (btn.onclick = (e) => handleClick(e, REMOVE)));
}

const handleClick = async (e, action) => {
  if (blockElements) return;
  blockElements = true;
  const itemEl = e.target.closest(".card");
  const { id } = itemEl.dataset;

  switch (action) {
    case UPDATE: {
      editCardInfo(id);
      blockElements = false;
      break;
    }
    case REMOVE: {
      try {
        await api(DELETE, { id });
      } catch (error) {
        console.error(error);
      }

      itemEl.closest(".card").remove();
      break;
    }
    default:
      blockElements = false;
      return;
  }
};

const editCardInfo = (id) => {
  let cardProduct = cards.find((el) => el.id == id);
  const form = document.querySelector("#form-product");
  for (let key in cardProduct) {
    form.querySelector(`[name="${key}"]`).value = cardProduct[key];
  }
};

formEl.onsubmit = async (e) => {
  e.preventDefault();
  if (blockElements) return;
  blockElements = true;

  const trimmedProductCode = productCodeInput.value.trim();
  const trimmedProductName = productNameInput.value.trim();
  const trimmedHrefToIMG = hrefToIMGInput.value.trim();
  const trimmedDescription = descriptionInput.value.trim();
  const trimmedProvider = providerInput.value.trim();

  if (
      trimmedProductName &&
      trimmedHrefToIMG &&
      trimmedDescription &&
      trimmedProvider
  ) {
    if (trimmedProductCode === "") {
      const newCard = {
        id: uuid(5),
        productName: trimmedProductName,
        hrefToIMG: trimmedHrefToIMG,
        description: trimmedDescription,
        provider: trimmedProvider,
      };

      try {
        await api(POST, { body: newCard });
        fetchCards();
      } catch (error) {
        console.error(error);
      }
    } else {
      const card = {
        id: trimmedProductCode,
        productName: trimmedProductName,
        hrefToIMG: trimmedHrefToIMG,
        description: trimmedDescription,
        provider: trimmedProvider,
      };
      try {
        await api(PUT, { id: card.id, body: card });

        getEl(`.card[data-id="${card.id}"]`).outerHTML = renderCard(card, true);

        initButtons();
      } catch (error) {
        console.error(error);
      }
    }
    productCodeInput.value = "";
    productNameInput.value = "";
    hrefToIMGInput.value = "";
    descriptionInput.value = "";
    providerInput.value = "";
  } else {
    alert('Пожалуйста, заполните обязательные поля');
  }
  blockElements = false;
};