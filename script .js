 (function() {
    const pages = document.querySelectorAll('.page');
    const progressBar = document.getElementById('progress-bar');
    const container = document.getElementById('zine-container');
    let expandedPage = null;
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight * 0.75) && rect.bottom >= (window.innerHeight * 0.25)
      );
    }
    function onScroll() {
      pages.forEach(page => {
        if(isInViewport(page)) {
          page.classList.add('visible');
        } else if (page !== expandedPage) {
          page.classList.remove('visible');
        }
      });
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }
    function toggleExpand(page) {
      if (expandedPage === page) {
        page.classList.remove('expanded');
        container.classList.remove('blurred');
        const btn = page.querySelector('.more-btn');
        btn.textContent = 'More';
        btn.setAttribute('aria-expanded', 'false');
        page.querySelector('.more-content').setAttribute('aria-hidden', 'true');
        expandedPage = null;
      } else {
        if (expandedPage) {
          expandedPage.classList.remove('expanded');
          const prevBtn = expandedPage.querySelector('.more-btn');
          prevBtn.textContent = 'More';
          prevBtn.setAttribute('aria-expanded', 'false');
          expandedPage.querySelector('.more-content').setAttribute('aria-hidden', 'true');
        }
        page.classList.add('expanded');
        container.classList.add('blurred');
        expandedPage = page;
        // Update button aria
        const btn = page.querySelector('.more-btn');
        btn.textContent = 'Less';
        btn.setAttribute('aria-expanded', 'true');
        page.querySelector('.more-content').setAttribute('aria-hidden', 'false');
        page.classList.add('visible');
      }
    }
    pages.forEach(page => {
      const btn = page.querySelector('.more-btn');
      const moreContent = page.querySelector('.more-content');
      btn.addEventListener('click', () => {
        toggleExpand(page);
      });
      btn.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleExpand(page);
        }
      });
      moreContent.setAttribute('aria-hidden', 'true');
    });
    onScroll();
    let ticking = false;
    window.addEventListener('scroll', function() {
      if(!ticking) {
        window.requestAnimationFrame(function() {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  })();
