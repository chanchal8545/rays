// script.js
// ==================== BATTERY CHARGE ANIMATION ====================
const fill = document.getElementById('batteryFill');
const chargeText = document.getElementById('chargeText');
let charge = 0;

function chargeBattery() {
    if (charge < 100) {
        charge += 0.6;
        if (charge > 100) charge = 100;
        fill.style.height = charge + '%';
        chargeText.textContent = Math.floor(charge) + '%';
        requestAnimationFrame(chargeBattery);
    } else {
        setTimeout(() => { charge = 0; chargeBattery(); }, 2000);
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
            const step = Math.ceil(target / 80);
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
    'Powering Industries with Reliable Energy',
    'Innovation · Performance · Trust',
    'RAYS Industrial Batteries'
];
let idx = 0,
    charIdx = 0,
    isDeleting = false;

function typeEffect() {
    const current = phrases[idx];
    if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2500);
            return;
        }
        setTimeout(typeEffect, 90);
    } else {
        typingEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            idx = (idx + 1) % phrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 50);
    }
}
typeEffect();

// ==================== PRODUCT SLIDER ====================
const track = document.getElementById('sliderTrack');
let slidePos = 0;

setInterval(() => {
    const cardWidth = document.querySelector('.slide-card')?.offsetWidth + 24 || 284;
    const maxScroll = (track.children.length - 4) * cardWidth;
    slidePos += cardWidth;
    if (slidePos > maxScroll) slidePos = 0;
    track.style.transform = `translateX(-${slidePos}px)`;
}, 2200);

// ==================== SCROLL REVEAL ====================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
reveals.forEach(r => revealObserver.observe(r));

// ==================== RESPONSIVE NAVBAR ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
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
        document.querySelectorAll('.dropdown-parent').forEach(p => {
            p.classList.remove('active-dropdown');
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
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.4 + 0.15;
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
        ctx.fillStyle = `rgba(211, 47, 47, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles(count = 100) {
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
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(211, 47, 47, ${0.06 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.6;
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
    initParticles(100);
});