const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  //Variables de uso global:
  let timeout = 0;
  let fadeInterval = 0;

  console.log('Timeout Initialized!');
  //Selectores de uso global
  const $cajaCentral = d.getElementById('caja-central'),
    $cajaCara = d.querySelector('#caja-cara img:nth-child(2)'),
    $audioEffect1 = d.createElement('audio'),
    $audioToggleBtn = d.querySelector('#audio-toggle');
  $audioEffect1.src = 'toggleImg.mp3';
  d.body.appendChild($audioEffect1);

  /************************* ESPACIO ******************************/

  //Efecto fade in para audio (con ayuda de copilot quedó pero se puede "hackear")
  function fadeInOut(audio) {
    if (!$audioToggleBtn.classList.contains('fa-volume-high')) return;
    if (fadeInterval) {
      // Limpiar intervalo existente si hay uno
      clearInterval(fadeInterval);
    }

    // Determinar si el audio se está desvaneciendo o no
    const isFadingOut = audio.volume > 0.1;

    fadeInterval = setInterval(() => {
      console.log('Fade interval ID', fadeInterval);

      if (isFadingOut) {
        // Desvanecer el audio
        if (audio.volume > 0.1) {
          console.log(audio.volume);
          audio.volume -= 0.1;
        } else {
          clearInterval(fadeInterval);
          audio.pause();
          fadeInterval = null; // Restablecer el intervalo para el próximo fadeIn
        }
      } else {
        // Aumentar el volumen del audio
        audio.play();
        if (audio.volume < 0.9) {
          console.log(audio.volume);
          audio.volume += 0.1;
        } else {
          clearInterval(fadeInterval);
          fadeInterval = null; // Restablecer el intervalo para el próximo fadeOut
        }
      }
    }, 222);
  }

  //Evitar el long press en mobile
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (window.innerWidth > 630) {
      const guiterGif = d.getElementById('guitar-gif');
      guiterGif.style.display = 'block';
      const computedStyle = window.getComputedStyle($cajaCentral);

      // Obtener el ancho exacto de $cajaCentral en píxeles
      const $cajaCentralWidth = parseFloat(computedStyle.width);

      // Establecer el ancho de gifAnimado con el ancho de $cajaCentral
      guiterGif.style.width = $cajaCentralWidth + 'px';
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

  //Funcion de efecto en toggleImg
  const imgToggleEffect = () => {
    if ($audioToggleBtn.classList.contains('fa-volume-high')) {
      $audioEffect1.play();
    }
    if (window.innerWidth > 630) {
      $cajaCentral.style.transition = 'box-shadow 100ms ease-in-out';
      $cajaCentral.style.boxShadow = '0 0 50px 1px white';
      const timeout = setTimeout(() => {
        $cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0.368)';
      }, 200);
    } else {
      $cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      $cajaCara.style.boxShadow = '0 0 20px 3px white';
      const timeout = setTimeout(() => {
        $cajaCara.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0.156)';
      }, 200);
    }
  };

  //Manejo del boton change para prof-pic
  const $changeImg = d.querySelector('#img-toggle');
  d.addEventListener('click', (e) => {
    if (e.target.matches('#img-toggle')) {
      imgInterval('Create');
      imgToggle();
      imgToggleEffect();
    }
  });

  //Manejo del botón de sonido
  const profilePicSound = () => {
    const $sound = d.querySelector('#profile-audio'),
      $suggestiveArrow = d.querySelector('#suggestive-arrow');
    d.addEventListener('click', (e) => {
      if (e.target.matches('#audio-toggle')) {
        $suggestiveArrow.style.display = 'none';
        $audioToggleBtn.classList.toggle('fa-volume-high');
        $audioToggleBtn.classList.toggle('fa-volume-xmark');
      }
    });

    //Manejo del sonido al hacer hover y msje condicional
    let timerMsje = null;
    $sound.volume = 0;
    d.addEventListener('mouseover', (e) => {
      if (e.target.matches('img#profile-pic')) {
        console.log('Mouseover detectado');
        $sound.volume = 0;
        fadeInOut($sound);
        imgInterval('Create');
        timerMsje = setTimeout(() => {
          d.getElementById('msje-condicional').style.display = 'none';
        }, 1500);
      }
    });

    d.addEventListener('mouseout', (e) => {
      if (e.target.matches('img#profile-pic')) {
        $sound.volume = 0.5;
        fadeInOut($sound);
        clearTimeout(timerMsje);
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

  //Scroll to top del #a-ver
  d.addEventListener('click', (e) => {
    if (e.target.matches('#a-ver')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  });

  //Scroll to top general
  d.addEventListener('click', (e) => {
    if (e.target.matches('#scroll-to-top')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  });
});
