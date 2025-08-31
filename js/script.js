// Enhanced JavaScript for The Cadet Store

// Menu toggle functionality
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Header scroll effect
window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    // Add scrolled class to header when scrolling
    let header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    let scrollTop = document.querySelector('.scroll-top');
    if (window.scrollY > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }

    // Animate sections on scroll
    animateOnScroll();
};

// Image slider functionality
document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;

        // Add click animation
        images.style.transform = 'scale(0.95)';
        setTimeout(() => {
            images.style.transform = 'scale(1)';
        }, 150);
    };
});

// Swiper configuration for reviews
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 5000, // Default delay (will be overridden by breakpoints)
        disableOnInteraction: false,
        pauseOnMouseEnter: false, // Continue sliding even when mouse hovers
    },
    speed: 1000, // Smooth transition speed
    effect: 'slide', // Smooth slide effect
    breakpoints: {
        0: {
            slidesPerView: 1,
            autoplay: {
                delay: 6000, // Slow sliding on mobile - every 6 seconds
            }
        },
        768: {
            slidesPerView: 2,
            autoplay: {
                delay: 3000, // Faster sliding on desktop - every 3 seconds
            }
        }
    },
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-top')) {
        let scrollTopBtn = document.createElement('div');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);

        scrollTopBtn.onclick = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

    // Add loading animation
    let loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);

    // Remove loading after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 500);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate elements on page load
    animateOnLoad();
});

// Animate elements when they come into view
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollTop = window.pageYOffset;

    sections.forEach(section => {
        const offset = section.offsetTop - window.innerHeight + 100;

        if (scrollTop > offset) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initial animations on page load
function animateOnLoad() {
    // Animate sections with delay
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate header logo
    const logo = document.querySelector('.header .logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Add click ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        let ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = (e.offsetX - 10) + 'px';
        ripple.style.top = (e.offsetY - 10) + 'px';
        e.target.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple effect
let style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form submission functionality
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('section#book form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = form.querySelector('input[placeholder="Name"]').value.trim();
            const email = form.querySelector('input[placeholder="Email"]').value.trim();
            const number = form.querySelector('input[placeholder="Number"]').value.trim();
            const message = form.querySelector('textarea[placeholder="Message"]').value.trim();

            if (!name || !email || !number || !message) {
                alert('Please fill in all fields before sending the message.');
                return;
            }

            // Format the message
            const formattedMessage = `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nMessage: ${message}`;

            // Create email with form data
            const subject = `Contact Form Message from ${name}`;
            const body = `Hello,\n\nYou have received a new message from your website contact form:\n\n${formattedMessage}\n\nBest regards,\nThe Cadet Store Website`;

            // Encode for mailto link
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);

            // Create mailto link
            const mailtoLink = `mailto:thecadetstore1@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

            // Open email client
            window.location.href = mailtoLink;

            // Also copy to clipboard as backup
            copyToClipboard(formattedMessage);

            // Create a modal to display the message
            createMessageModal(name, email, number, message);
        });
    }
});

// Function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Use the Clipboard API when available
        navigator.clipboard.writeText(text).then(() => {
            console.log('Message copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback function for copying text
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Message copied to clipboard');
        } else {
            console.error('Failed to copy message');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

// Function to create a modal for displaying the message
function createMessageModal(name, email, number, message) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;

    // Modal content
    modalContent.innerHTML = `
        <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 24px;">📧 Message Sent to Email</h3>
        <p style="color: #7f8c8d; margin-bottom: 20px; line-height: 1.6;">
            ✅ Your email client has opened with your message! The message has also been copied to clipboard as backup.
        </p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: left; border-left: 4px solid #e74c3c;">
            <strong style="color: #2c3e50;">Your message details:</strong><br><br>
            <div style="font-family: monospace; background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; color: #2c3e50;">
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Number:</strong> ${number}<br>
                <strong>Message:</strong> ${message}
            </div>
        </div>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #27ae60;">
            <strong style="color: #27ae60;">📧 Next Steps:</strong><br>
            1. Your email client should have opened automatically<br>
            2. If not, check your email app or browser settings<br>
            3. Click "Send" in your email client to send the message<br>
            4. The message will be delivered to shreyasbs29@gmail.com
        </div>
        <button onclick="this.parentElement.parentElement.remove(); document.querySelector('section#book form').reset();"
                style="background: linear-gradient(135deg, #e74c3c 0%, #3498db 100%); color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 16px; font-weight: 600;">
            ✓ Got it! Close & Reset Form
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Auto-remove modal after 10 seconds
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
        }
    }, 10000);
}
