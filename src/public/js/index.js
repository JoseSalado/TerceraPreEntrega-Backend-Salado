console.log("on");

const socket = io();

const chatBox = document.getElementById("chatBox");

let user;

socket.on("server-message", (data) => {
  console.log(data);
});

Swal.fire({
  title: "Identify",
  input: "text",
  text: "enter your email as user name",
  inputValidator: (value) => {
    return !value && "You need to enter your email";
  },
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
    }
  }
});

socket.on("messageLogs", (data) => {
  const log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.user} says: ${message.message}<br>`;
  });
  log.innerHTML = messages;
});