document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const telefone = document.getElementById('telefone');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    clearErrors();

    if (!telefone.value.trim()) {
      showError(telefone, 'Telefone é obrigatório');
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'E-mail é obrigatório');
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'E-mail inválido');
      isValid = false;
    }

    if (!mensagem.value.trim()) {
      showError(mensagem, 'Mensagem é obrigatória');
      isValid = false;
    }

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      const empresa = document.getElementById('empresa').value.trim();
      const contato = document.getElementById('contato').value.trim();
      const interesse = document.getElementById('interesse').value;

      const mailto = `mailto:atendimento@diaskanzler.com.br?subject=${encodeURIComponent(interesse || 'Contato via site')}&body=${encodeURIComponent(
        `Empresa: ${empresa}\nContato: ${contato}\nTelefone: ${telefone.value.trim()}\nE-mail: ${email.value.trim()}\nInteresse: ${interesse}\n\nMensagem:\n${mensagem.value.trim()}`
      )}`;

      window.location.href = mailto;

      setTimeout(() => {
        submitBtn.textContent = 'Mensagem Enviada!';
        submitBtn.style.background = '#28a745';
        form.reset();
        setTimeout(() => {
          submitBtn.textContent = 'Enviar Contato';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 500);
    }
  });

  function showError(input, message) {
    const group = input.closest('.form-group');
    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;
    error.style.cssText = 'color: #dc3545; font-size: 0.8rem; margin-top: 4px; display: block;';
    input.style.borderBottomColor = '#dc3545';
    group.appendChild(error);
  }

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => el.remove());
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(el => {
      el.style.borderBottomColor = '';
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
