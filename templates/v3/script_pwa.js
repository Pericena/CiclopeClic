if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Registro de SW exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw', err))
  }
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('sw.js')
  //     .then(reg => {
  //       console.log('Service Worker registrado exitosamente:', reg);
  //     })
  //     .catch(err => {
  //       console.error('Error al registrar el Service Worker:', err);
  //     });
  // }