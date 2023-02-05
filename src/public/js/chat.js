const socket = io();
let name = document.getElementById("name");
let submit = document.getElementById("submit");
let message = document.getElementById("message");
let messages = document.getElementById("messages");

let newMessages = [];

socket.on("Welcome", (arg) => {
  console.log(arg);
  newMessages = arg.messages;
  printMessages(newMessages);
});

let user = null;

if (!user) {
  Swal.fire({
    title: "Bienvenido. Por favor identifiquese 😃.",
    input: "text",
    text: "Nombre de usuario",
    allowOutsideClick: false,
    inputValidator: (value) => {
      return !value && "Escriba su nombre de usuario.";
    },
  }).then((newUser) => {
    user = newUser.value;
    name.innerText = user;
    socket.emit("newUser", user);
  });
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const messageText = message.value.trim();
  message.value = "";
  socket.emit("message", { user, message: messageText });
});

socket.on("message", (data) => {
  newMessages.push(data);
  printMessages(newMessages);
});

function printMessages(newMessages) {
  let _newMessages = "";
  for (const message of newMessages) {
    _newMessages += `${message.user}: ${message.message} \n`;
  }
  messages.innerText = _newMessages;
}

socket.on("newUser", (nombre) => {
  Swal.fire({
    text: `¡Bienvenido, ${nombre}!`,
    toast: true,
    position: "top-center",
  });
});
