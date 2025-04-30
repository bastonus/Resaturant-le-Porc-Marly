// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Navigation mobile
    initMobileNav();
    
    // Gestion des onglets de menu
    initMenuTabs();
    
    // Gestion des sections FAQ
    initFaqAccordion();
    
    // Animation au défilement
    initScrollAnimation();
    
    // Gestion des formulaires
    initForms();
    
    // Gestion de la navbar au défilement
    initScrollNavbar();
    
    // Gestion du filtrage de la galerie
    initGalleryFilters();
    
    // Animation des compteurs
    initNumberCounters();
});

/**
 * Initialisation de la navigation mobile
 */
function initMobileNav() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    // S'assurer que le menu soit fermé par défaut en mobile
    if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        
        // S'assurer que l'icône est correcte
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        
        // Changer l'icône du bouton
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fermer le menu quand on clique sur un lien
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Seulement si on est en version mobile (le menu est visible)
            if (window.getComputedStyle(menuBtn).display !== 'none') {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                
                // Réinitialiser l'icône
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        if (!menuBtn.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            
            // Réinitialiser l'icône
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            // Si on repasse en desktop et que le menu mobile est ouvert, on le ferme
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            
            // Réinitialiser l'icône
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/**
 * Initialisation des onglets dans la page menu
 */
function initMenuTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');
    
    if (tabBtns.length === 0 || menuContents.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Supprimer la classe active de tous les boutons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer l'ID du contenu à afficher
            const tabId = this.getAttribute('data-id');
            
            // Masquer tous les contenus
            menuContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Afficher le contenu correspondant
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}

/**
 * Initialisation des sections FAQ en accordéon
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');
        
        if (!question || !answer || !icon) return;
        
        // Initialiser les hauteurs
        answer.style.maxHeight = '0px';
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fermer tous les autres éléments
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon i');
                    
                    if (otherAnswer && otherIcon) {
                        otherAnswer.style.maxHeight = '0px';
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });
            
            // Basculer l'état actuel
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
}

/**
 * Animation des éléments au défilement
 */
function initScrollAnimation() {
    // Sélection des éléments à animer
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .specialty-card, .wine-bar-content, .info-card, .menu-item, .formule-card');
    
    if (animatedElements.length === 0) return;
    
    // Options pour l'observateur d'intersection
    const options = {
        root: null, // Viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% de l'élément doit être visible
    };
    
    // Fonction de callback quand un élément est visible
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Arrêter d'observer une fois animé
            }
        });
    };
    
    // Créer l'observateur
    const observer = new IntersectionObserver(handleIntersect, options);
    
    // Observer chaque élément
    animatedElements.forEach(element => {
        observer.observe(element);
        
        // Ajouter une classe pour le style initial
        element.classList.add('fade-in');
    });
}

/**
 * Gestion des formulaires
 */
function initForms() {
    // Formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Vérification simple des champs
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            });
            
            if (isValid) {
                // Simulation d'envoi de formulaire
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Envoi en cours...';
                
                // Simuler un délai d'envoi
                setTimeout(() => {
                    // Afficher un message de succès
                    const formContainer = this.closest('.contact-form-container');
                    
                    if (formContainer) {
                        formContainer.innerHTML = `
                            <div class="success-message">
                                <div class="success-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <h3>Message envoyé avec succès !</h3>
                                <p>Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.</p>
                            </div>
                        `;
                    }
                }, 1500);
            }
        });
    }
    
    // Formulaire de réservation
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        const dateInput = reservationForm.querySelector('#date');
        
        // Limiter les dates de réservation à partir d'aujourd'hui
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Vérification simple des champs
            const inputs = this.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            });
            
            if (isValid) {
                // Simulation d'envoi de formulaire
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Réservation en cours...';
                
                // Simuler un délai d'envoi
                setTimeout(() => {
                    // Afficher un message de succès
                    const formContainer = this.closest('.reservation-form-container');
                    
                    if (formContainer) {
                        formContainer.innerHTML = `
                            <div class="success-message">
                                <div class="success-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <h3>Réservation enregistrée !</h3>
                                <p>Votre demande de réservation a bien été prise en compte. Vous recevrez une confirmation par email dans les plus brefs délais.</p>
                            </div>
                        `;
                    }
                }, 1500);
            }
        });
    }
}

/**
 * Gestion de la navbar au défilement
 */
function initScrollNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Animation des chiffres pour la page à propos (si présente)
 */
function initNumberCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    if (counters.length === 0) return;
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const countUp = (element, target) => {
        const duration = 2000; // 2 secondes
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        const startValue = 0;
        
        const animate = () => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.round(startValue + (target - startValue) * progress);
            
            element.textContent = currentValue;
            
            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    };
    
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                countUp(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(handleIntersect, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Initialisation du filtrage de la galerie
 */
function initGalleryFilters() {
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilters.length === 0 || galleryItems.length === 0) return;
    
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Enlever la classe active de tous les filtres
            galleryFilters.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au filtre cliqué
            this.classList.add('active');
            
            // Récupérer la valeur du filtre
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrer les éléments de la galerie
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
} 