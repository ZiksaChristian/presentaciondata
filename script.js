/* ==========================================================================
   IMPORTMED S.A. · Presentación de Ingeniería de Datos y Mantenimiento Predictivo
   Lógica JavaScript para Diapositivas, Navegación, Pantalla Completa y Lightbox
   Autores: Ángel D. Escobar Báez, Brayan B. Mairena Fonseca, Jimmy A. Palacios Báez
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. GESTOR DE DIAPOSITIVAS (SLIDES STACK)
     ========================================================================== */
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentIndex = 0;

  const btnPrev = document.getElementById('btnPrevSlide');
  const btnNext = document.getElementById('btnNextSlide');
  const counterBadge = document.getElementById('slideCounterBadge');
  const deckTopic = document.getElementById('deckTopic');
  const progressBar = document.getElementById('deckProgressBar');

  function updateSlide(newIndex) {
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= totalSlides) newIndex = totalSlides - 1;
    
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i === newIndex) {
        slide.classList.add('active');
      } else if (i < newIndex) {
        slide.classList.add('prev');
      }
    });

    currentIndex = newIndex;
    
    // Actualizar títulos e indicadores
    const currentSlide = slides[currentIndex];
    const topic = currentSlide.getAttribute('data-topic') || `Slide ${currentIndex + 1}`;
    if (deckTopic) deckTopic.textContent = topic;
    
    const paddedCurrent = String(currentIndex + 1).padStart(2, '0');
    const paddedTotal = String(totalSlides).padStart(2, '0');
    if (counterBadge) counterBadge.textContent = `Slide ${paddedCurrent} / ${paddedTotal}`;
    
    // Barra de progreso
    if (progressBar) {
      const progressPct = ((currentIndex + 1) / totalSlides) * 100;
      progressBar.style.width = progressPct + '%';
    }
    
    // Estados de botones
    if (btnPrev) btnPrev.disabled = currentIndex === 0;
    if (btnNext) btnNext.disabled = currentIndex === totalSlides - 1;

    // Desplazar al tope del slide activo
    currentSlide.scrollTop = 0;
  }

  if (btnPrev) btnPrev.addEventListener('click', () => updateSlide(currentIndex - 1));
  if (btnNext) btnNext.addEventListener('click', () => updateSlide(currentIndex + 1));

  /* ==========================================================================
     2. NAVEGACIÓN POR TECLADO
     ========================================================================== */
  window.addEventListener('keydown', (e) => {
    // Si el modal lightbox está abierto
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      updateSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      updateSlide(currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      updateSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      updateSlide(totalSlides - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  /* ==========================================================================
     3. PANTALLA COMPLETA
     ========================================================================== */
  const btnFullscreen = document.getElementById('btnFullscreen');

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

  /* ==========================================================================
     4. CONMUTADOR DE TEMA CLARO / OSCURO
     ========================================================================== */
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);

      if (nextTheme === 'dark') {
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Claro';
      } else {
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Oscuro';
      }
    });
  }

  /* ==========================================================================
     5. VISOR MODAL LIGHTBOX PARA AMPLIAR IMÁGENES
     ========================================================================== */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  window.openLightbox = function(src, title, desc) {
    if (!lightboxModal) return;
    if (lightboxImg) lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;
    lightboxModal.classList.add('active');
  };

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('active');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Inicializar en la primera diapositiva
  updateSlide(0);
});
