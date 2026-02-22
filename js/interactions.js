/* ======================
   Visual Interactions
   Mouse movement effects, 3D tilt, particles, magnetic buttons
   ====================== */

// ── 1. CUSTOM CURSOR ─────────────────────────────────────────────────────────
const cursor     = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className     = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursor);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// Lerp ring for smooth trailing effect
(function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
})();

// Cursor states on hover
const hoverTargets = 'a, button, .project-card, .blog-card, .timeline-content, .skill-tag, .contact-btn';
document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorRing.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorRing.classList.remove('cursor-hover');
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';
});


// ── 2. PAGE SPOTLIGHT ────────────────────────────────────────────────────────
// A subtle radial glow that follows the cursor across the whole page
const spotlight = document.createElement('div');
spotlight.className = 'page-spotlight';
document.body.appendChild(spotlight);

document.addEventListener('mousemove', e => {
    spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,0.07), transparent 70%)`;
});


// ── 3. HERO PARALLAX ON MOUSE ────────────────────────────────────────────────
const hero = document.querySelector('.hero');
if (hero) {
    const heroContent      = hero.querySelector('.hero-content');
    const floatingCards    = hero.querySelectorAll('.floating-card');
    const heroTitle        = hero.querySelector('.hero-title');
    const heroSubtitle     = hero.querySelector('.hero-subtitle');

    hero.addEventListener('mousemove', e => {
        const rect    = hero.getBoundingClientRect();
        const cx      = rect.left + rect.width  / 2;
        const cy      = rect.top  + rect.height / 2;
        const dx      = (e.clientX - cx) / rect.width;
        const dy      = (e.clientY - cy) / rect.height;

        if (heroContent) {
            heroContent.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
        }
        if (heroTitle) {
            heroTitle.style.textShadow = `${dx * -20}px ${dy * -20}px 40px rgba(99,102,241,0.3)`;
        }

        floatingCards.forEach((card, i) => {
            const depth = (i + 1) * 0.6;
            card.style.transform = `translate(${dx * 30 * depth}px, ${dy * 20 * depth}px)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        if (heroContent) heroContent.style.transform = '';
        if (heroTitle)   heroTitle.style.textShadow  = '';
        floatingCards.forEach(c => c.style.transform = '');
    });
}


// ── 4. 3D TILT ON CARDS ──────────────────────────────────────────────────────
function addTilt(selector, intensity = 10) {
    document.querySelectorAll(selector).forEach(card => {
        card.style.transition      = 'transform 0.1s ease, box-shadow 0.3s ease';
        card.style.willChange      = 'transform';

        card.addEventListener('mousemove', e => {
            const rect  = card.getBoundingClientRect();
            const x     = e.clientX - rect.left;
            const y     = e.clientY - rect.top;
            const cx    = rect.width  / 2;
            const cy    = rect.height / 2;
            const rotX  = ((y - cy) / cy) * -intensity;
            const rotY  = ((x - cx) / cx) *  intensity;

            card.style.transform  = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
            card.style.boxShadow  = `${-rotY * 2}px ${rotX * 2}px 30px rgba(99,102,241,0.15)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

addTilt('.project-card', 8);
addTilt('.timeline-content', 5);
addTilt('.blog-card', 8);


// ── 5. MAGNETIC BUTTONS ──────────────────────────────────────────────────────
document.querySelectorAll('.btn, .contact-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect  = btn.getBoundingClientRect();
        const x     = e.clientX - rect.left - rect.width  / 2;
        const y     = e.clientY - rect.top  - rect.height / 2;
        const pull  = 0.3;
        btn.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform   = '';
        btn.style.transition  = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
        setTimeout(() => btn.style.transition = '', 500);
    });
});


// ── 6. PARTICLE CANVAS (Hero background) ─────────────────────────────────────
(function initParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const canvas  = document.createElement('canvas');
    canvas.className = 'hero-canvas';
    Object.assign(canvas.style, {
        position   : 'absolute',
        inset      : '0',
        width      : '100%',
        height     : '100%',
        pointerEvents: 'none',
        zIndex     : '0',
    });
    heroSection.style.position = 'relative';
    heroSection.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let W, H, particles;
    let mx = -9999, my = -9999;

    function resize() {
        W = canvas.width  = heroSection.offsetWidth;
        H = canvas.height = heroSection.offsetHeight;
    }

    function createParticles() {
        const count = Math.floor((W * H) / 12000);
        particles = Array.from({ length: count }, () => ({
            x  : Math.random() * W,
            y  : Math.random() * H,
            r  : Math.random() * 1.5 + 0.5,
            vx : (Math.random() - 0.5) * 0.3,
            vy : (Math.random() - 0.5) * 0.3,
            baseX: 0,
            baseY: 0,
        }));
        particles.forEach(p => { p.baseX = p.x; p.baseY = p.y; });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            // Gentle repulsion from cursor
            const dx  = mx - p.x;
            const dy  = my - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                p.x -= dx * force * 0.04;
                p.y -= dy * force * 0.04;
            }

            // Drift back to origin
            p.x += (p.baseX - p.x) * 0.02;
            p.y += (p.baseY - p.y) * 0.02;

            // Normal drift
            p.baseX += p.vx;
            p.baseY += p.vy;
            if (p.baseX < 0 || p.baseX > W) p.vx *= -1;
            if (p.baseY < 0 || p.baseY > H) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99,102,241,0.5)';
            ctx.fill();
        });

        // Draw connecting lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 100)})`;
                    ctx.lineWidth   = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    heroSection.addEventListener('mousemove', e => {
        const rect = heroSection.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
    });
    heroSection.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });

    window.addEventListener('resize', () => { resize(); createParticles(); });

    resize();
    createParticles();
    draw();
})();


// ── 7. RIPPLE EFFECT ON CLICK ────────────────────────────────────────────────
document.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    Object.assign(ripple.style, {
        left : e.clientX + 'px',
        top  : e.clientY + 'px',
    });
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
});


// ── 8. SKILL TAG WAVE ON HOVER ───────────────────────────────────────────────
document.querySelectorAll('.skill-tag').forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 30}ms`;
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-6px) scale(1.1)';
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
    });
});
