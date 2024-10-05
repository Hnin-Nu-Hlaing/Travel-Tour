// Element selection
const contentItems = document.querySelectorAll('.content-item');
const scrollTopBtn = document.querySelector('.scroll-top-btn');
const headerHeight = document.querySelector('.sticky-header').offsetHeight;


// Scroll Event Listener  
window.addEventListener('scroll', function() {
  let scrollY = window.scrollY;
  // scroll ဖြစ်တဲ့အချိန် header ကိုပြောင်းပြီး အောက်က content-item များကို header အထဲထဲကို ထိုးတက်စေ
  contentItems.forEach((item, index) => {
    const itemTop = item.offsetTop;
    const itemHeight = item.offsetHeight;
    if (scrollY + headerHeight >= itemTop && scrollY < itemTop + itemHeight) {
      item.style.transform = 'translateY(-' + (scrollY - itemTop + headerHeight) + 'px)';
    } else {
      item.style.transform = 'translateY(0px)';
    }
  });


  // scroll-to-top button ကိုပြခြင်း
  if (scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});


let slideIndex = 0; // Initialize slide index



// Function to show slides
function showSlides() {
  const slides = document.getElementsByClassName("mySlides");
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  // Update slide index
  slideIndex++;
  if (slideIndex >= slides.length) { slideIndex = 0; } // Reset if exceeds
  
  // Show the current slide
  slides[slideIndex].style.display = "block";  
  
  // Change slide every 3 seconds
  setTimeout(showSlides, 5000); 
}

// Start the slideshow
showSlides();


// Scroll to top function
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

document.querySelectorAll('.content-item').forEach(item => {
const slides = item.querySelectorAll('.mySlides');
let slideIndex = 0;

function showSlides() {
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none'; // Show the current slide
    });

    slideIndex = (slideIndex + 1) % slides.length; // Loop back to the first slide
    setTimeout(showSlides, 5000); // Change image every 3 seconds
}

showSlides(); // Start the slideshow
});

