// =========================================
// 1. Ashutosh Style Preloader Hide Logic
// =========================================
function triggerPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide-preloader');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // ৮০০ মিলি-সেকেন্ডে স্মুথ ফেড-আউট
        }, 3500); // ৩.৫ সেকেন্ড পর প্রি-লোডার বন্ধ হবে যাতে সব অ্যানিমেশন শেষ হতে পারে
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', triggerPreloader);
} else {
    triggerPreloader();
}

// =========================================
// 2. Toggle Main Nav Menu
// =========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// =========================================
// 3. Projects Submenu Toggle Logic
// =========================================
const dropdowns = document.querySelectorAll('.has-dropdown');
dropdowns.forEach(dropdown => {
    const dropdownBtn = dropdown.querySelector('.dropdown-btn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }
});

// =========================================
// 4. 250 Slow Moving Fireflies Background Animation
// =========================================
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Firefly {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random();
            this.alphaSpeed = Math.random() * 0.008 + 0.003;
            this.color = Math.random() > 0.3 ? '38, 189, 248' : '251, 191, 36';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            this.alpha += this.alphaSpeed;
            if (this.alpha <= 0.1 || this.alpha >= 0.9) {
                this.alphaSpeed = -this.alphaSpeed;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = `rgba(${this.color}, 0.8)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    const fireflies = Array.from({ length: 250 }, () => new Firefly());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        fireflies.forEach((firefly) => {
            firefly.update();
            firefly.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}



// Fetch and Update Page View Count
async function updatePageViewCount() {
    const counterElement = document.getElementById('visitorCount');
    if (!counterElement) return;

    try {
        // CountAPI Service
        // Note: 'shizan-portfolio' এর জায়গায় আপনার অনন্য সাইট নাম দিতে পারেন
        const response = await fetch('https://api.countapi.xyz/hit/shizan-portfolio-site/visits');
        const data = await response.json();
        
        if (data && data.value) {
            counterElement.innerText = data.value.toLocaleString();
        } else {
            counterElement.innerText = "1";
        }
    } catch (error) {
        console.error("Counter Error:", error);
        counterElement.innerText = "N/A";
    }
}

// Run counter logic on page load
document.addEventListener('DOMContentLoaded', updatePageViewCount);