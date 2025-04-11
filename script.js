// DOM Elements
const header = document.querySelector('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeSwitch = document.querySelector('.theme-switch');
const scrollTopBtn = document.querySelector('.scroll-top');
const skillBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const contactForm = document.getElementById('contactForm');

// Initialize the page
function init() {
    // Animate skill bars on page load
    animateSkillBars();
    
    // Set up circle progress
    setupCircleProgress();
    
    // Set active nav link based on scroll position
    updateActiveNavLink();
}

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Toggle dark/light theme
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Toggle moon/sun icon
    const icon = themeSwitch.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = themeSwitch.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Sticky header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
    
    // Update active nav link on scroll
    updateActiveNavLink();
});

// Scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const parent = bar.parentElement.parentElement;
        const percent = parent.getAttribute('data-percent');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, 500);
    });
}

// Set up circle progress
function setupCircleProgress() {
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach(circle => {
        const percentText = circle.querySelector('.inside-circle').textContent;
        const percent = parseInt(percentText);
        const fill = circle.querySelector('.fill');
        const mask = circle.querySelector('.mask.full');
        
        const degrees = (percent / 100) * 360;
        
        if (degrees <= 180) {
            mask.style.transform = rotate(${degrees}deg);
            fill.style.transform = rotate(${degrees}deg);
        } else {
            mask.style.transform = 'rotate(180deg)';
            fill.style.transform = rotate(${degrees}deg);
        }
    });
}

// Filter projects
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === #${sectionId}) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just log it and show a success message
        console.log({ name, email, subject, message });
        
        // Show success message
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.style.display = 'none');
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.style.display = 'none';
        
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting me, ${name}. I'll get back to you soon.</p>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Reset form after 5 seconds
        setTimeout(() => {
            formGroups.forEach(group => group.style.display = 'block');
            submitBtn.style.display = 'block';
            successMessage.remove();
            contactForm.reset();
        }, 5000);
    });
}

// Initialize on page load
window.addEventListener('load', init);