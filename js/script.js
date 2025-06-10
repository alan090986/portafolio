if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('serviceWorker.js')
        .then(reg => console.log('Service Worker registrado', reg))
        .catch(err => console.log('Error al registrar Service Worker', err));
    });
  }
  
  function mostrarConfirmacion() {
    const confirmacion = document.getElementById('confirmacion');
    if (confirmacion) {
      confirmacion.classList.remove('hidden');
      setTimeout(() => {
        confirmacion.classList.add('hidden');
      }, 5000);
    }
    return true;
  }
  