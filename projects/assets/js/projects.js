document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const filters = Array.from(document.querySelectorAll(".filter-btn"));
  const searchInput = document.querySelector("#project-search");

  if (!cards.length || !searchInput) {
    console.warn("Projects search not initialized: cards or search input not found.");
    return;
  }

  let activeFilter = "All";

  function normalizeText(text) {
    return (text || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function applyFilters() {
    const query = normalizeText(searchInput.value);

    cards.forEach(function (card) {
      const category = card.getAttribute("data-category") || "";
      const cardText = normalizeText(card.textContent);

      const matchesFilter =
        activeFilter === "All" || category === activeFilter;

      const matchesSearch =
        query === "" || cardText.includes(query);

      if (matchesFilter && matchesSearch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", applyFilters);

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.getAttribute("data-filter") || "All";

      filters.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");
      applyFilters();
    });
  });

  applyFilters();
});