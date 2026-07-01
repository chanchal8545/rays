// script.js
// ==================== PRELOADER ====================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000);
});

// ==================== NAVBAR SCROLL ====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== NAVBAR ACTIVE LINK ====================
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links > li > a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ==================== HAMBURGER MENU ====================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.dropdown-parent').forEach(parent => {
    parent.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            parent.classList.toggle('active-dropdown');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.querySelectorAll('.dropdown-parent').forEach(p => {
            p.classList.remove('active-dropdown');
        });
    }
});

// ==================== BATTERY CHARGE ANIMATION ====================
const fill = document.getElementById('batteryFill');
const chargeText = document.getElementById('chargeText');
let charge = 0;

function chargeBattery() {
    if (charge < 100) {
        charge += 0.5;
        if (charge > 100) charge = 100;
        fill.style.height = charge + '%';
        chargeText.textContent = Math.floor(charge) + '%';
        requestAnimationFrame(chargeBattery);
    } else {
        setTimeout(() => { charge = 0; chargeBattery(); }, 3000);
    }
}
chargeBattery();

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const step = Math.ceil(target / 70);
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(interval);
                } else {
                    el.textContent = current;
                }
            }, 20);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.3 });
counters.forEach(c => counterObserver.observe(c));

// ==================== TYPING TEXT ====================
const typingEl = document.getElementById('typingText');
const phrases = [
    'Innovative EV Battery Solutions',
    'Premium EV Charger Technology',
    'Sustainable Energy for Tomorrow',
    'Powering Future Mobility'
];
let idx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
    const current = phrases[idx];
    if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 3000);
            return;
        }
        setTimeout(typeEffect, 80);
    } else {
        typingEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            idx = (idx + 1) % phrases.length;
            setTimeout(typeEffect, 500);
            return;
        }
        setTimeout(typeEffect, 40);
    }
}
typeEffect();

// ==================== SCROLL REVEAL ====================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });
revealElements.forEach(el => revealObserver.observe(el));

// ==================== CONTACT FORM ====================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const whatsappMessage = `Hello RAYS Global Energy!%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone || 'N/A'}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/917069159923?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    const btn = this.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #25d366, #1da851) !important';
    btn.style.boxShadow = '0 8px 32px rgba(37, 211, 102, 0.3) !important';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.boxShadow = '';
        this.reset();
    }, 3000);
});

// ==================== VIDEO OVERLAY CLICK ====================
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const overlay = wrapper.querySelector('.video-overlay');
    
    if (video && overlay) {
        overlay.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
            } else {
                video.pause();
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
            }
        });
        
        video.addEventListener('play', () => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        });
        
        video.addEventListener('pause', () => {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
        });
    }
});

// ==================== PARTICLE SYSTEM ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles(count = 80) {
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles(80);
});