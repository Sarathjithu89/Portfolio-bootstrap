function myFunc() {
  var typed = new Typed(".typed", {
    strings: ["<u>Web Developer</u>", "<u>Designer</u>"],
    typeSpeed: 150,
    loop: true,
    backDelay: 2000,
    backSpeed: 30,
  });

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
    });
  });
}

function anni() {
  let data_nascita = new Date("1997-04-12");
  let data_finale = new Date() - data_nascita;
  let anni = Math.floor(data_finale / 31536000000);
  document.getElementById(
    "data_nascita"
  ).innerHTML = `${data_nascita.toLocaleDateString("it-IT")}`;
  document.getElementById("anni").innerHTML = `${anni}`;
}
myFunc();
anni();

// for email

// function sendMail() {
//   var parms = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     message: document.getElementById("message").value,
//   };
//   const serviceID = "service_edb4yn6";
//   const templateID = "template_xe88nm3";
//   emailjs.send(serviceID, templateID, parms).then(alert("Email sent"));
// }

// window.onload = function () {
//   document
//     .getElementById("contact-form")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();
//       // these IDs from the previous steps
//       emailjs.sendForm("service_edb4yn6", "contact_form", this).then(
//         () => {
//           console.log("SUCCESS!");
//         },
//         (error) => {
//           console.log("FAILED...", error);
//         }
//       );
//     });
// };

// window.onload = function () {
//   // // Initialize EmailJS with your user ID
//   // emailjs.init("service_edb4yn6"); // Replace with your EmailJS user ID

//   document
//     .getElementById("contact-form")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();

//       const formStatus = document.getElementById("form-status");

//       emailjs.sendForm("service_edb4yn6", "template_xe88nm3", this).then(
//         () => {
//           formStatus.innerHTML =
//             '<div class="alert alert-success">Message sent successfully!</div>';
//           this.reset(); // Reset form fields
//         },
//         (error) => {
//           formStatus.innerHTML =
//             '<div class="alert alert-danger">Failed to send message. Please try again later.</div>';
//           console.error("FAILED...", error);
//         }
//       );
//     });
// };
