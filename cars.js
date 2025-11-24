document.addEventListener("DOMContentLoaded", function () {
  const cardsPerPage = 10;
  const filters = {
    carMake: 'all',
    engineType: 'all',
    price: 'all'
  };

  const carMakeFilter = document.getElementById('carMakeFilter');
  const engineTypeFilter = document.getElementById('engineTypeFilter');
  const priceFilter = document.getElementById('priceFilter');

  if (carMakeFilter) carMakeFilter.addEventListener('change', updateFilters);
  if (engineTypeFilter) engineTypeFilter.addEventListener('change', updateFilters);
  if (priceFilter) priceFilter.addEventListener('change', updateFilters);

  function updateFilters() {
    filters.carMake = carMakeFilter ? carMakeFilter.value : 'all';
    filters.engineType = engineTypeFilter ? engineTypeFilter.value : 'all';
    filters.price = priceFilter ? priceFilter.value : 'all';

    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
      showPage(activeTab, 1);
    }
  }

  function filterCards(cards) {
    return cards.filter(card => {
      const cardMake = card.getAttribute('data-make');
      const cardEngine = card.getAttribute('data-engine');
      const cardPrice = card.getAttribute('data-price');

      const matchesMake = filters.carMake === 'all' || cardMake === filters.carMake;
      const matchesEngine = filters.engineType === 'all' || cardEngine === filters.engineType;
      const matchesPrice = filters.price === 'all' || cardPrice === filters.price;

      return matchesMake && matchesEngine && matchesPrice;
    });
  }

  function showPage(tabContent, page) {
    const allCards = Array.from(tabContent.querySelectorAll(".card"));
    const filteredCards = filterCards(allCards);

    allCards.forEach(card => card.classList.add("hidden"));

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const visibleCards = filteredCards.slice(start, end);

    visibleCards.forEach(card => card.classList.remove("hidden"));

    updateResultsCount(filteredCards.length, page, visibleCards.length);
    renderPagination(tabContent, filteredCards.length, page);
  }

  function updateResultsCount(totalCount, currentPage, visibleCardsCount) {
    const startCount = document.getElementById('startCount');
    const endCount = document.getElementById('endCount');
    const totalCountElement = document.getElementById('totalCount');

    if (!startCount || !endCount || !totalCountElement) return;

    if (totalCount === 0) {
      startCount.textContent = 0;
      endCount.textContent = 0;
      totalCountElement.textContent = 0;
      return;
    }

    const start = (currentPage - 1) * cardsPerPage + 1;
    const end = start + visibleCardsCount - 1;

    startCount.textContent = start;
    endCount.textContent = end;
    totalCountElement.textContent = totalCount;

    setTimeout(() => {
      startCount.textContent = start;
      endCount.textContent = end;
      totalCountElement.textContent = totalCount;
    }, 200);
  }

  function renderPagination(tabContent, totalCards, currentPage) {
    const pagination = tabContent.querySelector(".pagination");
    if (!pagination) return;

    pagination.innerHTML = "";

    if (totalCards <= cardsPerPage) {
      pagination.style.display = "none";
      return;
    }

    pagination.style.display = "flex";
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    if (currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.innerHTML = "&laquo;";
      prevBtn.onclick = () => showPage(tabContent, currentPage - 1);
      pagination.appendChild(prevBtn);
    }

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      if (i === currentPage) btn.className = "active";
      btn.onclick = () => showPage(tabContent, i);
      pagination.appendChild(btn);
    }

    if (currentPage < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.innerHTML = "&raquo;";
      nextBtn.onclick = () => showPage(tabContent, currentPage + 1);
      pagination.appendChild(nextBtn);
    }
  }

  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab) {
    showPage(activeTab, 1);
  }

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));

      tab.classList.add("active");

      const targetId = tab.getAttribute("data-tab");
      const targetContent = document.getElementById(targetId);

      if (!targetContent) return;

      targetContent.classList.add("active");

      setTimeout(() => {
        showPage(targetContent, 1);
      }, 50);
    });
  });

  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function () {
      window.location.href = "https://novatedfinanceaustralia.com.au/novated-lease-savings-calculator";
    });
  });
});