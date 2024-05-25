import * as s from './selectors.js';
const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  // Realiza una solicitud para wake up al backend al cargar la página
  fetch('https://tu-api-en-render.com/wake-up')
    .then((response) => response.json())
    .then((data) => {
      console.log('Wake up response:', data);
    })
    .catch((error) => {
      console.error('Error waking up backend:', error);
    });

  //Establecer volumenes (en hmtl no los toma al menos en chrome)
  s.$profileAudio.volume = 0;
  s.$typing.volume = 0.3;
  s.$phoneRing.volume = 0.4;
  s.$musicBtnAppearance.volume = 0.4;

  //Variables y constantes de uso global:
  let lastClickTime = 0;
  let bunnyHandlerUniqueCall = false;
  let count = 6;
  let fastClicksInit = false;
  const textoHeader = s.$header.querySelector('h3').textContent;
  const textoPresentacion = s.$cajaPresentacion.querySelector('p').textContent;
  let fadeInterval = 0;
  let autoImginterval = 0;
  console.log('Auto Image interval INITIALIZED!!!');
  let quoteModeIsOn = false;
  let quoteModeFirstLoad = true;
  let imgPosition = 0;
  let quotePosition = 0;
  let typed = null;
  let language = 'en';
  const images = [
    'quote-mode-pic1.png',
    'quote-mode-pic2.png',
    'quote-mode-pic3.png',
  ];
  let quoteImg = images[imgPosition];
  let quoteSong = null;
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
  ];
  let songPosition = 0;
  let firstSoundOn = true;
  const disclaimer = [
    s.$disclaimer.textContent,
    'Este contenido es puramente ficticio y tiene únicamente fines de entretenimiento. No asumimos responsabilidad por la exactitud o confiabilidad de la información presentada aquí.',
  ];

  /************************* FUNCIONES ******************************/

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
    s.$musicToggle.style.color = 'red';
  }

  function startQuoteMode() {
    //Si no estabas en quote mode
    if (!quoteModeIsOn) {
      quoteModeIsOn = true;
      //Solo en primera carga del quote mode
      if (quoteModeFirstLoad) {
        loadSounds();
        quoteModeFirstLoad = false;
      }
      //Fin de solo primera carga

      //////Siempre que entra al quote mode///////

      //Manejo del sonido
      if (soundIsOn) {
        s.$profileAudio.pause();
        s.$rainAudio.volume = 0.2;
        s.$thunderAudio.volume = 0.3;
        s.$thunderAudio.play();
        s.$rainAudio.play();
      }
      //Fin manejo sonido

      s.$imgProfPic.style.cursor = 'auto';
      s.$firstPage.style.opacity = 0;
      s.$disclaimer.style.display = 'inline-block';
      s.$changeButton.style.pointerEvents = 'none';
      matrix2Bg(true);
      s.$header.style.transition = 'none'; //FALTA: Al volver devolver estilo
      clearInterval(autoImginterval);
      console.log('auto img interval CLEARED!');
      s.$imgProfPic.style.opacity = 0;
      //   s.$msjeCondicional.style.display = 'none';
      s.$cajaCentral.style.opacity = 0;
      s.$quoteModeGif.style.display = 'block';

      //Media query para el fondo de transicion
      if (window.innerWidth > 630) {
        s.$qModeBkgIntro.style.display = 'block';
      } else {
        s.$mobileQModeBkgIntro.style.display = 'block';
      }

      setTimeout(() => {
        s.$firstPage.style.display = 'none';
        s.$understood.style.display = 'block';
        s.$quoteText.textContent = dQ(quotes[0]);
        s.$quoteText.style.textShadow =
          '2px 2px 2px #b00000, -2px -2px 2px #b00000';
        s.$musicToggle.style.color = '#fff';
        s.$cajaPresentacion.style.textAlign = 'left';
        s.$cajaPresentacion.style.textWrap = 'wrap';
        s.$languageToggle.style.display = 'block';
        s.$matrixProfPic.src = quoteImg;
        s.$cajaCentral.style.opacity = 100;
        s.$quoteModeGif.style.display = 'none';
        resetGif(s.$quoteModeGif);
        if (window.innerWidth > 630) {
          s.$qModeBkgIntro.style.display = 'none';
        } else {
          s.$mobileQModeBkgIntro.style.display = 'none';
        }
        //Music BTN Appearence
        setTimeout(() => {
          if (soundIsOn) s.$musicBtnAppearance.play();
        }, 500);
        setTimeout(() => {
          s.$musicGif.style.display = 'block';
          setTimeout(() => {
            s.$musicToggle.style.display = 'block';
            s.$musicGif.style.display = 'none';
            resetGif(s.$musicGif);
          }, 2400);
        }, 2000);
      }, 3700);
    } else {
      console.log(
        'Por ahora no pasa nada en quote mode si haces click derecho a profile pic'
      );
    }
  }

  //Intersection observer API
  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('El footer está en el viewport');
        if (quoteModeFirstLoad) s.$whiteRabbit.style.display = 'block';
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
    s.$imgProfPic.style.cursor = 'auto';
    s.$cajaPresentacion.querySelector('p').textContent = 'F T W R';
    bunnyHandlerUniqueCall = true;
    console.log('bunnyHandler llamada');
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    //Observar aparición del footer (para white rabbit)
    observer.observe(s.$footer);
  }

  //Cargar canciones y sonidos
  const loadSounds = () => {
    //Canciones del quote mode (a partir de la uno se cargan al tocar next song)
    quoteSong = d.createElement('audio');
    quoteSong.src = songsArray[0];
    d.body.insertAdjacentElement('beforeend', quoteSong);
    // quoteSong.setAttribute('controls', 'true');
    // quoteSong.style.display = 'block';
    // quoteSong.style.position = 'absolute';
    // quoteSong.style.zIndex = 55;
    // quoteSong.style.top = '550px';

    //Sonido de ingreso de pills
    s.$pillsSound = d.createElement('audio');
    s.$pillsSound.src = 'pills-intro.mp3';
    d.body.insertAdjacentElement('beforeend', s.$pillsSound);
    //Sonido de fusion de pills
    s.$pillsMerge = d.createElement('audio');
    s.$pillsMerge.src = 'pills-merge.mp3';
    s.$pillsMerge.volume = 0.2;
    d.body.insertAdjacentElement('beforeend', s.$pillsMerge);
  };

  //Funcion de cambio de fondo cuando hover en profile-pic
  function matrixBg(hover) {
    if (hover) {
      s.$header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      s.$cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
      s.$cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      s.$seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      s.$seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      s.$seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
      s.$footer.style.backgroundColor = 'rgba(0,0,0,0)';
      s.$cajaFondo.style.opacity = 0;
      s.$cajaFdoMobile.style.opacity = 0;
      s.$imgProfPic.style.opacity = 0;
      s.$matrixBg.style.opacity = 100;
    } else if (!quoteModeIsOn) {
      s.$matrixBg.style.opacity = 0;
      s.$header.style.backgroundColor = 'var(--color1)';
      s.$cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0.368)';
      s.$seccionAptitudes.style.backgroundColor = 'var(--color2)';
      s.$seccionTecnologias.style.backgroundColor = 'var(--color1)';
      s.$seccionCpe.style.backgroundColor = 'var(--color2)';
      s.$footer.style.backgroundColor = 'var(--color1)';
      s.$cajaFondo.style.opacity = 100;
      s.$cajaFdoMobile.style.opacity = 100;
      s.$imgProfPic.style.opacity = 100;
      if (window.innerWidth > 630)
        s.$cajaFondo.style.backgroundColor = 'var(--color1)';
    }
  }

  //Funcion de cambio de fondo al entrar a quote mode
  function matrix2Bg() {
    s.$header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    s.$cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
    s.$cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    s.$seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    s.$seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    s.$seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
    s.$footer.style.backgroundColor = 'rgba(0,0,0,0)';
    s.$matrix2Bg.style.opacity = 100;
    s.$cajaFondo.style.opacity = 0; //Por si viene desde el conejo
    s.$cajaFdoMobile.style.opacity = 0; //Por si viene desde el conejo
  }

  // Función para obtener la siguiente frase descifrada
  async function getNextPhrase(currentIndex) {
    const response = await fetch(
      `https://tu-api-en-render.com/api/next-phrase?index=${currentIndex}&language=${language}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.nextIndex !== 0) {
        console.log('Frase descifrada:', data.phrase);
        currentIndex = data.nextIndex; // Actualiza el índice para la próxima solicitud
      } else {
        console.log('No hay más frases disponibles');
        // Realizar alguna acción adicional, si es necesario
        console.warn(`Dese data.message anda?: ${data.message}`);
      }
    } else {
      console.error('Error al obtener la siguiente frase');
    }
  }

  //Resetear estilos de pills
  function resetPills() {
    s.$pills.forEach((pill) => {
      pill.style.opacity = 1;
      pill.style.width = '80px';
      pill.style.height = '80px';
      pill.style.scale = 2;
    });
  }

  //Funcion de salida del quote mode
  const exitQuoteMode = () => {
    quoteModeIsOn = false;
    s.$firstPage.style.display = 'block';
    s.$firstPage.style.opacity = 1;
    s.$header.style.transition = 'var(--matrixBgTransition)';
    s.$disclaimer.style.display = 'none';
    s.$cajaCara.style.pointerEvents = 'none';
    if (typed) {
      typed.destroy();
    }
    if (soundIsOn) s.$phoneRing.play();
    matrixBg(false);
    // bgExitEffect(); El de mis 3 caras en secuencia
    resetPills();
    s.$musicToggle.classList.add('fa-beat-fade');
    s.$nextSong.classList.add('fa-beat-fade');
    s.$nextSong.style.display = 'none';
    s.$matrix2Bg.style.opacity = 0;
    s.$changeButton.classList.remove('fa-shake');
    s.$quoteText.style.opacity = 0;
    s.$rainAudio.pause();
    s.$thunderAudio.pause();
    s.$thunderAudio.currentTime = 0;
    quoteSong.pause();
    quoteSong.currentTime = 0;
    s.$typing.pause();
    s.$musicToggle.style.display = 'none';
    s.$exitQuoteModeBtn.style.display = 'none';
    s.$languageToggle.style.display = 'none';
    s.$suggestiveFinger1.style.opacity = 0;
    s.$changeButton.classList.remove('fa-shake');
    s.$changeButton.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
    s.$understood.style.display = 'none';
    if (window.innerWidth > 630)
      s.$cajaPresentacion.style.backgroundColor = 'var(--color1)';
    setTimeout(() => {
      s.$quoteText.style.opacity = 100;
      s.$quoteText.textContent = textoPresentacion;
      s.$quoteText.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      s.$quoteText.style.textAlign = 'center';
      s.$exitQuoteModeBtn.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      s.$exitQuoteModeBtn.style.pointerEvents = 'none';
    }, 2000);
    setTimeout(() => {
      s.$cajaCara.style.pointerEvents = 'auto';
    }, 5000);
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
      if (soundIsOn) s.$pillsMerge.play();
    }, '-=1');
    tl.to(
      '#change-button',
      {
        duration: 2,
        textShadow: '2px 2px 2px #ff0000, -2px -2px 2px #ff0000',
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
      s.$changeButton.style.pointerEvents = 'auto';
      s.$changeButton.style.textShadow =
        '2px 2px 2px #ff0000, -2px -2px 2px #ff0000';
      s.$suggestiveFinger1.style.opacity = 100;
      s.$changeButton.classList.add('fa-shake');
      s.$musicToggle.style.display = 'block';
      s.$exitQuoteModeBtn.style.pointerEvents = 'auto';
    });
  };

  //Funciones asignadas al changeButton
  const handleChange = () => {
    if (!quoteModeIsOn) {
      if (s.$imgProfPic.src.includes(pic1)) {
        s.$imgProfPic.src = pic2;
        s.$matrixProfPic.src = pic2h;
      } else {
        s.$imgProfPic.src = pic1;
        s.$matrixProfPic.src = pic1h;
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
      s.$matrixProfPic.src = quoteImg;
      //Iteracion quotes
      console.log('Quote number', quotePosition + 2);

      //Quotes de la API
      getNextPhrase(quotePosition);
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
    if (soundIsOn) {
      s.$audioEffect1.play();
    }
    if (window.innerWidth > 630) {
      s.$cajaCentral.style.transition = 'box-shadow 100ms ease-in-out';
      quoteModeIsOn
        ? (s.$cajaCentral.style.boxShadow = '0 0 50px 1px red')
        : (s.$cajaCentral.style.boxShadow = '0 0 50px 1px white');
      const timeout = setTimeout(() => {
        s.$cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0.368)';
      }, 200);
    } else {
      s.$cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      quoteModeIsOn
        ? (s.$cajaCara.style.boxShadow = '0 0 50px 1px red')
        : (s.$cajaCara.style.boxShadow = '0 0 50px 1px white');
      const timeout = setTimeout(() => {
        s.$cajaCara.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      }, 200);
    }
  };

  function dQ(q) {
    let decQ = '';
    for (let char of q) {
      const decChar = String.fromCharCode(char.charCodeAt(0) - 1);
      decQ += decChar;
    }
    return decQ;
  }

  //Manejo de eventos click
  d.addEventListener('click', (e) => {
    //Manejo del click en prof pic
    if (e.target.matches('img#profile-pic')) {
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime > 550) {
        lastClickTime = currentTime;
        if (!bunnyHandlerUniqueCall) {
          count--;
          s.$header.querySelector('h3').textContent = count;
          if (soundIsOn) {
            switch (count) {
              case 5:
                s.$get.play();
                break;
              case 4:
                s.$ready.play();
                break;
              case 3:
                s.$for.play();
                break;
              case 2:
                s.$the.play();
                break;
              case 1:
                s.$great.play();
                break;
              case 0:
                s.$awakening.play();
                break;
            }
          }
          if (!fastClicksInit) {
            fastClicksInit = true;
            setTimeout(() => {
              fastClicksInit = false;
              count = 6;
            }, 4500);
          }
          if (count === 0) {
            bunnyHandler();
            setTimeout(() => {
              s.$header.textContent = textoHeader;
              s.$cajaPresentacion.querySelector('p').textContent =
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
      s.$suggestiveFinger3.style.display =
        s.$suggestiveFinger3.style.display === 'none' ? 'block' : 'none';
      s.$audioToggleBtn.classList.toggle('fa-volume-high');
      s.$audioToggleBtn.classList.toggle('fa-volume-xmark');
      soundIsOn ? (soundIsOn = false) : (soundIsOn = true);
      console.log('soundIsOn', soundIsOn);
      if (soundIsOn && quoteModeIsOn) {
        s.$rainAudio.volume = 0.2;
        s.$thunderAudio.volume = 0.3;
        s.$rainAudio.play();
        s.$thunderAudio.play();
      } else {
        s.$rainAudio.pause();
        s.$thunderAudio.pause();
        s.$thunderAudio.currentTime = 0;
        s.$typing.pause();
        s.$typing.currentTime = 0;
      }
      if (firstSoundOn && !quoteModeIsOn && !bunnyHandlerUniqueCall) {
        s.$firstSoundOn.play();
        s.$imgProfPic.style.filter =
          'drop-shadow(16px 0px 35px rgb(255, 255, 255, 50)) invert(0%)';
        setTimeout(() => {
          s.$imgProfPic.style.filter = 'none';
        }, 200);
        firstSoundOn = false;
      }
    }
    //Manejo del boton change
    if (e.target.matches('#change-button')) {
      if (!quoteModeIsOn) imgInterval('Create');
      handleChange();
      imgToggleEffect();
      s.$suggestiveFinger1.style.opacity = 0;
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
      s.$musicToggle.classList.remove('fa-beat-fade');
      s.$nextSong.style.display = 'block';
      if (s.$musicToggle.style.color == 'rgb(255, 255, 255)') {
        quoteSong.play();
        s.$musicToggle.style.color = '#ff0000';
        //Finalizacion de una cancion
        quoteSong.addEventListener('ended', () => {
          nextSong();
        });
      } else {
        quoteSong.pause();
        s.$musicToggle.style.color = '#fff';
      }
    }
    //Boton siguiente cancion
    if (e.target.matches('#next-song')) {
      s.$nextSong.classList.remove('fa-beat-fade');
      nextSong();
    }
    //Boton "Understood!"
    if (e.target.matches('#understood')) {
      s.$understood.style.display = 'none';
      if (soundIsOn) s.$pillsSound.play();
      animatePills();
    }
    //Botón de lenguaje
    if (e.target.matches('#language-toggle')) {
      s.$languageToggle.classList.remove('fa-beat-fade');
      if (typed) {
        typed.destroy();
        s.$typing.pause();
      }
      if (language == 'EN') {
        language = 'ES';
        quotes = [...quotesEsp];
        s.$quoteText.textContent = dQ(quotes[quotePosition]);
        s.$understood.textContent = '¡Entendido!';
        s.$disclaimer.textContent = disclaimer[1];
      } else {
        language = 'EN';
        quotes = [...quotesEng];
        s.$quoteText.textContent = dQ(quotes[quotePosition]);
        s.$understood.textContent = 'Understood!';
        s.$disclaimer.textContent = disclaimer[0];
      }
    }
    //Botón de salida de quote mode
    if (e.target.matches('#exit-quote-mode')) {
      exitQuoteMode();
    }
    //Agujero del conejo
    if (e.target.matches('area')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
      setTimeout(() => {
        startQuoteMode();
      }, 500);
    }
    //Scroll to top general
    if (e.target.matches('#scroll-to-top')) {
      if (soundIsOn) s.$goToTop.play();
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
    if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
      console.log('Mouseover detectado');
      s.$profileAudio.volume = 0;
      if (!quoteModeFirstLoad) fadeInOut(s.$profileAudio);
      imgInterval('Create');
      matrixBg(true);
    }
  });

  //Manejo de eventos mouseout
  d.addEventListener('mouseout', (e) => {
    //Manejo del mouseout en profile pic
    if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
      s.$profileAudio.volume = 0.5;
      if (!quoteModeFirstLoad) fadeInOut(s.$profileAudio);
      matrixBg(false);
    }
  });

  //Long press en mobile, click derecho en pc
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    //Click derecho en profile pic
    if (event.target.matches('img#profile-pic')) {
      //   startQuoteMode();
      // Agregar algun efecto quizas
    }
  });
});
