// --- Gerenciamento de Tema e Logos ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const topLogos = document.querySelectorAll('.top-logo');

const logoDarkModeSrc = 'Novo Projeto TextBranco.png';
const logoLightModeSrc = 'Novo ProjetoTextPreto.png';

function updateLogo(theme) {
    topLogos.forEach(logo => {
        logo.src = (theme === 'light-mode') ? logoLightModeSrc : logoDarkModeSrc;
    });
}

const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.remove('dark-mode', 'light-mode');
body.classList.add(savedTheme);
updateLogo(savedTheme);

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    const targetTheme = isDark ? 'light-mode' : 'dark-mode';
    
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateLogo(targetTheme);
});

// --- Menu Ativo ---
const menuLinks = document.querySelectorAll('.pill-menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.pill-menu a.active')?.classList.remove('active');
        this.classList.add('active');
    });
});

// --- Lógica do FAQ (Acordeão) ---
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// --- Lógica do Botão Voltar ao Topo ---
const btnVoltarTopo = document.getElementById('btnVoltarTopo');
if (btnVoltarTopo) {
    btnVoltarTopo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- Lógica das Janelas Modais (Agora adicionando e removendo classes) ---
const openModalBtns = document.querySelectorAll('.open-modal');
const closeBtns = document.querySelectorAll('.close-modal');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            // Em vez de display: block, adiciona a classe que dispara a animação
            modal.classList.add('show-modal');
        }
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove a classe para a animação de saída acontecer
        btn.closest('.modal').classList.remove('show-modal');
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show-modal');
    }
});


// --- LÓGICA DO NOVO CHECKOUT MODAL ---
const checkoutBtns = document.querySelectorAll('.btn-checkout');
const modalCheckout = document.getElementById('modalCheckout');
const checkoutPlanName = document.getElementById('checkoutPlanName');
const checkoutPlanPrice = document.getElementById('checkoutPlanPrice');
const hiddenPlanName = document.getElementById('hiddenPlanName');
const checkoutRedirect = document.getElementById('checkoutRedirect');

checkoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const plan = btn.getAttribute('data-plan');
        const price = btn.getAttribute('data-price');
        const checkoutLink = btn.getAttribute('data-link');
        
        checkoutPlanName.textContent = plan;
        checkoutPlanPrice.textContent = price;
        
        hiddenPlanName.value = plan; 
        checkoutRedirect.value = checkoutLink;
        
        // Abre a janela com transição suave
        modalCheckout.classList.add('show-modal');
    });
});


// --- Scroll Reveal ---
const reveals = document.querySelectorAll('.reveal-up');
const revealOnScroll = () => {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) el.classList.add('active');
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// --- LÓGICA DO MENU MOBILE (HAMBÚRGUER) ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show-mobile-menu');
    });
}

// Fechar o menu mobile ao clicar em um link
document.querySelectorAll('.pill-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show-mobile-menu')) {
            navMenu.classList.remove('show-mobile-menu');
        }
    });
});