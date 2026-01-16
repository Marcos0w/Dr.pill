document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = `<i data-feather="sun"></i>`;
    const moonIcon = `<i data-feather="moon"></i>`;

    // Função para aplicar o tema
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = sunIcon;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = moonIcon;
        }
        // Recarrega os ícones do Feather
        feather.replace();
    };

    // Verifica o tema salvo no localStorage ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    // Verifica também a preferência do sistema operacional
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Prioriza o tema salvo, senão usa a preferência do sistema
    let currentTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);

    // Adiciona o evento de clique no botão
    themeToggle.addEventListener('click', () => {
        // Alterna o tema atual
        currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        // Salva a nova preferência no localStorage
        localStorage.setItem('theme', currentTheme);
        // Aplica o novo tema
        applyTheme(currentTheme);
    });

    // --- Funcionalidade do Menu Mobile ---
    const mobileBtn = document.getElementById('mobile-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Troca o ícone (opcional, mas visualmente agradável)
            const icon = navLinks.classList.contains('active') ? 'x' : 'menu';
            mobileBtn.innerHTML = `<i data-feather="${icon}"></i>`;
            feather.replace();
        });
    }

    // --- Efeitos de Animação no Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { threshold: 0.1 });

    // Seleciona seções e cards para animar
    document.querySelectorAll('section, .feature-card, .testimonial-card').forEach(el => {
        el.classList.add('reveal-hidden'); // Adiciona a classe inicial do CSS
        observer.observe(el);
    });

    // --- Botão Voltar ao Topo ---
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});