const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  //Selectores de uso global
  const $body = d.getElementsByTagName('body'),
    $header = d.getElementById('header'),
    $seccionPresentacion = d.getElementById('seccion-presentacion'),
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
    $changeButton = d.querySelector('#change-button'),
    $quoteModeGif = d.querySelector('#quote-mode'),
    $cajaFdoMobile = d.querySelector('#caja-fondo-mobile'),
    $qModeBkgIntro = d.querySelector('#quote-mode-bkg-intro'),
    $mobileQModeBkgIntro = d.querySelector('#mobile-quote-mode-bkg-intro'),
    $matrixProfPic = d.querySelector('#matrix'),
    pic1 = d.querySelector('#profile-pic').src,
    pic1h = d.querySelector('#matrix').src,
    pic2 = 'prof-pic.png',
    pic2h = 'prof-pic-hover.png',
    $quoteText = d.querySelector('#presentacion'),
    $typing = d.querySelector('#typing'),
    $musicToggle = d.querySelector('#music-toggle');

  //Variables de uso global:
  let fadeInterval = 0;
  let autoImginterval = 0;
  console.log('Auto Image interval INITIALIZED!!!');
  let quoteModeIsOn = false;
  let quoteModeFirstLoad = true;
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
    'Have you ever felt that there is a script written by something greater than us?',
    'In this game, the battle is for your soul. And the battle field is your mind',
    "Agent Smith could be anywhere. Don't let him in",
    'Respect the simulation',
    "I'm trying to free your mind. But I can only show you the door. You're the one that has to walk through it.",
    'The dream has become their reality. Who are you to say otherwise?',
    "What is the most resilient parasite? Bacteria? A virus? An intestinal worm? An idea. Resilient... highly contagious. Once an idea has taken hold of the brain it's almost impossible to eradicate. An idea that is fully formed - fully understood - that sticks; right in there somewhere.",
    'Never recreate from your memory. Always imagine new places!',
    ' You keep telling yourself what you know. But what do you believe? What do you feel?',
    'I’m Still Dreaming.',
    'Admit It: You Don’t Believe In One Reality Anymore.',
    'In The Dream State, Your Conscious Defenses Are Lowered And It Makes Your Thoughts Vulnerable To Theft.',
  ];
  const images = [
    'quote-mode-pic1.png',
    'quote-mode-pic2.png',
    'quote-mode-pic3.png',
  ];
  let imgPosition = 0;
  let quoteImg = images[imgPosition];
  let quotePosition = 0;
  let quote = quotes[quotePosition];
  let typed = null;

  //Establecer volumenes (en hmtl no los toma al menos en chrome)
  $typing.volume = 0.3;

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
    } else if (!quoteModeIsOn) {
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
      $changeButton.classList.add('fa-shake');
      video.style.opacity = 100;
    } else {
      video.style.opacity = 0;
      $header.style.backgroundColor = 'var(--color1)';
      $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0.368)';
      $seccionAptitudes.style.backgroundColor = 'var(--color2)';
      $seccionTecnologias.style.backgroundColor = 'var(--color1)';
      $seccionCpe.style.backgroundColor = 'var(--color2)';
      $footer.style.backgroundColor = 'var(--color1)';
      $changeButton.classList.remove('fa-shake');
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
      } else if (!quoteModeIsOn) {
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
        clearInterval(fadeInterval); //para no seguir ejecuntando el intervalo en quoteModeIsOn
      }
    }, 222);
  }

  //Red pill animation
  const animateRedPill = () => {
    const tl = gsap.timeline();
    tl.set('#red-pill', { display: 'block' });
    tl.from('#red-pill', { duration: 4, y: -150 });
    tl.from(
      '#red-pill',
      {
        duration: 5,
        opacity: 0,
        ease: 'CustomEase.create("custom", "M0,0 C0,0 0.084,1.829 0.13,1.88 0.158,1.911 0.273,0.295 0.3,0.318 0.324,0.338 0.347,1.956 0.371,1.982 0.399,2.012 0.468,0.529 0.5,0.55 0.524,0.566 0.528,2.068 0.553,2.09 0.589,2.121 0.66,0.783 0.7,0.798 0.73,0.809 0.727,2.199 0.759,2.217 0.808,2.244 0.852,1.022 0.9,1.062 0.927,1.085 1,2.281 1,2.281 ")',
      },
      '-=5'
    );
    tl.to('#red-pill', {
      duration: 1,
      opacity: 0,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'slow',
    });
    tl.set('#red-pill', { display: 'none' });
  };

  //Long press en mobile, click derecho en pc
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (event.target.matches('img#profile-pic')) {
      if (!quoteModeIsOn) {
        //Solo en primera carga del quote mode
        if (quoteModeFirstLoad) {
          $quoteSong = d.createElement('audio');
          $quoteSong.src = 'quote-mode-song.mp3';
          d.body.insertAdjacentElement('beforeend', $quoteSong);
        }
        //Fin de solo primera carga
        //Siempre que entra al quote mode
        //Manejo del sonido
        if ($audioToggleBtn.classList.contains('fa-volume-high')) {
          $profileAudio.pause();
          $rainAudio.volume = 0.2;
          $thunderAudio.volume = 0.3;
          $thunderAudio.play();
          $rainAudio.play();
        } //Fin manejo sonido
        $header.style.transition = 'none'; //FALTA: Al volver devolver estilo
        $musicToggle.style.display = 'block';
        animateRedPill();
        clearInterval(autoImginterval);
        console.log('auto img interval CLEARED!');
        $imgProfPic.style.opacity = 0;
        $msjeCondicional.style.display = 'none';
        $cajaCentral.style.opacity = 0;
        $quoteModeGif.style.display = 'block';
        $quoteText.textContent = quotes[0];
        $quoteText.style.textShadow =
          '2px 2px 2px #b00000, -2px -2px 2px #b00000';

        if (window.innerWidth > 630) {
          $qModeBkgIntro.style.display = 'block';
        } else {
          $mobileQModeBkgIntro.style.display = 'block';
        }
        setTimeout(() => {
          $changeButton.style.textShadow =
            '2px 2px 2px #ff0000, -2px -2px 2px #ff0000';
          $matrixProfPic.src = quoteImg;
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
      quoteModeIsOn = true;
    }
  });

  //Funciones asignadas al changeButton
  const handleChange = () => {
    if (!quoteModeIsOn) {
      if ($imgProfPic.src.includes(pic1)) {
        $imgProfPic.src = pic2;
        $matrixProfPic.src = pic2h;
      } else {
        $imgProfPic.src = pic1;
        $matrixProfPic.src = pic1h;
      }
    } else {
      //Iteracion imagenes
      if (imgPosition < images.length - 1) {
        quoteImg = images[imgPosition + 1];
        imgPosition += 1;
        console.log('position', imgPosition);
        console.log('img', quoteImg);
      } else {
        quoteImg = images[0];
        imgPosition = 0;
        console.log('position', imgPosition);
        console.log('img', quoteImg);
      }
      $matrixProfPic.src = quoteImg;
      //Iteracion quotes
      console.log('Quote number', quotePosition + 2);
      if (quotePosition < quotes.length - 1) {
        quote = quotes[quotePosition + 1];
        quotePosition += 1;
      } else {
        //   exitQuoteMode();
        // location.reload();
        quote = quotes[0];
        quotePosition = 0;
      }
      $quoteText.textContent = quote;
      //Typed.js
      if (typed) {
        typed.destroy();
      }
      let options = {
        showCursor: false,
        strings: [quote],
        typeSpeed: 50,
        loop: false,
        smartBackspace: false,
        backDelay: 50000, //ms
        preStringTyped: (arrayPos, self) => {
          if ($audioToggleBtn.classList.contains('fa-volume-high'))
            $typing.play();
        },
        onComplete: (self) => {
          $typing.pause();
          $typing.currentTime = 0;
        },
      };
      typed = new Typed('#presentacion', options);
    }
  };

  //Reemplazo de prof-pic por tiempo
  const imgInterval = (mode) => {
    clearInterval(autoImginterval);
    console.log('auto change img Interval cleared');
    autoImginterval = setInterval(() => {
      handleChange();
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
      quoteModeIsOn
        ? ($cajaCentral.style.boxShadow = '0 0 50px 1px red')
        : ($cajaCentral.style.boxShadow = '0 0 50px 1px white');
      const timeout = setTimeout(() => {
        $cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0.368)';
      }, 200);
    } else {
      $cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      quoteModeIsOn
        ? ($cajaCara.style.boxShadow = '0 0 50px 1px red')
        : ($cajaCara.style.boxShadow = '0 0 50px 1px white');
      const timeout = setTimeout(() => {
        $cajaCara.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      }, 200);
    }
  };

  //Manejo de eventos click
  d.addEventListener('click', (e) => {
    //Manejo del boton change para prof-pic
    if (e.target.matches('#change-button')) {
      if (!quoteModeIsOn) imgInterval('Create');
      handleChange();
      imgToggleEffect();
      $suggestiveFinger1.style.opacity = 0;
      $changeButton.style.textShadow = '';
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
    //Boton de musica
    if (e.target.matches('#music-toggle')) {
      if ($musicToggle.style.color == 'rgb(255, 255, 255)') {
        $quoteSong.play();
        $musicToggle.style.color = '#ff0000';
      } else {
        $quoteSong.pause();
        $musicToggle.style.color = '#fff';
      }
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
        if ($rainAudio.paused && quoteModeIsOn) {
          $rainAudio.volume = 0.2;
          $thunderAudio.volume = 0.3;
          $rainAudio.play();
          $thunderAudio.play();
        } else {
          $rainAudio.pause();
          $thunderAudio.pause();
          $typing.pause();
        }
      }
    });

    //Manejo del hover en profile-pic y msje condicional
    let timerMsje = null;
    $profileAudio.volume = 0;
    d.addEventListener('mouseover', (e) => {
      if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
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
