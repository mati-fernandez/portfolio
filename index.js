//Establecer todo el js en la carga del dom:
document.addEventListener('DOMContentLoaded', (e) => {
  //Evitar el long press en mobile
  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (event.target.matches('div#caja-central')) {
      alert('entró');
      const cajaCentral = document.getElementById('caja-central');
      const gifAnimado = document.createElement('img');
      gifAnimado.src = 'guitar.gif';
      gifAnimado.alt = 'GIF animado, guitarra se convierte en hacha';

      // Agregar el GIF animado a #caja-central
      cajaCentral.appendChild(gifAnimado);

      // Eliminar el GIF animado después de 3 segundos (3000 milisegundos)
      setTimeout(() => {
        cajaCentral.removeChild(gifAnimado); // Eliminar el GIF animado de #caja-central
      }, 3000); // Cambia este valor según la duración deseada del GIF animado
    }
  });
  //Creando interval global
  let interval = 0;
  //Funcion de cambio de prof-pic
  const imgToggle = () => {
    const pp = document.querySelector('#profile-pic');
    const pph = document.querySelector('#matrix');
    if (pp.src.includes('prof-pic.jpg')) {
      pp.src = 'prof-pic-v2.jpg';
      pph.src = 'prof-pic-hover-v2.jpg';
    } else {
      pp.src = 'prof-pic.jpg';
      pph.src = 'prof-pic-hover.jpg';
    }
  };
  //Reemplazo de prof-pic por tiempo
  const imgInterval = (mode) => {
    clearInterval(interval);
    console.log('Interval cleared');
    interval = setInterval(() => {
      imgToggle();
      console.log('interval ID', interval);
    }, 33000);
    console.log('Interval Created!');
  };
  imgInterval('Create');
  //Manejo del boton change para prof-pic
  const $changeImg = document.querySelector('#img-toggle');
  document.addEventListener('click', (e) => {
    if (e.target.matches('#img-toggle')) {
      imgInterval('Create');
      imgToggle();
    }
  });

  //Manejo del botón de sonido
  const profilePicSound = () => {
    let soundTempo;
    const $audioToggleBtn = document.querySelector('#audio-toggle'),
      $sound = document.querySelector('#profile-audio'),
      $suggestiveArrow = document.querySelector('.fa-arrow-up');
    document.addEventListener('click', (e) => {
      if (e.target.matches('#audio-toggle')) {
        $suggestiveArrow.style.display = 'none';
        $audioToggleBtn.classList.toggle('fa-volume-high');
        $audioToggleBtn.classList.toggle('fa-volume-xmark');
      }
    });
    //Manejo del sonido al hacer hover y msje condicional
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches('img#profile-pic')) {
        if ($audioToggleBtn.classList.contains('fa-volume-high')) {
          $sound.play();
        }
        imgInterval('Create');
        let timerMsje = setTimeout(() => {
          document.getElementById('msje-condicional').style.display = 'none';
        }, 1500);
        document.addEventListener('mouseout', (e) => {
          if (e.target.matches('img#profile-pic')) {
            $sound.pause();
            clearTimeout(timerMsje);
          }
        });
      }
    });
  };
  profilePicSound();

  //Manejo de los botones flecha animadas para deslizar pagina
  document.addEventListener('click', (e) => {
    if (e.target.matches('#first-page')) {
      document.querySelector('#seccion-aptitudes').scrollIntoView();
    }
    if (e.target.matches('#second-page')) {
      document.querySelector('.seccion-tecnologias').scrollIntoView();
    }
  });

  //
  document.addEventListener('click', (e) => {
    if (e.target.matches('#a-ver')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  });
});
