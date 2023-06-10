const productsElem = document.querySelector("#products");
const formElem = document.querySelector("#form");
const nameElem = document.querySelector("#name");

let products = [
  { id: 1, title: "Велосипед", count: 4 },
  { id: 2, title: "Велосипед", count: 2 },
  { id: 3, title: "Велосипед", count: 10 },
  { id: 4, title: "Велосипед", count: 1 },
];
const LS_KEY = "products";
const hasProducts = () => {
  return !!localStorage.getItem(LS_KEY);
};

const setProducts = () => {
  if (hasProducts()) {
    products = JSON.parse(localStorage.getItem(LS_KEY));
  } else {
    localStorage.setItem(LS_KEY, JSON.stringify(products));
  }
  let html = "";
  products.forEach((el) => {
    html += `<li class="product_element">
    <h4>${el.title}</h4>
    <div class="button_wrapper">
    <button class="decrement" data-id="${el.id}">-</button>
    <p class="count">${el.count}</p>
    <button class="increment" data-id="${el.id}">+</button>
    </div>
    </li>`;
  });
  productsElem.innerHTML = html;
  console.log(productsElem);
};

const addProduct = (title, count = 1) => {
  if (title === "") {
    alert("Название не должно быть пустым");
    return;
  }
  const id = products.length + 1;
  products.push({
    title,
    count,
    id,
  });
  localStorage.setItem(LS_KEY, JSON.stringify(products));
  nameElem.value = "";
  const li = document.createElement("li");
  li.className = "product_element";
  li.innerHTML = `
 <h4>${title}</h4>
 <div class="button_wrapper">
 <button class="decrement" data-id="${id}">-</button>
 <p class="count">${count}</p>
 <button class="increment" data-id="${id}">+</button>
 </div>
 `;
  productsElem.lastElementChild.parentNode.insertBefore(
    li,
    productsElem.lastElementChild.nextSibling
  );
};
const upgradeCount = () => {
  productsElem.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("decrement")) {
      target.parentElement.querySelector(".count").textContent =
        Number(target.parentElement.querySelector(".count").textContent) - 1;
      const index = products.findIndex((el) => el.id === +target.dataset.id);
      products[index].count = Number(
        target.parentElement.querySelector(".count").textContent
      );
      localStorage.setItem(LS_KEY, JSON.stringify(products));
      if (
        Number(target.parentElement.querySelector(".count").textContent) == 0
      ) {
        target.parentElement.parentElement.remove();
        products.splice(
          products.findIndex((el) => el.id === +target.dataset.id),
          1
        );
        localStorage.setItem(LS_KEY, JSON.stringify(products));
      }
    }
    if (target.classList.contains("increment")) {
      target.parentElement.querySelector(".count").textContent =
        Number(target.parentElement.querySelector(".count").textContent) + 1;
      const index = products.findIndex((el) => el.id === +target.dataset.id);
      products[index].count = Number(
        target.parentElement.querySelector(".count").textContent
      );
      localStorage.setItem(LS_KEY, JSON.stringify(products));
    }
  });
};

setProducts();
formElem.addEventListener("submit", (event) => {
  event.preventDefault();
  addProduct(nameElem.value);
});
console.log(products);

upgradeCount();
