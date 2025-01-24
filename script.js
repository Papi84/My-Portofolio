document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-links a');
    const header = document.querySelector('header');

    // Fade in the header
    function fadeInHeader() {
        let opacity = 0;
        function animate() {
            if (opacity < 1) {
                opacity += 0.05;
                header.style.opacity = opacity;
                requestAnimationFrame(animate);
            }
        }
        animate();
    }

    // Apply bounce animation on hover for social icons
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.3s ease';
        });
    });

    // Scroll-based animation for sections
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const sections = document.querySelectorAll('main section');

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight * 0.75 && !section.classList.contains('animate')) {
                section.classList.add('animate');
            }
        });
    });

    // Initially fade in the header
    fadeInHeader();
});