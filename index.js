const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  //Selectores de uso global
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
    $suggestiveFinger2 = d.querySelector('#suggestive-finger2'),
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
    $matrixProfPic = d.querySelector('#matrix'),
    pic1 = d.querySelector('#profile-pic').src,
    pic1h = d.querySelector('#matrix').src,
    pic2 = 'prof-pic.png',
    pic2h = 'prof-pic-hover.png',
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
    $musicGif = d.querySelector('#music-gif');

  //Establecer volumenes (en hmtl no los toma al menos en chrome)
  $profileAudio.volume = 0;
  $typing.volume = 0.3;
  $phoneRing.volume = 0.4;

  //Variables y constantes de uso global:
  const textoPresentacion = $cajaPresentacion.querySelector('p').textContent;
  let timerMsje = null;
  let fadeInterval = 0;
  let autoImginterval = 0;
  console.log('Auto Image interval INITIALIZED!!!');
  let quoteModeIsOn = false;
  let quoteModeFirstLoad = true;
  let imgPosition = 0;
  let quotePosition = 0;
  let typed = null;
  let language = 'EN';
  // Version inicial, raíz, en inglés...
  const quotesEng = [
    'This is your last chance. After this, there is no turning back. You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill - you stay in Wonderland and I show you how deep the rabbit hole goes.',
    'You have to let it all go. Fear, doubt, and disbelief. Free your mind.',
    'Have you ever had a dream, That you were so sure was real? What if you were unable to wake from that dream? How would you know the difference between the dream world and the real world?',
    "If You Can Steal An Idea, Why Can't You Plant One There Instead?",
    "Once An Idea Has Taken Hold Of The Brain, It's Almost Impossible To Eradicate.",
    'Downward Is The Only Way Forward.',
    'The more you change things, the projection begins to converge on you. They sense the alien nature of the dreamer, they attack like white blood cells fighting an infection.',
    "Dreams Feel Real While We're In Them. It's Only When We Wake Up That We Realize Something Was Actually Strange.",
    ' Many Dreams Within Dreams Is Too Unstable.',
    'Have you ever felt that there is a script written by something greater than us?',
    'In this game, the battle is for your soul. And the battle field is your mind',
    "Agent Smith could be anywhere. Don't let him in.",
    'Respect the simulation.',
    "What is real? How do you define 'real'? If you're talking about what you can feel, what you can smell, what you can taste and see, then 'real' is simply electrical signals interpreted by your brain.",
    "I'm trying to free your mind. But I can only show you the door. You're the one that has to walk through it.",
    'The dream has become their reality. Who are you to say otherwise?',
    "What is the most resilient parasite? Bacteria? A virus? An intestinal worm? An idea. Resilient... highly contagious. Once an idea has taken hold of the brain it's almost impossible to eradicate. An idea that is fully formed - fully understood - that sticks; right in there somewhere.",
    'Never recreate from your memory. Always imagine new places!',
    ' You keep telling yourself what you know. But what do you believe? What do you feel?',
    "I'm Still Dreaming.",
    "Admit It: You Don't Believe In One Reality Anymore.",
    'In The Dream State, Your Conscious Defenses Are Lowered And It Makes Your Thoughts Vulnerable To Theft.',
    "NPCs are programmed to attack what they don't understand. And to understand the world in ways that benefits the Game Master, Architect or some other Superior Entities.",
    'Five minutes in the “real world” gives you an hour in dreams.',
    'Creating a dream from your memory is the best way to lose sight of what is real and what is a dream.',
    "NPCs will collaborate with the architect even if they don't know what they're doing",
    "If the game was single player? Still, you shouldn't lose hope. NPCs are not necessarily always taken by Agent Smith and turned against you. They could also function as allies. What if you can awaken them and connect them with their higher self? Perhaps they would no longer be prone to being used against you. But how long would this effect last? What does it depend on not being an NPC again? Surely I can be one again too.",
    "When some said that Matrix is a documentary, it seemed exaggerated and fanciful to me. Now I know it's real. But what good is it if my in-game experience doesn't improve? How do I use it to my advantage?",
  ];
  const quotesEsp = [
    'Esta es tu última oportunidad. Después de esto, no hay vuelta atrás. Tomas la pastilla azul: la historia termina, te despiertas en tu cama y crees lo que quieras creer. Si tomas la pastilla roja, te quedarás en el País de las Maravillas y te mostraré hasta qué punto llega la madriguera del conejo.',
    'Tienes que dejar ir todo. Miedo, duda e incredulidad. Libera tu mente.',
    '¿Alguna vez has tenido un sueño que estabas tan seguro de que era real? ¿Qué pasaría si no pudieras despertar de ese sueño? ¿Cómo sabrías la diferencia entre el mundo de los sueños y el mundo real?',
    'Si puedes robar una idea, ¿por qué no puedes plantarla ahí?',
    'Una vez que una idea se ha apoderado del cerebro, es casi imposible erradicarla.',
    'Hacia abajo es el único camino a seguir.',
    'Mientras mas cambias las cosas, la proyección empieza a converger en ti. Sienten la naturaleza ajena del soñador, atacan como glóbulos blancos combatiendo una infección',
    'Los sueños se sienten reales mientras estamos en ellos. Sólo cuando despertamos nos damos cuenta de que algo era realmente extraño.',
    'Muchos sueños dentro de los sueños son demasiado inestables.',
    '¿Alguna vez has sentido que hay un guión escrito por algo más grande que nosotros?',
    'En este juego, la batalla es por tu alma. Y el campo de batalla es tu mente.',
    'El Agente Smith podría estar en cualquier lugar. No lo dejen entrar.',
    'Respeta la simulación.',
    '¿Qué es real? ¿Cómo defines lo real? Si estás hablando de lo que puedes sentir, lo que puedes oler, lo que puedes saborear y ver, entonces lo real son simplemente señales eléctricas interpretadas por tu cerebro.',
    'Estoy tratando de liberar tu mente. Pero sólo puedo mostrarte la puerta. Tú eres quien tiene que atravesarla.',
    'El sueño se ha convertido en su realidad. ¿Quién eres tú para decir lo contrario?',
    '¿Cuál es el parásito más resistente? ¿Las bacterias? ¿Un virus? ¿Un gusano intestinal? Una idea. Resistente... altamente contagiosa. Una vez que una idea se ha apoderado del cerebro es casi imposible de erradicar. Una idea que está completamente formada, completamente entendida - eso se queda; justo ahí en alguna parte.',
    'Nunca recrees a partir de tu memoria. ¡Imagínate siempre lugares nuevos!',
    'Sigues diciéndote a ti mismo lo que sabes. ¿Pero qué crees? ¿Qué sientes?',
    'Todavía estoy soñando.',
    'Admítelo: ya no crees en una sola realidad.',
    'En el estado de sueño, tus defensas conscientes disminuyen y tus pensamientos se vuelven vulnerables al robo.',
    'Los NPC están programados para atacar lo que no entienden. Y comprender el mundo de manera que beneficie al Game Master, al Arquitecto o a algunas otras Entidades Superiores.',
    'Cinco minutos en el “mundo real” te da una hora en sueños.',
    'Armar un sueño de tu memoria es la mejor manera de perder de vista que es real y qué es un sueño.',
    'Los NPC colaborarán con el arquitecto incluso si no saben lo que están haciendo.',
    '¿Si el juego fuera para un solo jugador? Aún así, no debes perder la esperanza. Los NPC no necesariamente siempre son tomados por el Agente Smith y se vuelven en tu contra. También podrían funcionar como aliados. ¿Qué pasaría si pudieras despertarlos y conectarlos con su yo superior? Quizás ya no sean propensos a ser utilizados en tu contra. ¿Pero cuánto tiempo duraría este efecto? ¿De qué depende no volver a ser NPC? Seguramente yo también puedo volver a serlo.',
    'Cuando algunos decían que Matrix es un documental, me parecía exagerado y fantasioso. Ahora sé que es real. Pero ¿de qué sirve si mi experiencia en el juego no mejora? ¿Cómo lo uso a mi favor?',
  ];
  let quotes = [...quotesEng]; //Copio el array con spread operator
  let quote = quotes[quotePosition];
  const images = [
    'quote-mode-pic1.png',
    'quote-mode-pic2.png',
    'quote-mode-pic3.png',
  ];
  let quoteImg = images[imgPosition];
  let $quoteSong = null;
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
  ];
  let songPosition = 0;
  let firstSoundOn = true;
  const disclaimer = [
    $disclaimer.textContent,
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
      $quoteSong.src = songsArray[songPosition + 1];
      songPosition += 1;
    } else {
      $quoteSong.src = songsArray[0];
      songPosition = 0;
    }
    $quoteSong.play();
    $musicToggle.style.color = 'red';
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
        $profileAudio.pause();
        $rainAudio.volume = 0.2;
        $thunderAudio.volume = 0.3;
        $thunderAudio.play();
        $rainAudio.play();
      }
      //Fin manejo sonido

      $disclaimer.style.display = 'inline-block';
      $changeButton.style.pointerEvents = 'none';
      matrix2Bg(true);
      $header.style.transition = 'none'; //FALTA: Al volver devolver estilo
      clearInterval(autoImginterval);
      console.log('auto img interval CLEARED!');
      $imgProfPic.style.opacity = 0;
      //   $msjeCondicional.style.display = 'none';
      $cajaCentral.style.opacity = 0;
      $quoteModeGif.style.display = 'block';

      //Media query para el fondo de transicion
      if (window.innerWidth > 630) {
        $qModeBkgIntro.style.display = 'block';
      } else {
        $mobileQModeBkgIntro.style.display = 'block';
      }

      setTimeout(() => {
        $understood.style.display = 'block';
        $quoteText.textContent = quotes[0];
        $quoteText.style.textShadow =
          '2px 2px 2px #b00000, -2px -2px 2px #b00000';
        $musicToggle.style.color = '#fff';
        $cajaPresentacion.style.textAlign = 'left';
        $cajaPresentacion.style.textWrap = 'wrap';
        $languageToggle.style.display = 'block';
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
          $musicGif.style.display = 'block';
          setTimeout(() => {
            $musicToggle.style.display = 'block';
            $musicGif.style.display = 'none';
            resetGif($musicGif);
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
  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );
  //Observar aparición del footer (para white rabbit)
  observer.observe($footer);

  //Cargar canciones y sonidos
  const loadSounds = () => {
    //Canciones del quote mode (a partir de la uno se cargan al tocar next song)
    $quoteSong = d.createElement('audio');
    $quoteSong.src = songsArray[0];
    d.body.insertAdjacentElement('beforeend', $quoteSong);
    // $quoteSong.setAttribute('controls', 'true');
    // $quoteSong.style.display = 'block';
    // $quoteSong.style.position = 'absolute';
    // $quoteSong.style.zIndex = 55;
    // $quoteSong.style.top = '550px';

    //Sonido de ingreso de pills
    $pillsSound = d.createElement('audio');
    $pillsSound.src = 'pills-intro.mp3';
    d.body.insertAdjacentElement('beforeend', $pillsSound);
    //Sonido de fusion de pills
    $pillsMerge = d.createElement('audio');
    $pillsMerge.src = 'pills-merge.mp3';
    $pillsMerge.volume = 0.2;
    d.body.insertAdjacentElement('beforeend', $pillsMerge);
    //Sonido de aparición del music toggle btn
    $musicBtnAppearance = d.createElement('audio');
    $musicBtnAppearance.src = 'music-btn-appearence.mp3';
    $musicBtnAppearance.volume = 0.4;
  };

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
    } else if (!quoteModeIsOn) {
      $matrixBg.style.opacity = 0;
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
    quoteModeIsOn = false;
    $disclaimer.style.display = 'none';
    $cajaCara.style.pointerEvents = 'none';
    if (typed) {
      typed.destroy();
    }
    if (soundIsOn) $phoneRing.play();
    matrixBg(false);
    // bgExitEffect(); El de mis 3 caras en secuencia
    resetPills();
    $musicToggle.classList.add('fa-beat-fade');
    $nextSong.classList.add('fa-beat-fade');
    $nextSong.style.display = 'none';
    $matrix2Bg.style.opacity = 0;
    $changeButton.classList.remove('fa-shake');
    $quoteText.style.opacity = 0;
    $rainAudio.pause();
    $thunderAudio.pause();
    $thunderAudio.currentTime = 0;
    $quoteSong.pause();
    $quoteSong.currentTime = 0;
    $typing.pause();
    $musicToggle.style.display = 'none';
    $exitQuoteModeBtn.style.display = 'none';
    $languageToggle.style.display = 'none';
    $suggestiveFinger1.style.opacity = 0;
    $changeButton.classList.remove('fa-shake');
    $changeButton.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
    $understood.style.display = 'none';
    if (window.innerWidth > 630)
      $cajaPresentacion.style.backgroundColor = 'var(--color1)';
    setTimeout(() => {
      $quoteText.style.opacity = 100;
      $quoteText.textContent = textoPresentacion;
      $quoteText.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      $quoteText.style.textAlign = 'center';
      $exitQuoteModeBtn.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      $exitQuoteModeBtn.style.pointerEvents = 'none';
    }, 2000);
    setTimeout(() => {
      $cajaCara.style.pointerEvents = 'auto';
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
      if (soundIsOn) $pillsMerge.play();
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
      $changeButton.style.pointerEvents = 'auto';
      $changeButton.style.textShadow =
        '2px 2px 2px #ff0000, -2px -2px 2px #ff0000';
      $suggestiveFinger1.style.opacity = 100;
      $changeButton.classList.add('fa-shake');
      $musicToggle.style.display = 'block';
      $exitQuoteModeBtn.style.pointerEvents = 'auto';
    });
  };

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
        $quoteText.textContent = quote;
      } else {
        quote = quotes[0];
        quotePosition = 0;
        exitQuoteMode();
        return;
      }
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
    //Manejo del botón de sonido
    if (e.target.matches('#audio-toggle')) {
      $suggestiveFinger3.style.display =
        $suggestiveFinger3.style.display === 'none' ? 'block' : 'none';
      $audioToggleBtn.classList.toggle('fa-volume-high');
      $audioToggleBtn.classList.toggle('fa-volume-xmark');
      soundIsOn ? (soundIsOn = false) : (soundIsOn = true);
      console.log(soundIsOn);
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
      if (soundIsOn && firstSoundOn && !quoteModeIsOn) {
        $suggestiveFinger2.style.display = 'block';
        firstSoundOn = false;
      }
    }
    //Manejo del boton change
    if (e.target.matches('#change-button')) {
      if (!quoteModeIsOn) imgInterval('Create');
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
        $quoteSong.play();
        $musicToggle.style.color = '#ff0000';
        //Finalizacion de una cancion
        $quoteSong.addEventListener('ended', () => {
          nextSong();
        });
      } else {
        $quoteSong.pause();
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
      if (language == 'EN') {
        language = 'ES';
        quotes = [...quotesEsp];
        $quoteText.textContent = quotes[quotePosition];
        $understood.textContent = '¡Entendido!';
        $disclaimer.textContent = disclaimer[1];
      } else {
        language = 'EN';
        quotes = [...quotesEng];
        $quoteText.textContent = quotes[quotePosition];
        $understood.textContent = 'Understood!';
        $disclaimer.textContent = disclaimer[0];
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

  //Manejo de eventos hover
  d.addEventListener('mouseover', (e) => {
    //Manejo del hover en profile-pic
    if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
      console.log('Mouseover detectado');
      $profileAudio.volume = 0;
      fadeInOut($profileAudio);
      imgInterval('Create');
      matrixBg(true);
      timerMsje = setTimeout(() => {
        $suggestiveFinger2.style.display = 'none';
      }, 1500);
    }
  });

  //Manejo de eventos mouseout
  d.addEventListener('mouseout', (e) => {
    //Manejo del mouseout en profile pic
    if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
      $profileAudio.volume = 0.5;
      fadeInOut($profileAudio);
      matrixBg(false);
      clearTimeout(timerMsje);
    }
  });

  //Long press en mobile, click derecho en pc
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    //Click derecho en profile pic
    if (event.target.matches('img#profile-pic')) {
      startQuoteMode();
    }
  });
});
