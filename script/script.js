// Get all navigation links
const navLinks = document.querySelectorAll('nav li a');

// Initialize the navigation state
function initializeNavigation() {
    // Set Home as active by default
    const homeLink = document.getElementById('Home');
    homeLink.classList.add('active');
    
    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

// Handle navigation click events
function handleNavClick(event) {
    event.preventDefault(); // Prevent default link behavior
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    event.currentTarget.classList.add('active');
    
    // Add animation effect
    animateNavigation(event.currentTarget);
}

// Add smooth animation effect when switching between navigation items
function animateNavigation(activeLink) {
    activeLink.style.transition = 'all 0.3s ease';
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        pointer-events: none;
        width: 20px;
        height: 20px;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.5s linear;
    `;
    
    activeLink.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 500);
}

// Add hover effect for navigation items
function addHoverEffects() {
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(-2px)';
                link.style.transition = 'transform 0.2s ease';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(0)';
            }
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    nav li a {
        transition: transform 0.2s ease;
    }
    
    nav li a:hover {
        text-decoration: none;
    }
`;
document.head.appendChild(style);

// Update the clock in real-time when the time icon is active
function updateClock() {
    const timeLink = document.getElementById('time');
    if (timeLink.classList.contains('active')) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const timeTooltip = timeLink.querySelector('.time-tooltip') || document.createElement('div');
        
        if (!timeLink.querySelector('.time-tooltip')) {
            timeTooltip.className = 'time-tooltip';
            timeTooltip.style.cssText = `
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: #000;
                color: #fff;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                white-space: nowrap;
            `;
            timeLink.appendChild(timeTooltip);
        }
        
        timeTooltip.textContent = time;
    }
}

// Initialize clock update interval
setInterval(updateClock, 1000);

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    addHoverEffects();
});