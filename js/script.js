// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('John Graphics Images - Modern Creative Website Loaded!');
    
    // Initialize all features
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupServiceCardEffects();
    setupCTAButtonRipple();
    setupParallaxEffect();
    setupImageHandlers();
    setupResponsiveHandlers();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Fade in animation on scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced service card hover effects
function setupServiceCardEffects() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
    });
}

// CTA Button ripple effect
function setupCTAButtonRipple() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    }
}

// Parallax effect for floating shapes
function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const floatingShapes = document.querySelector('.floating-shapes');
        if (floatingShapes) {
            floatingShapes.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Image handling functions
function setupImageHandlers() {
    const images = document.querySelectorAll('.service-image-placeholder img');
    
    images.forEach(img => {
        // Show image and hide placeholder when image loads
        img.onload = function() {
            this.style.display = 'block';
            const placeholder = this.parentElement.querySelector('.placeholder-text');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        };
        
        // Handle image error
        img.onerror = function() {
            console.log('Image failed to load:', this.src);
            const placeholder = this.parentElement.querySelector('.placeholder-text');
            if (placeholder) {
                placeholder.style.display = 'block';
                placeholder.textContent = 'Image not available';
            }
        };
        
        // Check if image is already loaded (cached)
        if (img.complete && img.naturalWidth > 0) {
            img.onload();
        }
    });
}

// Responsive handlers
function setupResponsiveHandlers() {
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            handleResponsiveChanges();
        }, 250);
    });
    
    // Initial call
    handleResponsiveChanges();
}

// Handle responsive changes
function handleResponsiveChanges() {
    const width = window.innerWidth;
    
    // Adjust hero content padding based on screen width
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        if (width <= 480) {
            heroContent.style.padding = '1.5rem';
        } else if (width <= 768) {
            heroContent.style.padding = '2rem';
        } else {
            heroContent.style.padding = '4rem';
        }
    }
    
    // Adjust services grid for very small screens
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid && width <= 400) {
        servicesGrid.style.gridTemplateColumns = '1fr';
        servicesGrid.style.gap = '1.5rem';
    }
}

// Utility functions for adding images dynamically
function addServiceImage(imageId, imageSrc, altText) {
    const img = document.getElementById(imageId);
    if (img) {
        img.src = imageSrc;
        img.alt = altText || 'Service image';
        
        // Trigger the onload event if image is already cached
        if (img.complete && img.naturalWidth > 0) {
            img.onload();
        }
        
        console.log(`Image added: ${imageId} -> ${imageSrc}`);
    } else {
        console.warn(`Image element with ID '${imageId}' not found`);
    }
}

// Loading state management
function showImageLoading(imageId) {
    const img = document.getElementById(imageId);
    if (img) {
        const placeholder = img.parentElement.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.textContent = 'Loading image...';
            placeholder.style.display = 'block';
        }
    }
}

function hideImageLoading(imageId) {
    const img = document.getElementById(imageId);
    if (img) {
        const placeholder = img.parentElement.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    }
}

// Advanced animation functions
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .section-title');
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            if (isElementInViewport(el)) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        }, index * 100);
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Navigation active state management
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(animateOnScroll, 100));

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Fade-in animation on scroll
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => {
        observer.observe(el);
    });
});

// Example usage for adding images:
// addServiceImage('billboard-img', 'path/to/billboard-image.jpg', 'Billboard & LED Advertising');
// addServiceImage('vehicle-img', 'path/to/vehicle-wraps-image.jpg', 'Vehicle & Wall Wraps');

// Initialize navigation active state
updateActiveNavigation();

// Add some interactive feedback
document.addEventListener('click', function(e) {
    // Add click feedback to interactive elements
    if (e.target.matches('.service-card, .cta-button, .nav-menu a')) {
        e.target.style.transform = 'scale(0.98)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

console.log('All website features initialized successfully!');

// Example: show images when loaded
document.querySelectorAll('.service-image-placeholder img').forEach(img => {
    img.onload = function() {
        this.style.display = 'block';
        const placeholder = this.parentElement.querySelector('.placeholder-text');
        if (placeholder) placeholder.style.display = 'none';
    };
    img.onerror = function() {
        const placeholder = this.parentElement.querySelector('.placeholder-text');
        if (placeholder) placeholder.textContent = 'Image not available';
    };
});