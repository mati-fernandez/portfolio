// import * as s from './selectors.js';
const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  const $header = d.querySelector('header'),
    $cajaCentral = d.querySelector('#caja-central'),
    $cajaCara = d.querySelector('#caja-cara'),
    $cajaPresentacion = d.querySelector('#caja-presentacion'),
    $audioEffect1 = d.querySelector('#toggle-btn-sound'),
    $audioToggleBtn = d.querySelector('#audio-toggle'),
    $seccionAptitudes = d.querySelector('#seccion-aptitudes'),
    $seccionTecnologias = d.querySelector('#seccion-tecnologias'),
    $seccionCpe = d.querySelector('#seccion-cpe'),
    $footer = d.querySelector('footer'),
    $suggestiveFinger1 = d.querySelector('#suggestive-finger1'),
    $profileAudio = d.querySelector('#profile-audio'),
    $thunderAudio = d.querySelector('#thunder'),
    $rainAudio = d.querySelector('#rain'),
    $suggestiveFinger3 = d.querySelector('#suggestive-finger3-wrapper'),
    $cajaFondo = d.querySelector('#caja-fondo'),
    $imgProfPic = d.querySelector('#profile-pic'),
    $changeButton = d.querySelector('#change-button'),
    $quoteModeGif = d.querySelector('#quote-mode'),
    $cajaFdoMobile = d.querySelector('#caja-fondo-mobile'),
    $qModeBkgIntro = d.querySelector('#quote-mode-bkg-intro'),
    $mobileQModeBkgIntro = d.querySelector('#mobile-quote-mode-bkg-intro'),
    $quoteText = d.querySelector('#presentacion'),
    $typing = d.querySelector('#typing'),
    $musicToggle = d.querySelector('#music-toggle'),
    $languageToggle = d.querySelector('#language-toggle'),
    $understood = d.querySelector('#understood'),
    $exitQuoteModeBtn = d.querySelector('#exit-quote-mode-wrapper'),
    $matrixBg = d.getElementById('matrix-bg'),
    $matrix2Bg = d.querySelector('#matrix2-bg'),
    $phoneRing = d.querySelector('#phone-ring'),
    $pills = d.querySelectorAll('.pill'),
    $nextSong = d.querySelector('#next-song'),
    $whiteRabbit = d.querySelector('#white-rabbit'),
    $disclaimer = d.querySelector('#disclaimer'),
    $musicGif = d.querySelector('#music-gif'),
    $musicBtnAppearance = d.querySelector('#music-btn-appearance-audio'),
    $firstSoundOn = d.querySelector('#first-sound-on'),
    $get = d.querySelector('#get'),
    $ready = d.querySelector('#ready'),
    $for = d.querySelector('#for'),
    $the = d.querySelector('#the'),
    $great = d.querySelector('#great'),
    $awakening = d.querySelector('#awakening'),
    $goToTop = d.querySelector('#go-to-top'),
    $firstPage = d.querySelector('#first-page'),
    $name = d.querySelector('header>h3'),
    $exitQmVid = d.querySelector('#exit-qm-vid');

  //Establecer volumenes (en hmtl no los toma al menos en chrome)
  $profileAudio.volume = 0;
  $typing.volume = 0.3;
  $phoneRing.volume = 0.4;
  $musicBtnAppearance.volume = 0.4;

  //Variables y constantes de uso global:
  let language = localStorage.getItem('language') ?? 'en';
  let understoodClicked = false;
  let lastClickTime = 0;
  let bunnyHandlerUniqueCall = false;
  let count = 6;
  let clicksTimeOut = false;
  const textoHeader = $header.querySelector('h3').textContent;
  const textoPresentacion = $cajaPresentacion.querySelector('p').textContent;
  let fadeInterval = 0;
  let quoteModeIsOn = false;
  let quoteModeFirstLoad = true;
  let imgPosition = 0;
  let quotePosition = 0;
  let typed = null;
  const images = [
    'quote-mode-pic1.png',
    'quote-mode-pic2.png',
    'quote-mode-pic3.png',
  ];
  let quoteImg = images[imgPosition];
  let quoteSong = null;
  let $pillsSound = null;
  let $pillsMerge = null;
  let electricitySound = null;
  let soundIsOn = false;
  const songsArray = [
    'simulando-realidad.mp3',
    'mat-y-las-cuerdas-codificadas-1.mp3',
    'mat-rockea-el-cyber-espacio.mp3',
    'nueva-realidad.mp3',
    'desarrollando-webs.mp3',
    'mat-y-las-cuerdas-codificadas-2.mp3',
    'charla-con-la-muerte.mp3',
    'mi-dulce-matias.mp3',
    'en-la-oscuridad.mp3',
    'toldo-etereo-4.mp3',
    'nueva-realidad-2.mp3',
    'deep-resonance.mp3',
    'simula-el-fuego.mp3',
    'frecuencia-perdida.mp3',
    'toldo-etereo-2.mp3',
    'gotas-de-esperanza.mp3',
    'synthetic-heartstrings.mp3',
    'olvidos-del-corazon.mp3',
    'fading-echoes-acoustic.mp3',
    'fading-echoes.mp3',
  ];
  let songPosition = 0;
  let firstSoundOn = true;

  /************************* FUNCIONES ******************************/

  // Realiza una solicitud para wake up al backend al cargar la página
  const wakeUpURL = 'https://vigenere-api.onrender.com/wake-up';
  const wakeUpLocalURL = 'http://localhost:3000/wake-up';
  // CAMBIAR URL SEGUN A QUE BACKEND NECESITO APUNTAR
  fetch(wakeUpURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Wake up response:', data);
    })
    .catch((error) => {
      console.error('Error waking up backend:', error);
    });

  //Establecer lenguaje
  function updateTextLanguage() {
    console.log('Idioma:', language === 'es' ? 'Español' : 'Inglés');
    if (language === 'en') {
      $cajaPresentacion.querySelector('p').textContent = 'Loading...';
      $disclaimer.textContent =
        'This content is purely fictional and for entertainment purposes only. We do not assume responsibility for the accuracy or reliability of any information presented herein.';
      if (!understoodClicked) $understood.textContent = 'Understood!';
    } else {
      $cajaPresentacion.querySelector('p').textContent = 'Cargando...';
      $disclaimer.textContent =
        'Este contenido es puramente ficticio y tiene únicamente fines de entretenimiento. No asumimos responsabilidad por la exactitud o confiabilidad de la información presentada aquí.';
      if (!understoodClicked) $understood.textContent = '¡Entendido!';
    }
  }

  // Función para reiniciar el GIF
  function resetGif(gifImg) {
    // Guarda el valor del atributo src actual
    const srcActual = gifImg.src;

    // Asigna un valor temporal al atributo src
    gifImg.src = '';

    // Vuelve a asignar el valor original del atributo src después de un pequeño retraso
    setTimeout(function () {
      gifImg.src = srcActual;
    }, 10);
  }

  function nextSong() {
    if (songPosition < songsArray.length - 1) {
      quoteSong.src = songsArray[songPosition + 1];
      songPosition += 1;
    } else {
      quoteSong.src = songsArray[0];
      songPosition = 0;
    }
    quoteSong.play();
    $musicToggle.style.color = 'red';
  }

  const alternateNames = [
    'ꟻERNAИD3Z MA7IA5',
    'FERNΛNÐEɀ MΛTIΔ$',
    'ƑƎʁNANƊ3Ȥ MAT1AS',
    'F3ɌNΛNDEZ MA7IΛ5',
    'FERNAȠDEƩ MATIA5',
  ];
  const alternateColors = ['#ffeeee', '#ffdddd', '#ffcccc', '#ffbbbb'];

  let changeInterval;
  let nameInterval;
  let nameCounter = 0;
  console.log('nameInterval:', nameInterval);
  console.log('changeInterval:', changeInterval);

  function changingHeaderLetters() {
    if (nameInterval !== undefined) clearInterval(nameInterval);
    if (changeInterval !== undefined) clearInterval(changeInterval);
    if (quoteModeIsOn) {
      nameInterval = setInterval(() => {
        $name.textContent = alternateNames[nameCounter % alternateNames.length];
        nameCounter++;
      }, 200);
    } else {
      changeInterval = setInterval(() => {
        if (soundIsOn) electricitySound.play();
        nameInterval = setInterval(() => {
          $name.textContent =
            alternateNames[nameCounter % alternateNames.length];
          nameCounter++;
        }, 50);
        setTimeout(() => {
          clearInterval(nameInterval);
          $name.textContent = 'FERNANDEZ MATIAS';
        }, 2000);
      }, 9000);
    }
    console.log('cHL invoked. nameInterval:', nameInterval);
    console.log('cHL invoked. changeInterval:', changeInterval);
  }

  function startQuoteMode() {
    //Si no estabas en quote mode
    if (!quoteModeIsOn) {
      quoteModeIsOn = true;
      //Solo en primera carga del quote mode
      if (quoteModeFirstLoad) {
        loadVids();
        loadSounds();
        quoteModeFirstLoad = false;
      }
      //Fin de solo primera carga

      //////Siempre que entra al quote mode///////

      //Manejo del sonido
      if (soundIsOn) {
        $profileAudio.pause();
        $rainAudio.volume = 0.2;
        $thunderAudio.volume = 0.3;
        $thunderAudio.play();
        $rainAudio.play();
      }
      //Fin manejo sonido

      $imgProfPic.style.cursor = 'auto';
      $firstPage.style.opacity = 0;
      $disclaimer.style.display = 'inline-block';
      $changeButton.style.pointerEvents = 'none';
      matrix2Bg(true);
      $header.style.transition = 'none';
      $imgProfPic.style.opacity = 0;
      $cajaCentral.style.opacity = 0;
      $quoteModeGif.style.display = 'block';

      //Media query para el fondo de transicion
      if (window.innerWidth > 630) {
        $qModeBkgIntro.style.display = 'block';
      } else {
        $mobileQModeBkgIntro.style.display = 'block';
      }

      setTimeout(() => {
        $name.style.color = '#000';
        $name.style.animation = 'qmColor 11s ease-in-out infinite';
        changingHeaderLetters();
        updateTextLanguage();
        getNextPhrase(0);
        if (quoteModeIsOn) $firstPage.style.display = 'none';
        $quoteText.style.textShadow =
          '2px 2px 5px #e9370f, -2px -2px 5px #e90f0f';
        $understood.style.fontFamily = "'Bitstream Vera Sans Mono', monospace";
        $musicToggle.style.color = '#fff';
        $cajaPresentacion.style.textAlign = 'left';
        $cajaPresentacion.style.textWrap = 'wrap';
        $matrixProfPic.src = quoteImg;
        $cajaCentral.style.opacity = 100;
        $quoteModeGif.style.display = 'none';
        resetGif($quoteModeGif);
        if (window.innerWidth > 630) {
          $qModeBkgIntro.style.display = 'none';
        } else {
          $mobileQModeBkgIntro.style.display = 'none';
        }
        //Music BTN Appearence
        setTimeout(() => {
          if (soundIsOn) $musicBtnAppearance.play();
        }, 500);
        setTimeout(() => {
          if (quoteModeIsOn) $musicGif.style.display = 'block';
          setTimeout(() => {
            if (quoteModeIsOn) $musicToggle.style.display = 'block';
            $musicGif.style.display = 'none';
            resetGif($musicGif);
          }, 2400);
        }, 2000);
      }, 3700);
    }
  }

  //Intersection observer API
  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('El footer está en el viewport');
        if (quoteModeFirstLoad) $whiteRabbit.style.display = 'block';
      } else {
        console.log('El footer no está en el viewport');
      }
    });
  }
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  //Manejo de la visibilidad del conejo
  function bunnyHandler() {
    $imgProfPic.style.cursor = 'auto';
    $cajaPresentacion.querySelector('p').textContent = 'F T W R';
    bunnyHandlerUniqueCall = true;
    console.log('bunnyHandler llamada');
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    //Observar aparición del footer (para white rabbit)
    observer.observe($footer);
  }

  //Cargar canciones y sonidos
  const loadSounds = () => {
    //Canciones del quote mode (a partir de la uno se cargan al tocar next song)
    quoteSong = d.createElement('audio');
    quoteSong.src = songsArray[0];
    d.body.insertAdjacentElement('beforeend', quoteSong);

    //Sonido de ingreso de pills
    $pillsSound = d.createElement('audio');
    $pillsSound.src = 'pills-intro.mp3';
    d.body.insertAdjacentElement('beforeend', $pillsSound);
    //Sonido de fusion de pills
    $pillsMerge = d.createElement('audio');
    $pillsMerge.src = 'pills-merge.mp3';
    $pillsMerge.volume = 0.2;
    d.body.insertAdjacentElement('beforeend', $pillsMerge);
    //Sonido de header al salir del qm
    electricitySound = d.createElement('audio');
    electricitySound.src = 'electric-sparks.mp3';
    d.body.insertAdjacentElement('beforeend', electricitySound);
  };

  //Cargar videos del qm
  function loadVids() {
    $exitQmVid.src = 'exit-qm.mp4';
  }

  //Funcion de cambio de fondo cuando hover en profile-pic
  function matrixBg(hover) {
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
      $matrixBg.style.opacity = 100;
    } else {
      if (quoteModeIsOn) {
        setTimeout(() => {
          $matrixBg.style.opacity = 0;
        }, 3000);
      } else {
        $matrixBg.style.opacity = 0;
      }
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

  //Funcion de cambio de fondo al entrar a quote mode
  function matrix2Bg() {
    $header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
    $cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    $seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    $seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    $seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
    $footer.style.backgroundColor = 'rgba(0,0,0,0)';
    $matrix2Bg.style.opacity = 100;
    $cajaFondo.style.opacity = 0; //Por si viene desde el conejo
    $cajaFdoMobile.style.opacity = 0; //Por si viene desde el conejo
  }

  // Funcion para usar typed.js en la quote
  const typeQuote = (quote) => {
    if (quotePosition === 0) {
      $cajaPresentacion.querySelector('p').textContent = quote;
    } else {
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
          if (soundIsOn) $typing.play();
        },
        onComplete: (self) => {
          $typing.pause();
          $typing.currentTime = 0;
        },
      };
      typed = new Typed('#presentacion', options);
    }
  };

  // Función para obtener la siguiente frase descifrada
  // CAMBIAR URL SEGUN A QUE BACKEND NECESITO APUNTAR
  function getNextPhrase(typeEffect) {
    const nextPhraseURL = `https://vigenere-api.onrender.com/api/next-phrase?index=${quotePosition}&language=${language}`;
    const nextPhraseLocalURL = `http://localhost:3000/api/next-phrase?index=${quotePosition}&language=${language}`;
    // console.log(nextPhraseLocalURL);
    fetch(nextPhraseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.phrase) {
          console.log('Phrase:', data.phrase);
          // Aquí puedes actualizar tu frontend con la nueva frase
          if (typeEffect) {
            typeQuote(data.phrase);
          } else {
            $cajaPresentacion.querySelector('p').textContent = data.phrase;
          }
          if (quotePosition === 0 && quoteModeIsOn && !understoodClicked) {
            $understood.style.display = 'block';
            $languageToggle.style.display = 'block';
          }
        } else {
          console.log('No hay más frases disponibles');
          // Aquí puedes manejar el caso cuando no hay más frases
          exitQuoteMode();
        }
      })
      .catch((error) => {
        console.error('Error fetching next phrase:', error);
      });
  }

  //Resetear estilos de pills
  function resetPills() {
    $pills.forEach((pill) => {
      pill.style.opacity = 1;
      pill.style.width = '80px';
      pill.style.height = '80px';
      pill.style.scale = 2;
    });
  }

  //Funcion de salida del quote mode
  const exitQuoteMode = () => {
    matrixBg(false);
    $matrixBg.style.opacity = 100;
    $matrixBg.style.zIndex = 888;
    // $header.style.zIndex = 99999;
    $exitQmVid.style.zIndex = 999;
    $exitQmVid.style.opacity = 0.9;
    $exitQmVid.play();
    setTimeout(() => {
      $exitQmVid.style.opacity = 0;
    }, 2200);
    setTimeout(() => {
      $header.style.zIndex = 1;
      $exitQmVid.style.transition = 'none';
      $exitQmVid.style.zIndex = -999;
      $matrixBg.style.zIndex = 1;
    }, 5000);
    quoteModeIsOn = false;
    changingHeaderLetters();
    $name.style.animation = 'none';
    $name.style.color = '#fff';
    $changeButton.style.pointerEvents = 'auto';
    understoodClicked = false;
    quotePosition = 0;
    imgPosition = 0;
    $firstPage.style.display = 'block';
    $firstPage.style.opacity = 1;
    $header.style.transition = 'var(--matrixBgTransition)';
    $disclaimer.style.display = 'none';
    $cajaCara.style.pointerEvents = 'none';
    if (typed) {
      typed.destroy();
    }
    if (soundIsOn) $phoneRing.play();
    // bgExitEffect(); El de mis 3 caras en secuencia
    resetPills();
    $nextSong.style.display = 'none';
    $matrix2Bg.style.opacity = 0;
    $changeButton.classList.remove('fa-shake');
    $quoteText.style.opacity = 0;
    $rainAudio.pause();
    $thunderAudio.pause();
    $thunderAudio.currentTime = 0;
    quoteSong.pause();
    quoteSong.currentTime = 0;
    $typing.pause();
    $musicToggle.style.display = 'none';
    $exitQuoteModeBtn.style.display = 'none';
    $languageToggle.style.display = 'none';
    $suggestiveFinger1.style.opacity = 0;
    $changeButton.classList.remove('fa-shake');
    $changeButton.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
    $understood.style.display = 'none';
    if (window.innerWidth > 630) {
      $cajaPresentacion.style.backgroundColor = 'var(--color1)';
      setTimeout(() => {
        $exitQmVid.style.transition = 'opacity 6s ease-in';
      }, 2200);
    } else {
      $exitQmVid.style.transform = 'translateX(66%)';
      $exitQmVid.style.transition =
        'transform 5s ease-in-out, opacity 6s ease-in';
      setTimeout(() => {
        $exitQmVid.style.transform = 'none';
      }, 5000);
    }
    setTimeout(() => {
      $name.textContent = 'FERNANDEZ MATIAS';
      $quoteText.style.opacity = 100;
      $quoteText.textContent = textoPresentacion;
      $quoteText.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      $quoteText.style.textAlign = 'center';
      $exitQuoteModeBtn.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      $exitQuoteModeBtn.style.pointerEvents = 'none';
    }, 2000);
    setTimeout(() => {
      $matrixProfPic.src =
        profPicPos === 6
          ? ($matrixProfPic.src = 'profile-pic-hover-2.png')
          : ($matrixProfPic.src = 'profile-pic-hover.png');
      $cajaCara.style.pointerEvents = 'auto';
    }, 4000);
    setTimeout(() => {
      $changeButton.classList.remove('fa-shake');
      $changeButton.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      $musicToggle.style.display = 'none';
      $suggestiveFinger1.style.opacity = 0;
    }, 6000);
  };

  //Efecto fade in para audio (con ayuda de copilot quedó pero se puede "hackear")
  function fadeInOut(audio) {
    if (!soundIsOn) return;
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

  //Pills animation
  const animatePills = () => {
    //Red pill tl
    let tl = gsap.timeline();
    tl.set('#red-pill', { display: 'block' });
    tl.from('#red-pill', { duration: 4, y: -150 });
    tl.from(
      '#red-pill',
      {
        duration: 5,
        opacity: 0,
        ease: 'slow',
      },
      '-=4'
    );
    tl.to('#red-pill', {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      ease: 'slow',
    });
    tl.add(() => {
      if (soundIsOn) $pillsMerge.play();
    }, '-=1');
    tl.to(
      '#change-button',
      {
        duration: 2,
        textShadow: '2px 2px 2px #f00, -2px -2px 2px #f00',
      },
      '-=2'
    );
    tl.set('#red-pill', { display: 'none' });

    //Blue pill tl
    let tl2 = gsap.timeline();
    tl2.set('#blue-pill', { display: 'block' });
    tl2.set('#exit-quote-mode-wrapper', { display: 'block' });
    tl2.from('#blue-pill', { duration: 4, y: -850 });
    tl2.from(
      '#blue-pill',
      {
        duration: 5,
        opacity: 0,
        ease: 'slow',
      },
      '-=4'
    );
    tl2.to('#blue-pill', {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      ease: 'slow',
    });
    tl2.to('#exit-quote-mode-wrapper', { duration: 2, opacity: 1 }, '-=5');
    tl2.to(
      '#exit-quote-mode-wrapper',
      { duration: 2, textShadow: '3px 3px 2px #0000ff, -3px -3px 2px #0000ff' },
      '-=2'
    );
    tl2.set('#blue-pill', { display: 'none' });

    //Instrucciones al finalizar la timeline tl
    tl.eventCallback('onComplete', function () {
      $changeButton.style.pointerEvents = 'auto';
      $changeButton.style.textShadow =
        '2px 2px 2px #ff0000, -2px -2px 2px #ff0000';
      $suggestiveFinger1.style.opacity = 100;
      $changeButton.classList.add('fa-shake');
      $exitQuoteModeBtn.style.pointerEvents = 'auto';
    });
  };

  //Funciones asignadas al changeButton
  const handleChange = () => {
    //Iteracion imagenes
    if (!quoteModeIsOn) {
      const currentSrc = $imgProfPic.src.split('/').pop();
      const index = profPics.indexOf(currentSrc);
      const nextIndex = (index + 1) % profPics.length;
      $imgProfPic.src = profPics[nextIndex];
      localStorage.setItem('profPicIndex', nextIndex.toString());
      console.log('prof pic pos', nextIndex);
      console.log('nextIndex', nextIndex + 1);
      if (index === 6) {
        $matrixProfPic.src = 'profile-pic-hover-2.png';
      } else {
        $matrixProfPic.src = 'profile-pic-hover.png';
      }
    } else {
      //Iteracion imagenes QUOTE MODE ON!
      if (imgPosition < images.length - 1) {
        quoteImg = images[imgPosition + 1];
        imgPosition += 1;
        console.log('position', imgPosition);
        console.log('img', quoteImg);
      } else {
        quoteImg = images[0];
        imgPosition = 0;
        console.log('imgPosition', imgPosition);
        console.log('img', quoteImg);
      }
      $matrixProfPic.src = quoteImg;
      //Iteracion quotes
      console.log('Quote number', quotePosition + 2);

      //Quotes de la API
      quotePosition++;
      getNextPhrase(true);
    }
  };

  //Funcion de efecto en toggleImg
  const imgToggleEffect = () => {
    if (soundIsOn) {
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
    //Manejo del click en prof pic
    if (
      e.target.matches('#prof-pic-area') ||
      e.target.matches('svg#prof-pic-area-mobile')
    ) {
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime > 550) {
        lastClickTime = currentTime;
        if (!bunnyHandlerUniqueCall) {
          count--;
          $header.querySelector('h3').textContent = count;
          if (soundIsOn) {
            switch (count) {
              case 5:
                $get.play();
                break;
              case 4:
                $ready.play();
                break;
              case 3:
                $for.play();
                break;
              case 2:
                $the.play();
                break;
              case 1:
                $great.play();
                break;
              case 0:
                $awakening.play();
                break;
            }
          }
          if (!clicksTimeOut) {
            clicksTimeOut = true;
            setTimeout(() => {
              clicksTimeOut = false;
              count = 6;
              $header.querySelector('h3').textContent = textoHeader;
            }, 4500);
          }
          if (count === 0) {
            bunnyHandler();
            setTimeout(() => {
              $header.querySelector('h3').textContent = textoHeader;
              $cajaPresentacion.querySelector('p').textContent =
                textoPresentacion;
            }, 4000);
          }
          console.log(count);
        }
      } else {
        count = 6;
      }
    }
    //Manejo del botón de sonido
    if (e.target.matches('#audio-toggle')) {
      $suggestiveFinger3.style.display =
        $suggestiveFinger3.style.display === 'none' ? 'block' : 'none';
      $audioToggleBtn.classList.toggle('fa-volume-high');
      $audioToggleBtn.classList.toggle('fa-volume-xmark');
      soundIsOn ? (soundIsOn = false) : (soundIsOn = true);
      console.log('soundIsOn', soundIsOn);
      if (soundIsOn && quoteModeIsOn) {
        $rainAudio.volume = 0.2;
        $thunderAudio.volume = 0.3;
        $rainAudio.play();
        $thunderAudio.play();
      } else {
        $rainAudio.pause();
        $thunderAudio.pause();
        $thunderAudio.currentTime = 0;
        $typing.pause();
        $typing.currentTime = 0;
      }
      if (firstSoundOn && !quoteModeIsOn && !bunnyHandlerUniqueCall) {
        $firstSoundOn.play();
        $imgProfPic.style.filter =
          'drop-shadow(16px 0px 35px rgb(255, 255, 255, 50)) invert(0%)';
        setTimeout(() => {
          $imgProfPic.style.filter = 'none';
        }, 200);
        firstSoundOn = false;
      }
    }
    //Manejo del boton change
    if (e.target.matches('#change-button')) {
      //   if (!quoteModeIsOn) imgInterval('Create');
      handleChange();
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
    //Boton de musica
    if (e.target.matches('#music-toggle')) {
      $musicToggle.classList.remove('fa-beat-fade');
      $nextSong.style.display = 'block';
      if ($musicToggle.style.color == 'rgb(255, 255, 255)') {
        quoteSong.play();
        $musicToggle.style.color = '#ff0000';
        //Finalizacion de una cancion
        quoteSong.addEventListener('ended', () => {
          nextSong();
        });
      } else {
        quoteSong.pause();
        $musicToggle.style.color = '#fff';
      }
    }
    //Boton siguiente cancion
    if (e.target.matches('#next-song')) {
      $nextSong.classList.remove('fa-beat-fade');
      nextSong();
    }
    //Boton "Understood!"
    if (e.target.matches('#understood')) {
      understoodClicked = true;
      $understood.style.display = 'none';
      if (soundIsOn) $pillsSound.play();
      animatePills();
    }
    //Botón de lenguaje
    if (e.target.matches('#language-toggle')) {
      $languageToggle.classList.remove('fa-beat-fade');
      if (typed) {
        typed.destroy();
        $typing.pause();
      }
      if (language == 'en') {
        language = 'es';
        getNextPhrase(false);
        localStorage.setItem('language', 'es');
        updateTextLanguage();
      } else {
        language = 'en';
        getNextPhrase(false);
        localStorage.setItem('language', 'en');
        updateTextLanguage();
      }
    }
    //Botón de salida de quote mode
    if (e.target.matches('#exit-quote-mode')) {
      exitQuoteMode();
    }
    //Agujero del conejo
    if (e.target.matches('#rabbit-hole-area')) {
      if (!quoteModeIsOn) {
        window.scrollTo({
          behavior: 'smooth',
          top: 0,
        });
        setTimeout(() => {
          startQuoteMode();
        }, 500);
      } else {
        exitQuoteMode();
      }
    }
    //Scroll to top general
    if (e.target.matches('#scroll-to-top')) {
      if (soundIsOn) $goToTop.play();
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  });

  d.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === 'q' || e.key === 'Q'))
      startQuoteMode();
    if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === 'l' || e.key === 'L'))
      exitQuoteMode();
  });

  //Manejo de eventos hover
  d.addEventListener('mouseover', (e) => {
    //Manejo del hover en profile-pic
    if (window.innerWidth > 630) {
      if (e.target.matches('#prof-pic-area') && !quoteModeIsOn) {
        console.log('Mouseover PC');
        $profileAudio.volume = 0;
        if (!quoteModeFirstLoad) fadeInOut($profileAudio);
        //   imgInterval('Create');
        matrixBg(true);
      }
    } else {
      if (e.target.matches('svg#prof-pic-area-mobile') && !quoteModeIsOn) {
        console.log('Mouseover mobile');
        $profileAudio.volume = 0;
        if (!quoteModeFirstLoad) fadeInOut($profileAudio);
        //   imgInterval('Create');
        matrixBg(true);
      }
    }
  });

  //Manejo de eventos mouseout
  d.addEventListener('mouseout', (e) => {
    //Manejo del mouseout en profile pic
    if (window.innerWidth > 630) {
      if (e.target.matches('#prof-pic-area') && !quoteModeIsOn) {
        $profileAudio.volume = 0.5;
        if (!quoteModeFirstLoad) fadeInOut($profileAudio);
        matrixBg(false);
      }
    } else {
      if (e.target.matches('svg#prof-pic-area-mobile') && !quoteModeIsOn) {
        $profileAudio.volume = 0.5;
        if (!quoteModeFirstLoad) fadeInOut($profileAudio);
        matrixBg(false);
      }
    }
  });

  //Long press en mobile, click derecho en pc
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    //Click derecho en profile pic
    if (event.target.matches('img#profile-pic')) {
      // Agregar algun efecto quizas
    }
  });
});
