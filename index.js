const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  //Selectores de uso global
  const $body = d.getElementsByTagName('body'),
    $header = d.getElementById('header'),
    $cajaCentral = d.getElementById('caja-central'),
    $cajaCara = d.querySelector('#caja-cara'),
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
    $suggestiveArrow = d.querySelector('#suggestive-arrow-wrapper'),
    $cajaFondo = d.querySelector('#caja-fondo'),
    $imgProfPic = d.querySelector('#profile-pic'),
    $imgToggle = d.querySelector('#img-toggle'),
    $quoteModeGif = d.querySelector('#quote-mode'),
    $cajaFdoMobile = d.querySelector('#caja-fondo-mobile'),
    $qModeBkgIntro = d.querySelector('#quote-mode-bkg-intro'),
    $mobileQModeBkgIntro = d.querySelector('#mobile-quote-mode-bkg-intro'),
    $matrixProfPic = d.querySelector('#matrix'),
    pic1 = d.querySelector('#profile-pic').src,
    pic1h = d.querySelector('#matrix').src,
    pic2 = 'prof-pic.png',
    pic2h = 'prof-pic-hover.png',
    $quoteText = d.querySelector('#presentacion');

  //Variables de uso global:
  let fadeInterval = 0;
  let autoImginterval = 0;
  console.log('Auto Image interval INITIALIZED!!!');
  let contextIsOn = false;
  $audioEffect1.src = 'toggleImg.mp3';
  d.body.appendChild($audioEffect1);
  const quotes = [
    'This is your last chance. After this, there is no turning back. You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill - you stay in Wonderland and I show you how deep the rabbit hole goes.',
    'You have to let it all go. Fear, doubt, and disbelief. Free your mind.',
    'Have you ever had a dream, That you were so sure was real? What if you were unable to wake from that dream? How would you know the difference between the dream world and the real world?',
    "If You Can Steal An Idea, Why Can't You Plant One There Instead?",
    'Once An Idea Has Taken Hold Of The Brain, It’s Almost Impossible To Eradicate.',
    'Downward Is The Only Way Forward.',
    "Dreams Feel Real While We're In Them. It's Only When We Wake Up That We Realize Something Was Actually Strange.",
    ' Many Dreams Within Dreams Is Too Unstable.',
  ];
  const quoteImg = [
    'quote-quote-mode-pic1.png',
    'quote-quote-mode-pic2.png',
    'quote-quote-mode-pic3.png',
  ];

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
      $cajaFdoMobile.style.opacity = 0;
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
      $cajaFdoMobile.style.opacity = 100;
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

  //Long press en mobile, click derecho en pc
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (event.target.matches('img#profile-pic')) {
      if (!contextIsOn) {
        //manejo del sonido
        if ($audioToggleBtn.classList.contains('fa-volume-high')) {
          $profileAudio.pause();
          $thunderAudio.play();
          $rainAudio.volume = 0.5;
          console.log($rainAudio.volume); //ver este tema
          $rainAudio.play();
        }
        clearInterval(autoImginterval);
        console.log('auto img interval CLEARED!');
        $imgProfPic.style.opacity = 0;
        $msjeCondicional.style.display = 'none';
        $cajaCentral.style.opacity = 0;
        $quoteModeGif.style.display = 'block';
        $quoteText.textContent = quotes[0];
        if (window.innerWidth > 630) {
          $qModeBkgIntro.style.display = 'block';
        } else {
          $mobileQModeBkgIntro.style.display = 'block';
        }
        setTimeout(() => {
          $matrixProfPic.src = 'quote-mode-pic1.png';
          $cajaCentral.style.opacity = 100;
          $quoteModeGif.style.display = 'none';
          if (window.innerWidth > 630) {
            $qModeBkgIntro.style.display = 'none';
          } else {
            $mobileQModeBkgIntro.style.display = 'none';
          }
          $suggestiveFinger1.style.opacity = 100;
        }, 3700);
        matrix2Bg(true);
      }
      contextIsOn = true;
    }
  });

  //Funcion de cambio de prof-pic
  const imgToggle = () => {
    if (!contextIsOn) {
      if ($imgProfPic.src.includes(pic1)) {
        $imgProfPic.src = pic2;
        $matrixProfPic.src = pic2h;
      } else {
        $imgProfPic.src = pic1;
        $matrixProfPic.src = pic1h;
      }
    } else {
      //Aca recorrer array con +1 de las img y las quotes (mejor para ver si el texto entra en conflicto con la img, se pueden tocar)
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
  //Llamar a la func de cambio de pic auto al entrar por primera vez a la web
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
        $cajaCara.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      }, 200);
    }
  };

  //Manejo de eventos click
  d.addEventListener('click', (e) => {
    //Manejo del boton change para prof-pic
    if (e.target.matches('#img-toggle')) {
      if (!contextIsOn) imgInterval('Create');
      imgToggle();
      imgToggleEffect();
      $suggestiveFinger1.style.opacity = 0;
    }
    //Manejo de los botones flecha animadas para deslizar pagina
    if (e.target.matches('#first-page')) {
      d.querySelector('#seccion-aptitudes').scrollIntoView();
    }
    if (e.target.matches('#second-page')) {
      d.querySelector('#seccion-tecnologias').scrollIntoView();
    }
    //Scroll to top del #a-ver
    if (e.target.matches('#a-ver')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
    //Scroll to top general
    if (e.target.matches('#scroll-to-top')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
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

    //Manejo del hover en profile-pic y msje condicional
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
});
