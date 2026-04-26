/* ══════════════════════════════════════════════
   Muhammad Ilyas Portfolio — Enhanced JS 2026
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar Scroll & Active State ──
    const navbar = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    // ── Mobile Menu Toggle ──
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('open');
            });
        });
    }

    // ── Intersection Observer for Animations ──
    const animationOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // ── Stats Counter Animation ──
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count')) || parseInt(el.textContent);
                let count = 0;
                const speed = 2000 / target; // Total 2 seconds animation

                const updateCount = () => {
                    if (count < target) {
                        count++;
                        el.innerText = count;
                        setTimeout(updateCount, speed);
                    } else {
                        el.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 1 });
    counters.forEach(el => counterObserver.observe(el));

    // ── Floating Tech Particles ──
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(59, 130, 246, ${Math.random() * 0.4});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 5}s linear infinite;
                pointer-events: none;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // ── Modern Form Submission ──
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            // Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... ⏳';

            // Simulate API Call (You can integrate EmailJS here later)
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent! ✓';
                submitBtn.style.background = '#06d6a0';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // ── Smooth Scrolling ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
