const d = document;
//Establecer todo el js en la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  //Inicializando timeout global
  let timeout = 0;
  console.log('Timeout Initialized!');
  //Evitar el long press en mobile
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (window.innerWidth > 630) {
      const guiterGif = d.getElementById('guitar-gif');
      guiterGif.style.display = 'block';
      const cajaCentral = d.getElementById('caja-central');
      const computedStyle = window.getComputedStyle(cajaCentral);
      // Obtener el ancho exacto de cajaCentral en píxeles
      const cajaCentralWidth = parseFloat(computedStyle.width);
      // Establecer el ancho de gifAnimado con el ancho de cajaCentral
      guiterGif.style.width = cajaCentralWidth + 'px';
      clearTimeout(timeout);
      console.log('Timeout cleared');
      timeout = setTimeout(() => {
        console.log('Timeout Created!');
        guiterGif.style.display = 'none';
      }, 3000);
    }
  });
  //Inicializando interval global
  let interval = 0;
  //Funcion de cambio de prof-pic
  const imgToggle = () => {
    const pp = d.querySelector('#profile-pic');
    const pph = d.querySelector('#matrix');
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
  const $changeImg = d.querySelector('#img-toggle');
  d.addEventListener('click', (e) => {
    if (e.target.matches('#img-toggle')) {
      imgInterval('Create');
      imgToggle();
    }
  });

  //Manejo del botón de sonido
  const profilePicSound = () => {
    let soundTempo;
    const $audioToggleBtn = d.querySelector('#audio-toggle'),
      $sound = d.querySelector('#profile-audio'),
      $suggestiveArrow = d.querySelector('.fa-arrow-up');
    d.addEventListener('click', (e) => {
      if (e.target.matches('#audio-toggle')) {
        $suggestiveArrow.style.display = 'none';
        $audioToggleBtn.classList.toggle('fa-volume-high');
        $audioToggleBtn.classList.toggle('fa-volume-xmark');
      }
    });
    //Manejo del sonido al hacer hover y msje condicional
    d.addEventListener('mouseover', (e) => {
      if (e.target.matches('img#profile-pic')) {
        if ($audioToggleBtn.classList.contains('fa-volume-high')) {
          $sound.play();
        }
        imgInterval('Create');
        let timerMsje = setTimeout(() => {
          d.getElementById('msje-condicional').style.display = 'none';
        }, 1500);
        d.addEventListener('mouseout', (e) => {
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
  d.addEventListener('click', (e) => {
    if (e.target.matches('#first-page')) {
      d.querySelector('#seccion-aptitudes').scrollIntoView();
    }
    if (e.target.matches('#second-page')) {
      d.querySelector('#seccion-tecnologias').scrollIntoView();
    }
  });

  //
  d.addEventListener('click', (e) => {
    if (e.target.matches('#a-ver')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  });
});
