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
  

  let deferredPrompt;
    const installBtn = document.getElementById('installButton');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtn.style.display = 'block';
    });

    installBtn.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuario aceptó instalar');
          } else {
            console.log('Usuario rechazó');
          }
          deferredPrompt = null;
        });
      }
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA fue instalada');
      installBtn.style.display = 'none';
    });