
    (function () {
      const cards   = document.querySelectorAll('.persona-card');
      const dots    = document.querySelectorAll('.dot');
      const btnPrev = document.getElementById('btnPrev');
      const btnNext = document.getElementById('btnNext');
      const total   = cards.length;
      let current   = 1; // start on card index 1 (Developer)

      /**
       * Returns the CSS data-pos value based on relative
       * distance from the active card index.
       */
      function positionFor(cardIdx, activeIdx) {
        const diff = cardIdx - activeIdx;
        if (diff === 0)  return 'active';
        if (diff === -1) return 'prev';
        if (diff === 1)  return 'next';
        if (diff <= -2)  return 'prev2';
        return 'next2'; // diff >= 2
      }

      function render() {
        cards.forEach(function (card, i) {
          card.classList.remove('active');
          const pos = positionFor(i, current);
          card.setAttribute('data-pos', pos);
          if (pos === 'active') card.classList.add('active');
        });

        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === current);
        });
      }

      function shift(direction) {
        current = (current + direction + total) % total;
        render();
      }

      function goTo(index) {
        current = index;
        render();
      }

      // Button listeners
      btnPrev.addEventListener('click', function () { shift(-1); });
      btnNext.addEventListener('click', function () { shift(1); });

      // Dot listeners
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          goTo(parseInt(this.getAttribute('data-target'), 10));
        });
      });

      // Click on side cards to bring them forward
      cards.forEach(function (card, i) {
        card.addEventListener('click', function () {
          if (i !== current) goTo(i);
        });
      });

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft')  shift(-1);
        if (e.key === 'ArrowRight') shift(1);
      });

      // Touch / swipe support
      let touchStartX = 0;
      document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });
      document.addEventListener('touchend', function (e) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) shift(dx < 0 ? 1 : -1);
      }, { passive: true });

      // Initial render
      render();
    })();
  