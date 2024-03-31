const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  //Variables de uso global:
  let fadeInterval = 0;
  let autoImginterval = 0;
  const pic1 = d.querySelector('#profile-pic').src;
  const pic1h = d.querySelector('#matrix').src;
  const pic2 = 'prof-pic.png';
  const pic2h = 'prof-pic-hover.png';

  //Selectores de uso global
  const $body = d.getElementsByTagName('body'),
    $header = d.getElementById('header'),
    $cajaCentral = d.getElementById('caja-central'),
    $cajaCara = d.querySelector('#caja-cara img:nth-child(2)'),
    $cajaPresentacion = d.querySelector('#caja-presentacion'),
    $audioEffect1 = d.createElement('audio'),
    $audioToggleBtn = d.querySelector('#audio-toggle'),
    $seccionAptitudes = d.querySelector('#seccion-aptitudes'),
    $seccionTecnologias = d.querySelector('#seccion-tecnologias'),
    $seccionCpe = d.querySelector('#seccion-cpe'),
    $footer = d.querySelector('footer'),
    $msjeCondicional = d.getElementById('msje-condicional'),
    $suggestiveFinger1 = d.getElementById('suggestive-finger1'),
    $profileAudio = d.querySelector('#profile-audio'),
    $thunderAudio = d.querySelector('#thunder'),
    $rainAudio = d.querySelector('#rain'),
    $suggestiveArrow = d.querySelector('#suggestive-arrow'),
    $cajaFondo = d.querySelector('#caja-fondo'),
    $imgProfPic = d.querySelector('#profile-pic'),
    $imgToggle = d.querySelector('#img-toggle'),
    $quoteModeGif = d.querySelector('#quote-mode');

  let contextIsOn = false;
  $audioEffect1.src = 'toggleImg.mp3';
  d.body.appendChild($audioEffect1);

  /************************* ESPACIO ******************************/

  //Funcion de cambio de fondo cuando hover en profile-pic
  function matrixBg(hover) {
    const video = d.getElementById('matrix-bg');
    if (hover) {
      $header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
      $cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
      $footer.style.backgroundColor = 'rgba(0,0,0,0)';
      $cajaFondo.style.opacity = 0;
      $imgProfPic.style.opacity = 0;
      video.style.opacity = 100;
    } else if (!contextIsOn) {
      video.style.opacity = 0;
      $header.style.backgroundColor = 'var(--color1)';
      $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0.368)';
      $seccionAptitudes.style.backgroundColor = 'var(--color2)';
      $seccionTecnologias.style.backgroundColor = 'var(--color1)';
      $seccionCpe.style.backgroundColor = 'var(--color2)';
      $footer.style.backgroundColor = 'var(--color1)';
      $cajaFondo.style.opacity = 100;
      $imgProfPic.style.opacity = 100;
      if (window.innerWidth > 630)
        $cajaFondo.style.backgroundColor = 'var(--color1)';
    }
  }

  //Funcion de cambio de fondo al hacer click derecho en prof-pic
  function matrix2Bg(clicked) {
    const video = d.getElementById('matrix2-bg');
    if (clicked) {
      $header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
      $cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
      $footer.style.backgroundColor = 'rgba(0,0,0,0)';
      $imgToggle.classList.add('fa-shake');
      video.style.opacity = 100;
    } else {
      video.style.opacity = 0;
      $header.style.backgroundColor = 'var(--color1)';
      $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0.368)';
      $seccionAptitudes.style.backgroundColor = 'var(--color2)';
      $seccionTecnologias.style.backgroundColor = 'var(--color1)';
      $seccionCpe.style.backgroundColor = 'var(--color2)';
      $footer.style.backgroundColor = 'var(--color1)';
      $imgToggle.classList.remove('fa-shake');
      if (window.innerWidth > 630)
        $cajaPresentacion.style.backgroundColor = 'var(--color1)';
    }
  }

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
      } else if (!contextIsOn) {
        // Aumentar el volumen del audio
        audio.play();
        if (audio.volume < 0.9) {
          console.log(audio.volume);
          audio.volume += 0.1;
        } else {
          clearInterval(fadeInterval);
          fadeInterval = null; // Restablecer el intervalo para el próximo fadeOut
        }
      } else {
        clearInterval(fadeInterval); //para no seguir ejecuntando el intervalo en contextIsOn
      }
    }, 222);
  }

  //Evitar el long press en mobile
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (event.target.matches('img#profile-pic')) {
      if (!contextIsOn) {
        if ($audioToggleBtn.classList.contains('fa-volume-high')) {
          $profileAudio.pause();
          $thunderAudio.play();
          $rainAudio.volume = 0.5;
          console.log($rainAudio.volume); //ver este tema
          $rainAudio.play();
        }
        //hacer aca cambio de foto
        $msjeCondicional.style.display = 'none';
        $quoteModeGif.style.display = 'block';
        setTimeout(() => {
          $quoteModeGif.style.display = 'none';
          $suggestiveFinger1.style.opacity = 100;
        }, 3700);
        matrix2Bg(true);
      }
      contextIsOn = true;
    }
    // if (window.innerWidth > 630) {
    //   const guiterGif = d.getElementById('guitar-gif');
    //   guiterGif.style.display = 'block';
    //   const computedStyle = window.getComputedStyle($cajaCentral);

    //   // Obtener el ancho exacto de $cajaCentral en píxeles
    //   const $cajaCentralWidth = parseFloat(computedStyle.width);

    //   // Establecer el ancho de gifAnimado con el ancho de $cajaCentral
    //   guiterGif.style.width = $cajaCentralWidth + 'px';
    //   clearTimeout(timeout);
    //   console.log('Timeout cleared');
    //   timeout = setTimeout(() => {
    //     console.log('Timeout Created!');
    //     guiterGif.style.display = 'none';
    //   }, 3000);
    // }
  });

  //Funcion de cambio de prof-pic
  const imgToggle = () => {
    const pp = d.querySelector('#profile-pic');
    const pph = d.querySelector('#matrix');
    if (pp.src.includes(pic1)) {
      pp.src = pic2;
      pph.src = pic2h;
    } else {
      pp.src = pic1;
      pph.src = pic1h;
    }
  };

  //Reemplazo de prof-pic por tiempo
  const imgInterval = (mode) => {
    clearInterval(autoImginterval);
    console.log('auto change img Interval cleared');
    autoImginterval = setInterval(() => {
      imgToggle();
      console.log('auto change img interval ID', autoImginterval);
    }, 33000);
    console.log('auto change img Interval CREATED!');
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

  //Manejo de eventos click
  d.addEventListener('click', (e) => {
    //Manejo del boton change para prof-pic
    if (e.target.matches('#img-toggle')) {
      imgInterval('Create');
      imgToggle();
      imgToggleEffect();
      $suggestiveFinger1.style.opacity = 0;
    }
  });

  //Manejo del botón de sonido
  const handleSound = () => {
    d.addEventListener('click', (e) => {
      if (e.target.matches('#audio-toggle')) {
        $suggestiveArrow.style.display =
          $suggestiveArrow.style.display === 'none' ? 'block' : 'none';
        $audioToggleBtn.classList.toggle('fa-volume-high');
        $audioToggleBtn.classList.toggle('fa-volume-xmark');
        if ($rainAudio.paused && contextIsOn) {
          $rainAudio.play();
          $thunderAudio.play();
        } else {
          $rainAudio.pause();
          $thunderAudio.pause();
        }
      }
    });

    //Manejo del sonido al hacer hover y msje condicional
    let timerMsje = null;
    $profileAudio.volume = 0;
    d.addEventListener('mouseover', (e) => {
      if (e.target.matches('img#profile-pic') && !contextIsOn) {
        console.log('Mouseover detectado');
        $profileAudio.volume = 0;
        fadeInOut($profileAudio);
        imgInterval('Create');
        matrixBg(true);
        timerMsje = setTimeout(() => {
          d.getElementById('msje-condicional').style.display = 'none';
        }, 1500);
      }
    });

    d.addEventListener('mouseout', (e) => {
      if (e.target.matches('img#profile-pic')) {
        $profileAudio.volume = 0.5;
        fadeInOut($profileAudio);
        matrixBg(false);
        clearTimeout(timerMsje);
      }
    });
  };

  handleSound();

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
