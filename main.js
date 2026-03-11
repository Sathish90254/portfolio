// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksList = document.querySelectorAll('.nav-links a');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close menu on link click
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// HERO ANIMATION
const heroAnimation = () => {
    anime.timeline({
        autoplay: false
    })
    .add({
        targets: '.hero h1',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuad'
    })
    .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutQuad'
    }, 100)
    .add({
        targets: '.hero-tagline',
        opacity: [0, 1],
        color: ['#cbd5e1', '#00d4ff'],
        duration: 1000,
        easing: 'easeOutQuad'
    }, 200)
    .add({
        targets: '.hero-buttons .btn',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuad',
        delay: anime.stagger(100)
    }, 300)
    .add({
        targets: '.hero-social .social-icon',
        opacity: [0, 1],
        scale: [0, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .6)',
        delay: anime.stagger(100)
    }, 400)
    .play();
};

// Scroll Animation
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {

            entry.target.classList.add('animated');

            if (entry.target.classList.contains('section-title')) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
            }

            if (entry.target.classList.contains('skill-category')) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
            }

            if (entry.target.classList.contains('project-card')) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [40, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
            }

            if (entry.target.classList.contains('education-card')) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    scale: [0.95, 1],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
            }

            if (entry.target.classList.contains('timeline-item')) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateX: [-30, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
            }

            if (entry.target.classList.contains('info-box')) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.section-title, .skill-category, .project-card, .education-card, .timeline-item, .info-box')
.forEach(el => observer.observe(el));

// Button Hover Animation
document.querySelectorAll('.btn, .project-link, .submit-btn').forEach(btn => {

    btn.addEventListener('mouseenter', () => {
        anime({
            targets: btn,
            scale: 1.05,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    btn.addEventListener('mouseleave', () => {
        anime({
            targets: btn,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

});

// Skill Tag Animation
document.querySelectorAll('.skill-tag').forEach(tag => {

    tag.addEventListener('mouseenter', () => {
        anime({
            targets: tag,
            scale: 1.1,
            duration: 400,
            easing: 'easeOutElastic(1,.6)'
        });
    });

    tag.addEventListener('mouseleave', () => {
        anime({
            targets: tag,
            scale: 1,
            duration: 400,
            easing: 'easeOutElastic(1,.6)'
        });
    });

});

// Floating Social Icons
anime({
    targets: '.hero-social .social-icon',
    translateY: [0, -10],
    duration: 3000,
    easing: 'easeInOutQuad',
    loop: true,
    direction: 'alternate',
    delay: anime.stagger(200)
});

// Glow Effect
anime({
    targets: '.hero-name',
    opacity: [0.8, 1],
    duration: 2000,
    easing: 'easeInOutQuad',
    loop: true,
    direction: 'alternate'
});

// Contact Form
const form = document.querySelector('.contact-form');

if (form) {

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        anime({
            targets: '.submit-btn',
            rotate: [0, 360],
            duration: 1000,
            easing: 'easeInOutQuad'
        });

        setTimeout(() => {
            alert("Thank you! I'll contact you soon.");
            form.reset();
        }, 1000);

    });

}

// Navbar Shadow on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {

        anime.set(navbar, {
            boxShadow: '0 8px 32px rgba(0,212,255,0.2)'
        });

    } else {

        anime.set(navbar, {
            boxShadow: '0 8px 32px rgba(0,212,255,0.1)'
        });

    }

});

// Start Animation
window.addEventListener('load', heroAnimation);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const href = this.getAttribute('href');

        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);

        if (target) {

            const offsetTop = target.offsetTop - 70;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

        }

    });

});