const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 90;
const maxDistance = 140;
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      vx: random(-0.3, 0.3),
      vy: random(-0.3, 0.3),
      size: random(1.5, 3)
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(79,191,255,0.9)";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(99,102,241,${1 - dist / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    if (mouse.x !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 160) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(46,197,255,${1 - dist / 160})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawParticles();

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const themeToggle = document.getElementById("themeToggle");

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      if (mobileMenu) {
        mobileMenu.classList.remove("show");
      }
    }
  });
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("show");
  });

  mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
}

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });
}

// ===== Project Sliders =====

function createSlider(id) {
    const slider = document.getElementById(id);
    if (!slider) return;

    const slides = slider.querySelectorAll(".slide");
    let current = 0;

    function show(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    setInterval(() => {
        current = (current + 1) % slides.length;
        show(current);
    }, 3000);
}

createSlider("slider1");
createSlider("slider2");
