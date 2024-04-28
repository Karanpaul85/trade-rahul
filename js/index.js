document.addEventListener("DOMContentLoaded", function () {
  var testimonials = document.querySelector("#testimonials-slider");
  const navbar = document.querySelector("nav");
  if (testimonials) {
    new Splide("#testimonials-slider", {
      type: "loop",
      perPage: 3,
      autoplay: true,
      arrows: false,
      interval: 3500,
      gap: 20,
      focus: "center",
      breakpoints: {
        768: {
          perPage: 1,
          pagination: false,
        },
      },
    }).mount();
  }
  //get first letter of reviewer
  const allReviewers = document.querySelectorAll(".splide__slide .revier");
  allReviewers &&
    allReviewers.forEach((item) => {
      const firstLetter = item.textContent[0];
      item.setAttribute("data-before", firstLetter);
    });

  //form validation
  var form = document.getElementById("contactForm");

  form &&
    form.addEventListener("submit", function (error) {
      var errorClasses = document.querySelectorAll(".errors"),
        name = document.getElementById("name"),
        email = document.getElementById("email"),
        phone = document.getElementById("phone"),
        services = document.getElementById("servicesType");
      //remove error classes
      errorClasses?.forEach(function (err) {
        err.remove();
      });
      //add error class and msg
      if (name && name.value === "") {
        addError(name, "Name is required");
        error.preventDefault();
      }
      if (email && email.value === "") {
        addError(email, "Email is required");
        error.preventDefault();
      }
      if (phone && phone.value === "") {
        addError(phone, "Phone Number is required");
        error.preventDefault();
      }
      if (services && services.value === "") {
        addError(services, "Please select any service");
        error.preventDefault();
      }
    });

  //add error msg
  function addError(elem, msg) {
    var spanElm = document.createElement("span");
    spanElm.className = "errors";
    spanElm.textContent = msg;
    if (elem.parentNode.tagName === "LABEL") {
      elem.parentNode.after(spanElm);
    } else {
      elem.after(spanElm);
    }

    elem.classList.add("errors1");
  }

  //btn click
  const links = document.querySelectorAll("nav ul li a");
  const formLink = document.querySelectorAll(".services ul li .headerPhone");
  const menuList = document.querySelector("nav");

  // Add event listener to all links
  links.forEach(function (elem) {
    elem.addEventListener("click", smoothScroll);
  });

  formLink.forEach(function (elem) {
    if (elem.hash) {
      elem.addEventListener("click", smoothScroll);
    }
  });
  // Magic function to scroll smooth!
  function smoothScroll(e) {
    const hm = document.querySelector(".hm");
    // Prevent default anchor behaviour
    e.preventDefault();
    links.forEach(function (elem) {
      elem.classList.remove("active");
    });
    // Get the targets position
    //   const offsetTop = document.querySelector("#contact").offsetTop;
    const targetElem = e.target.getAttribute("href")
      ? e.target.getAttribute("href")
      : e.target.parentNode.getAttribute("href");
    const offsetTop =
      targetElem && document.querySelector(targetElem).offsetTop;
    e.target.classList.add("active");
    if (menuList.classList.contains("open")) {
      menuList.classList.remove("open");
    }
    if (hm && hm.classList.contains("open")) {
      hm.classList.remove("open");
    }

    // Finally scroll to target
    scroll({
      top: offsetTop - 80,
      behavior: "smooth",
    });
  }

  //add and remove class on scroll
  var scrollPosition = window.scrollY;
  var logoContainer = document.getElementById("header");

  window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;

    if (scrollPosition >= 30) {
      logoContainer.classList.add("darkHeader");
    } else {
      logoContainer.classList.remove("darkHeader");
    }
  });
  if (screen.width <= 768) {
    var headerTopRight = document.querySelector("header .topRight");
    if (headerTopRight) {
      const hm = document.createElement("div");
      hm.classList = "hm";
      hm.innerHTML = "<span></span>";
      hm.addEventListener("click", () => {
        if (hm.classList.contains("open") && navbar) {
          hm.classList.remove("open");
          navbar.classList.remove("open");
        } else {
          hm.classList.add("open");
          navbar.classList.add("open");
        }
      });
      headerTopRight.appendChild(hm);
    }
  }
});
