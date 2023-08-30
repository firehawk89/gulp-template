export default function btnActions() {
  console.log("Hello from btn.js");

  document.querySelector(".btn").addEventListener("click", (event) => {
    event.preventDefault();
    alert("You have clicked a button!");
  });
}
