document.addEventListener('DOMContentLoaded', () => {
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toast');
    const copyIcon = document.getElementById('copyIcon');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = copyEmailBtn.getAttribute('data-email') || 'lorenapereiralpn@gmail.com';
            
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const tempInput = document.createElement('input');
                    tempInput.value = email;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }

                if (copyIcon) {
                    copyIcon.classList.remove('fa-regular', 'fa-copy');
                    copyIcon.classList.add('fa-solid', 'fa-check');
                    copyIcon.style.color = '#34d399';
                }

                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 2800);
                }

                setTimeout(() => {
                    if (copyIcon) {
                        copyIcon.classList.remove('fa-solid', 'fa-check');
                        copyIcon.classList.add('fa-regular', 'fa-copy');
                        copyIcon.style.color = '';
                    }
                }, 2500);

            } catch (err) {
                console.error('Falha ao copiar e-mail: ', err);
            }
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links .nav-link');

    const updateActiveNav = () => {
        let currentSectionId = '';
        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 120);

        if (isAtBottom) {
            currentSectionId = 'contato';
        } else {
            const scrollPosition = window.scrollY + (window.innerHeight * 0.35);

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });
        }

        navItems.forEach(item => {
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(link => link.classList.remove('active'));
            item.classList.add('active');
        });
    });
});
