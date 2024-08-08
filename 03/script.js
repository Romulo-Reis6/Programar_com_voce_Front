const cards = document.querySelectorAll(".card");
const inputSearch = document.querySelector("#input-search");

inputSearch.addEventListener("input", () => {
  cards.forEach((card) => {
    const tittle = card.querySelector(".card-title").innerText.toLowerCase();
    const text = card.querySelector(".card-text").innerText.toLowerCase();
    const textSearch = document
      .querySelector("#input-search")
      .value.toLowerCase();

    tittle.includes(textSearch) | text.includes(textSearch)
      ? card.parentElement.classList.remove("d-none")
      : card.parentElement.classList.add("d-none");
  });
});
