export default function btnActions() {
  console.log("Hello from btn.js");

  document.querySelector(".general-btn").addEventListener("click", (event) => {
    alert("Scrolling to slider...");
  });
}
