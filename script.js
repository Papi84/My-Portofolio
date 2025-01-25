// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const barFill = entry.target.querySelector('.bar-fill');
                    const width = barFill.style.width;
                    barFill.style.width = '0';
                    setTimeout(() => {
                        barFill.style.width = width;
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    };

    // Smooth scroll and section highlighting
    const handleScrollEffects = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight/3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    };

    // Dynamic theme switcher
    const themeSwitcher = () => {
        const themeButton = document.createElement('button');
        themeButton.id = 'theme-toggle';
        themeButton.innerHTML = '🌓';
        themeButton.style.position = 'fixed';
        themeButton.style.bottom = '20px';
        themeButton.style.right = '20px';
        document.body.appendChild(themeButton);

        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }
    };

    // Interactive 3D card effect
    const createCardEffects = () => {
        document.querySelectorAll('section').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
                card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        });
    };

    // Dynamic content loading
    const loadDynamicContent = () => {
        // Example: Could load blog posts/projects from API
        const skillsSection = document.getElementById('skills');
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Simulated API call
                setTimeout(() => {
                    skillsSection.insertAdjacentHTML('beforeend', `
                        <div class="new-content">
                            <h3>Recently Added Skills</h3>
                            <p>WebAssembly • Rust • Kubernetes</p>
                        </div>
                    `);
                }, 1000);
            }
        }, { threshold: 0.1 });

        observer.observe(skillsSection);
    };

    // Initialize all features
    const init = () => {
        animateSkillBars();
        handleScrollEffects();
        themeSwitcher();
        createCardEffects();
        loadDynamicContent();
        
        // Add smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    };

    init();
});

// Add these CSS additions to styles.css
/*
.dark-theme {
    --light: #232528;
    --dark: #F4F4F4;
    background: var(--light);
    color: var(--dark);
}

.dark-theme section {
    background: rgba(255,255,255,0.05);
}

.new-content {
    background: var(--primary);
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
    animation: slideIn 0.5s ease-out;
}

#theme-toggle {
    background: var(--accent);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;
}

#theme-toggle:hover {
    transform: scale(1.1) rotate(180deg);
}
*/
