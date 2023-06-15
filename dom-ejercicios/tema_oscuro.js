export default function darkTheme(btn, classDark) {
    const $themeBtn = document.querySelector(btn),
        $selectors = document.querySelectorAll("[data-dark]"),
        $formSVG = document.getElementById("form-svg");

    const sun = "☀️", moon = "🌙";

    const darkMode = () => {//for each para que recorra el nodelist que en este caso es solo el html con el data attribute "data-dark"
        $selectors.forEach((el) => el.classList.add(classDark)); //De esta forma podría agregar el data-dark a cualquier etiqueta que quisiera
        $themeBtn.textContent = sun;                                //aplicar el dark mode y sería mucho más simple
        localStorage.setItem("theme", "dark");
        $formSVG.setAttribute("src", "assets/loader-dark-mode.svg");
    }

    const lightMode = () => {
        $selectors.forEach((el) => el.classList.remove(classDark));
        $themeBtn.textContent = moon;
        localStorage.setItem("theme", "light");
        $formSVG.setAttribute("src", "assets/loader.svg");
    }


    document.addEventListener("click", (e) => {
        if (e.target.matches(btn)) {
            if ($themeBtn.textContent === moon) {
                darkMode();
            } else {
                lightMode();
            }
        }
    });

    document.addEventListener("DOMContentLoaded", (e) => {
        // console.log(localStorage.getItem("theme"))
        switch (localStorage.getItem("theme")) {
            case null:
                localStorage.setItem("theme", "light");
                break
            case "light":
                lightMode();
                break
            case "dark":
                darkMode();
        }
    });
}