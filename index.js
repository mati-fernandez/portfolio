
document.addEventListener("DOMContentLoaded", e => {
  const $counter = document.querySelector("#counter"),
    $message = document.querySelector("#prevent-counter-interaction");
  setTimeout(()=> {
    $message.style.opacity = 0;
  },2000)
  document.addEventListener("keyup", e => {
    if (e.key === "c" && e.altKey) {
      console.log("hola")
      $counter.style.opacity = 1000;
      setTimeout(() => {
        $counter.style.opacity = 0;
      }, 1000);
    }
  });

  document.addEventListener("mouseover", e=> {
    if (e.target.matches("#prevent-counter-interaction")) $counter.style.opacity = 1000;
  });
  document.addEventListener("mouseout", e=> {
    if (e.target.matches("#prevent-counter-interaction")) $counter.style.opacity = 0;
  });


  const profilePicSound = () => {
    let soundTempo;
    const $audioToggleBtn = document.querySelector("#audio-toggle"),
    audioOn = "🔊", audioOff = "🔇",
    $sound = document.querySelector(".profile-audio");
    document.addEventListener("click", (e) => {
        if (e.target.matches("#audio-toggle")) {
            if ($audioToggleBtn.textContent === audioOff) {
              $audioToggleBtn.textContent = audioOn;
              document.querySelector(".fa-arrow-up").style.display = "none";
            } else {
              $audioToggleBtn.textContent = audioOff;
            }
        }
      });
    document.addEventListener("mouseover", (e) => {
        if (e.target.matches("img#profile-pic")) {
            if ($audioToggleBtn.textContent == audioOn) {
              $sound.play();
            }
            let timerMsje = setTimeout(()=>{
              document.getElementById("msje-condicional").style.display = "none";
            },1500);
          document.addEventListener("mouseout", e => {
            $sound.pause();
            clearTimeout(timerMsje);
          });
        };
      });
  }
  document.addEventListener("click", (e) => {
    if (e.target.matches("#first-page")) {
        document.querySelector(".seccion-aptitudes").scrollIntoView();
    };
    if (e.target.matches("#second-page")) {
        document.querySelector(".seccion-tecnologias").scrollIntoView();
    };
  });
  profilePicSound();
  document.addEventListener("click", (e) => {
  if (e.target.matches("#a-ver")) {
      window.scrollTo({
          behavior: "smooth",
          top: 0
      });
    }
  });

}); 
