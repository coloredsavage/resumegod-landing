// Animation for hero light effect
document.addEventListener('DOMContentLoaded', () => {
    const light = document.querySelector('.hero-light');
    let angle = 0;
    
    function animate() {
        angle += 0.1;
        if (light) {
            light.style.filter = `hue-rotate(${angle}deg)`;
        }
        requestAnimationFrame(animate);
    }
    
    // Start animation if light element exists
    if (light) {
        animate();
    }

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .prompt-card, .section-title, .section-subtitle');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Enhanced glow button effect
    const glowButton = document.querySelector('.btn-beta.glow');
    if (glowButton) {
        glowButton.addEventListener('mouseenter', () => {
            glowButton.style.transform = 'scale(1.05)';
            glowButton.style.boxShadow = '0 0 30px rgba(255, 68, 68, 0.6)';
        });

        glowButton.addEventListener('mouseleave', () => {
            glowButton.style.transform = 'scale(1)';
            glowButton.style.boxShadow = 'none';
        });
    }

    // Add parallax effect to hero light
    window.addEventListener('scroll', () => {
        if (light) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            light.style.transform = `translateY(-50%) translateY(${rate}px)`;
        }
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Additional utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Handle window resize with debounce
window.addEventListener('resize', debounce(() => {
    // Recalculate any responsive elements if needed
}, 250));
