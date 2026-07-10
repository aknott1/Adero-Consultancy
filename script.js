// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Booking form -> mailto handoff
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const org = data.get('org') || '';
      const type = data.get('type') || '';
      const dates = data.get('dates') || '';
      const message = data.get('message') || '';

      const subject = encodeURIComponent(`Booking inquiry: ${type} — ${org}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nSchool / Organization: ${org}\nRequest type: ${type}\nPreferred dates: ${dates}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:hello@aderoconsultancy.com?subject=${subject}&body=${body}`;

      const confirmation = document.getElementById('form-confirmation');
      if (confirmation) {
        confirmation.hidden = false;
        confirmation.setAttribute('tabindex', '-1');
        confirmation.focus();
      }
    });
  }
});
