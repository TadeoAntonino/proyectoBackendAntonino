const socket = io();
let name = document.getElementById("name");
let submit = document.getElementById("submit");
let message = document.getElementById("message");
let messages = document.getElementById("messages");

let newMessages = [];
let user = null;

function printMessages(newMessages) {
  let _newMessages = "";
  if (newMessages?.length) {
    for (const message of newMessages) {
      _newMessages += `${message.user}: ${message.message} \n`;
    }
    messages.innerText = _newMessages;
  } else {
    console.log(newMessages);
  }
}

socket.on("Welcome", (arg) => {
  newMessages = arg.messages??newMessages;
  printMessages(newMessages);
});

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
  newMessages?.push(data);
  printMessages(newMessages);
});

socket.on("newUser", (nombre) => {
  Swal.fire({
    text: `¡Bienvenido, ${nombre}!`,
    toast: true,
    position: "top-center",
  });
});
