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
  const iosInstructions = document.getElementById('iosInstructions');

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;

  if (isIOS && !isInStandaloneMode) {
    iosInstructions.classList.remove('hidden');
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    if (isIOS) return; // iOS no soporta beforeinstallprompt
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