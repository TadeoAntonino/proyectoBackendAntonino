import { io } from "socket.io-client";
import UserController from "../../controllers/users.controller.js";

const saludarUser = document.getElementById("saludarUser");
const user = UserController.getUser();

saludarUser.innerHTML = `<p>${user.firstName}</p>`;

const socket = io();

socket.on("listChange", (data) => {
  updateList(data);
  changeSort(data);
});

const listProducts = document.getElementById("listProducts");
const button = document.getElementById("botonSort");

const changeSort = (data) => {
  button.addEventListener("click", () => {});
};

const updateList = (list) => {
  listProducts.innerHTML = "";
  list.forEach((item) => {
    const product = document.createElement("div");
    product.innerHTML = `
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <p>Price: ${item.price}</p>
                        <p>id: ${item.id}</p>
                        <p>code :${item.code}</p>
                        <p>Stock:${item.stock}</p>
                    `;
    listProducts.appendChild(product);
  });
};
