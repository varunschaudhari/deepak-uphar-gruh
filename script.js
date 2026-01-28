// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Sticky Navbar
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-play carousel
setInterval(nextSlide, 5000);

// Manual indicator control
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Gallery Carousel
let currentGallerySlide = 0;
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryIndicators = document.querySelectorAll('.gallery-indicator');
const galleryPrevBtn = document.getElementById('galleryPrev');
const galleryNextBtn = document.getElementById('galleryNext');
const galleryTrack = document.getElementById('galleryTrack');
const totalGallerySlides = gallerySlides.length;

function showGallerySlide(index) {
    // Update slide visibility
    gallerySlides.forEach((slide, i) => {
        slide.classList.remove('active');
        galleryIndicators[i].classList.remove('active');
    });
    
    gallerySlides[index].classList.add('active');
    galleryIndicators[index].classList.add('active');
    
    // Move track
    if (galleryTrack) {
        galleryTrack.style.transform = `translateX(-${index * 100}%)`;
    }
}

function nextGallerySlide() {
    currentGallerySlide = (currentGallerySlide + 1) % totalGallerySlides;
    showGallerySlide(currentGallerySlide);
}

function prevGallerySlide() {
    currentGallerySlide = (currentGallerySlide - 1 + totalGallerySlides) % totalGallerySlides;
    showGallerySlide(currentGallerySlide);
}

// Gallery carousel controls
if (galleryNextBtn) {
    galleryNextBtn.addEventListener('click', nextGallerySlide);
}

if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener('click', prevGallerySlide);
}

// Gallery indicator control
galleryIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentGallerySlide = index;
        showGallerySlide(currentGallerySlide);
    });
});

// Auto-play gallery carousel
let galleryAutoPlay = setInterval(nextGallerySlide, 4000);

// Pause on hover
const galleryCarousel = document.getElementById('galleryCarousel');
if (galleryCarousel) {
    galleryCarousel.addEventListener('mouseenter', () => {
        clearInterval(galleryAutoPlay);
    });
    
    galleryCarousel.addEventListener('mouseleave', () => {
        galleryAutoPlay = setInterval(nextGallerySlide, 4000);
    });
}

// Menu Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.menu-item, .gallery-item, .highlight-card, .testimonial-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Lightbox Effect (Optional Enhancement)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Simple alert - can be enhanced with a modal
            console.log('Gallery item clicked:', img.alt);
        }
    });
});

// Form Validation (if contact form is added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#C8102E';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// WhatsApp Pre-filled Message Enhancement
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Ensure the link opens in a new tab
        if (!this.target) {
            this.target = '_blank';
        }
    });
});

// Lazy Loading Images (Performance Enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to current section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    highlightNavigation();
    showSlide(0);
    
    // Initialize gallery carousel
    if (gallerySlides.length > 0) {
        showGallerySlide(0);
    }
});
