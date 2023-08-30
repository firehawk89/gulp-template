export default function btnActions() {
  document.querySelector(".btn").addEventListener("click", (event) => {
    event.preventDefault();
    alert("You have clicked a button!");
  });
}
