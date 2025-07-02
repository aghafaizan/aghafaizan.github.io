document.addEventListener("DOMContentLoaded", function () {
  // Toggle mobile menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Custom cursor functionality
  const cursorRing = document.querySelector(".cursor-ring");
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  const easing = 0.2; // Lower value = smoother animation but slower response

  // Check if it's not a touch device
  const isTouchDevice = "ontouchstart" in document.documentElement;
  if (!isTouchDevice && cursorRing) {
    // Initial cursor position
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, .btn, .project-card, .skill-card"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hover");
      });
    });

    // Animation loop for smooth cursor movement
    function animateCursor() {
      // Calculate smooth movement with easing
      ringX += (mouseX - ringX) * easing;
      ringY += (mouseY - ringY) * easing;

      // Apply the transform
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

      // Continue the animation loop
      requestAnimationFrame(animateCursor);
    }

    // Start the animation
    animateCursor();
  } else if (cursorRing) {
    // Hide cursor on touch devices
    cursorRing.style.display = "none";
  }

  // Existing code
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      // Prevent scrolling when menu is open
      document.body.classList.toggle("no-scroll");
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !hamburger.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  // Fetch projects from JSON file
  fetch("data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const projectsContainer = document.getElementById("projects-container");
      if (projectsContainer) {
        projectsContainer.innerHTML = ""; // Clear any existing content

        data.forEach((project) => {
          const projectCard = `
                        <div class="project-card">
                            <img src="${project.image}" alt="${project.title}" class="project-img">
                            <div class="project-info">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <a href="${project.liveLink}" target="_blank" class="btn">Live Preview</a>
                            </div>
                        </div>
                    `;
          projectsContainer.innerHTML += projectCard;
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
      const projectsContainer = document.getElementById("projects-container");
      if (projectsContainer) {
        projectsContainer.innerHTML =
          "<p>Failed to load projects. Please try again later.</p>";
      }
    });

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // In a real application, you would send this data to a server
      // For this static site, we'll just log it and show a success message
      console.log("Form submitted:", { name, email, message });

      // Show success message
      const formContainer = document.querySelector(".form-container");
      formContainer.innerHTML = `
                <div class="success-message">
                    <h3>Thank you for your message, ${name}!</h3>
                    <p>I'll get back to you soon at ${email}.</p>
                </div>
            `;
    });
  }

  // Add scroll animation for sections
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("visible");
      }
    });
  });
});
