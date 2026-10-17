let currentPrice = 120;
let currentTierName = "Single Pass";

// Handle Ticket Selection
function selectTier(tier, price, tierName) {
  currentPrice = price;
  currentTierName = tierName;

  // Update Summary Display
  document.getElementById('summary-tier').textContent = tierName;
  document.getElementById('summary-amount').textContent = `${price} Ghana Cedis`;
  document.getElementById('btn-amount').textContent = price;

  // Reveal Checkout Section Smoothly
  const checkoutSection = document.getElementById('checkout-section');
  checkoutSection.classList.remove('hidden');
  checkoutSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle Form Submission & Payment Prompt Loading
function handlePayment(event) {
  event.preventDefault();

  const phone = document.getElementById('user-phone').value;
  const name = document.getElementById('user-name').value;
  const provider = document.querySelector('input[name="provider"]:checked').value;

  if (!phone || !name) return;

  // Update details in modal
  document.getElementById('selected-provider-text').textContent = provider;

  // Show persistent loading screen simulation
  document.getElementById('loading-overlay').classList.remove('hidden');
}

// Particle Background Animation Canvas
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 0.5;
    this.color = Math.random() > 0.5 ? '#ffd700' : '#8a2be2';
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// Initialize particles
for (let i = 0; i < 60; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();
