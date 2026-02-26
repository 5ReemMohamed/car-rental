document.addEventListener('DOMContentLoaded', function () {


  const menuToggle = document.getElementById('menuToggle');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    if (!sidebarMenu || !sidebarOverlay) return;
    sidebarMenu.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebarMenu || !sidebarOverlay) return;
    sidebarMenu.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', openSidebar);
  sidebarClose?.addEventListener('click', closeSidebar);
  sidebarOverlay?.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebarMenu?.classList.contains('active')) {
      closeSidebar();
    }
  });



  const tabButtons = document.querySelectorAll('.tab-btn');
  const dailyReserve = document.querySelector('.daily-reserve');
  const monthReserve = document.querySelector('.month-reserve');

  function safeDisplay(el, value) {
    if (el) el.style.display = value;
  }

  function updateFormFields(tab) {

    if (tab === 'daily' || tab === 'weekly') {
      safeDisplay(dailyReserve, 'flex');
      safeDisplay(monthReserve, 'none');
    }

    if (tab === 'monthly') {
      safeDisplay(dailyReserve, 'flex');
      safeDisplay(monthReserve, 'block');
    }
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      updateFormFields(this.dataset.tab);
    });
  });

  updateFormFields('daily');



  document.querySelectorAll('.location-input').forEach(input => {

    const wrapper = input.closest('.location-wrapper');
    if (!wrapper) return;

    const dropdown = wrapper.querySelector('.mega-location-dropdown');
    if (!dropdown) return;

    const branches = wrapper.querySelectorAll('.mega-branch-item');
    const categories = wrapper.querySelectorAll('.mega-category');

    input.addEventListener('click', (e) => {
      e.stopPropagation();

      document.querySelectorAll('.mega-location-dropdown')
        .forEach(d => d.style.display = 'none');

      dropdown.style.display = 'block';
    });

    categories.forEach(cat => {
      cat.addEventListener('click', () => {
        categories.forEach(c => c.classList.remove('active'));
        cat.classList.add('active');
      });
    });

    branches.forEach(branch => {

      branch.addEventListener('mouseenter', () => {
        showBranchInfo(branch);
      });

      branch.addEventListener('click', () => {

        branches.forEach(b => b.classList.remove('active'));
        branch.classList.add('active');

        input.value = branch.dataset.name || branch.textContent.trim();
        showBranchInfo(branch);
      });

    });

    function showBranchInfo(branch) {

      const infoBox = wrapper.querySelector('.mega-info');
      if (!infoBox) return;

      const hours = infoBox.querySelector('#branchHours');
      const location = infoBox.querySelector('#branchLocation');

      if (hours) hours.textContent = branch.dataset.hours || 'غير متوفر';
      if (location) location.textContent = branch.dataset.location || 'غير متوفر';
    }

  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.location-wrapper')) {
      document.querySelectorAll('.mega-location-dropdown')
        .forEach(d => d.style.display = 'none');
    }
  });



  if (typeof flatpickr !== "undefined") {

    const pickupInput = document.getElementById("pickup-date");
    const returnInput = document.getElementById("return-date");
    const timeInput = document.getElementById("pickup-time");

    const pickupPicker = pickupInput
      ? flatpickr(pickupInput, {
        dateFormat: "d/m/Y",
        minDate: "today",
        disableMobile: true
      })
      : null;

    const returnPicker = returnInput
      ? flatpickr(returnInput, {
        dateFormat: "d/m/Y",
        minDate: "today",
        disableMobile: true
      })
      : null;

    const timePicker = timeInput
      ? flatpickr(timeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        disableMobile: true
      })
      : null;

    document.addEventListener("click", function (e) {

      if (
        !e.target.closest(".flatpickr-calendar") &&
        !e.target.closest("#pickup-date") &&
        !e.target.closest("#return-date") &&
        !e.target.closest("#pickup-time")
      ) {
        pickupPicker?.close();
        returnPicker?.close();
        timePicker?.close();
      }

    });

  }



  if (typeof Swiper !== "undefined") {

    new Swiper(".headerSwiper", {
      loop: true,
      effect: "fade",
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });

    new Swiper(".fleetSwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      rtl: true,

      grabCursor: true,          
      autoplay: {
        delay: 3000,            
        disableOnInteraction: false,
      },

      speed: 800,              

      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });


  }

  const bookingForm = document.querySelector('.booking-form');
  const carsSection = document.getElementById('carsSection');

  bookingForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    const pickup = document.getElementById('pickupLocation')?.value.trim();
    const dropoff = document.getElementById('dropoffLocation')?.value.trim();
    const pickupDate = document.getElementById('pickup-date')?.value.trim();
    const returnDate = document.getElementById('return-date')?.value.trim();

    if (!pickup || !dropoff || !pickupDate || !returnDate) {
      alert("يرجى تعبئة جميع البيانات أولاً");
      return;
    }

    carsSection.classList.remove('d-none');
    carsSection.classList.add('show');

    carsSection.scrollIntoView({ behavior: "smooth" });
  });
  const categoryFilter = document.getElementById("categoryFilter");
  const priceSort = document.getElementById("priceSort");
  const availableOnly = document.getElementById("availableOnly");
  const carsContainer = document.querySelector(".cars-section .row");
  const carItems = document.querySelectorAll(".car-item");

  function filterCars() {

    let carsArray = Array.from(carItems);

    const selectedCategory = categoryFilter.value;
    const selectedSort = priceSort.value;
    const showAvailable = availableOnly.checked;

    carsArray.forEach(car => {

      const category = car.dataset.category;
      const available = car.dataset.available === "true";

      let show = true;
      if (selectedCategory !== "all" && category !== selectedCategory) {
        show = false;
      }
      if (showAvailable && !available) {
        show = false;
      }

      car.style.display = show ? "block" : "none";
    });

    if (selectedSort) {

      let visibleCars = carsArray.filter(car => car.style.display !== "none");

      visibleCars.sort((a, b) => {
        let priceA = parseFloat(a.dataset.price);
        let priceB = parseFloat(b.dataset.price);

        return selectedSort === "low"
          ? priceA - priceB
          : priceB - priceA;
      });

      visibleCars.forEach(car => carsContainer.appendChild(car));
    }
  }

  categoryFilter.addEventListener("change", filterCars);
  priceSort.addEventListener("change", filterCars);
  availableOnly.addEventListener("change", filterCars);

});
