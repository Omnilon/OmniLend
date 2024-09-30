/* script.js */

// Array of image URLs for the slideshow
const slideImages = [
    'images/slide1.jpg',
    'images/slide2.jpg',
    'images/slide3.jpg',
    'images/slide4.jpg',
    'images/slide5.jpg',
    'images/slide6.jpg',
    'images/slide7.jpg',
    'images/slide8.jpg',
    'images/slide9.jpg',
    'images/slide10.jpg'
];

// Number of slides to show at once
const slidesToShow = 3;

// Initialize variables
let currentPosition = 0;
const totalSlides = slideImages.length;

// Function to create slides
function createSlides() {
    const slideshow = document.querySelector('.slideshow');
    slideImages.forEach((imageSrc) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const img = document.createElement('img');
        img.src = imageSrc;
        slide.appendChild(img);
        slideshow.appendChild(slide);
    });
}

// Function to move to the next slide
function nextSlide() {
    if (currentPosition >= totalSlides - slidesToShow) {
        currentPosition = 0;
    } else {
        currentPosition++;
    }
    updateSlidePosition();
}

// Function to move to the previous slide
function prevSlide() {
    if (currentPosition <= 0) {
        currentPosition = totalSlides - slidesToShow;
    } else {
        currentPosition--;
    }
    updateSlidePosition();
}

// Function to update slide position
function updateSlidePosition() {
    const slideshow = document.querySelector('.slideshow');
    const slideWidth = slideshow.querySelector('.slide').offsetWidth;
    slideshow.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
}

// Auto-slide function
function autoSlide() {
    nextSlide();
    setTimeout(autoSlide, 3000); // Change slide every 3 seconds
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
    createSlides();
    autoSlide();
});

/* script.js */

/* Existing code for the slideshow on Home.html */
/* ... */

/* Tab Functionality for Inventory Page */
function openTab(evt, tabName) {
    // Declare all variables
    let i, tabcontent, tabbuttons;

    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tab-button" and remove the class "active"
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}
