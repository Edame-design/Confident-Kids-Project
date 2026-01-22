let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slides");
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  // Move to next slide
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }  
  
  slides[slideIndex - 1].style.display = "block";  

  // Change slide every 3 seconds
  setTimeout(showSlides, 3000);
}

// script.js
window.addEventListener("scroll", function() {
  const nav = document.querySelector(".main-nav");
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// Smooth scroll for all navbar links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100, // adjust offset for fixed navbar
        behavior: "smooth"
      });
    }
  });
});

const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay-1');

// Toggle menu
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
});

