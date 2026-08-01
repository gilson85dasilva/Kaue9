/* =====================================================
   KAUÊ GOMES — SEASON 9
===================================================== */


/* =====================================================
   LOADING
===================================================== */

window.addEventListener(
    "load",
    () => {

        const loading =
            document.getElementById(
                "loadingScreen"
            );

        setTimeout(
            () => {

                loading.classList.add(
                    "hidden"
                );

            },
            800
        );

    }
);



/* =====================================================
   AOS
===================================================== */

if (
    typeof AOS !==
    "undefined"
) {

    AOS.init({

        once: true,

        duration: 900,

        easing: "ease-out-cubic"

    });

}



/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );


if (
    menuToggle &&
    navMenu
) {

    const menuIcon =
        menuToggle.querySelector(
            "i"
        );


    function setMenuState(isOpen) {

        navMenu.classList.toggle(
            "active",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuIcon.className =
            isOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";

    }


    menuToggle.addEventListener(
        "click",
        () => {

            setMenuState(
                !navMenu.classList.contains(
                    "active"
                )
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !navMenu.classList.contains(
                    "active"
                )
            ) {

                return;

            }

            const clickedInsideMenu =
                navMenu.contains(
                    event.target
                );

            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                setMenuState(false);

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                setMenuState(false);

            }

        }
    );

}





/* FECHAR MENU */

document
    .querySelectorAll(
        ".nav-menu a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    if (
                        menuToggle &&
                        navMenu
                    ) {

                        navMenu.classList.remove(
                            "active"
                        );

                        document.body.classList.remove(
                            "menu-open"
                        );

                        menuToggle
                            .querySelector("i")
                            .className =
                            "fa-solid fa-bars";

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );

        }
    );



/* =====================================================
   HEADER — Ocultar ao Scroll
===================================================== */

let lastScrollY =
    window.scrollY;

const header =
    document.getElementById(
        "header"
    );


window.addEventListener(
    "scroll",
    () => {

        const currentScrollY =
            window.scrollY;


        /* Só oculta depois de 80px de scroll */

        if (
            currentScrollY > 80
        ) {

            if (
                currentScrollY >
                lastScrollY
            ) {

                /* Rolando para baixo — esconde */

                header.classList.add(
                    "header-hidden"
                );

            } else {

                /* Rolando para cima — mostra */

                header.classList.remove(
                    "header-hidden"
                );

            }

        } else {

            header.classList.remove(
                "header-hidden"
            );

        }


        lastScrollY =
            currentScrollY;

    }
);



/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById(
        "backgroundMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


let musicPlaying =
    false;

let autoplayAttempted =
    false;


/* Função para iniciar a música */

function playMusic() {

    if (
        musicPlaying
    ) {

        return;

    }

    music.play()
        .then(
            () => {

                musicPlaying =
                    true;

                musicButton.classList.add(
                    "playing"
                );

                const icon =
                    musicButton.querySelector(
                        "i"
                    );

                icon.className =
                    "fa-solid fa-volume-high";

                /* A música começou — não precisamos
                   mais dos listeners de interação */

                removeMusicListeners();

            }
        )
        .catch(
            error => {

                console.log(
                    "Autoplay bloqueado pelo navegador. Aguardando interação do usuário.",
                    error
                );

            }
        );

}


/* Função para pausar a música */

function pauseMusic() {

    music.pause();

    musicPlaying =
        false;

    musicButton.classList.remove(
        "playing"
    );

    const icon =
        musicButton.querySelector(
            "i"
        );

    icon.className =
        "fa-solid fa-volume-xmark";

}


/* Tocar automaticamente ao carregar a página */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                autoplayAttempted =
                    true;

                playMusic();

            },
            500
        );

    }
);


/*
   Se o navegador bloquear o autoplay,
   inicia a música na primeira interação
   do usuário (clique, toque ou tecla).
*/

function startOnFirstInteraction() {

    if (
        autoplayAttempted &&
        !musicPlaying
    ) {

        playMusic();

    }

}


/* Remove os listeners de interação após a
   música realmente começar a tocar. */

function removeMusicListeners() {

    document.removeEventListener(
        "pointerdown",
        startOnFirstInteraction
    );

    document.removeEventListener(
        "touchstart",
        startOnFirstInteraction
    );

    document.removeEventListener(
        "keydown",
        startOnFirstInteraction
    );

}


/* Nota: não usamos "scroll" como interação,
   pois navegadores não liberam autoplay
   de áudio em resposta a scroll. */

document.addEventListener(
    "pointerdown",
    startOnFirstInteraction
);

document.addEventListener(
    "touchstart",
    startOnFirstInteraction
);

document.addEventListener(
    "keydown",
    startOnFirstInteraction
);


musicButton.addEventListener(
    "click",
    () => {

        if (
            musicPlaying
        ) {

            pauseMusic();

        } else {

            playMusic();

        }

    }
);



/* =====================================================
   COUNTDOWN
===================================================== */


/*
   DATA DO EVENTO

   06 de agosto de 2026

   Como o horário informado é
   "na hora do recreio", usamos
   10:00 como referência.

   Você pode alterar abaixo.
*/


const eventDate =
    new Date(
        "August 6, 2026 10:00:00"
    ).getTime();


function updateCountdown() {


    const now =
        new Date().getTime();


    const distance =
        eventDate - now;


    if (
        distance <= 0
    ) {

        document.getElementById(
            "days"
        ).innerText =
            "00";

        document.getElementById(
            "hours"
        ).innerText =
            "00";

        document.getElementById(
            "minutes"
        ).innerText =
            "00";

        document.getElementById(
            "seconds"
        ).innerText =
            "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            )
            /
            (
                1000 *
                60 *
                60
            )
        );


    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            )
            /
            (
                1000 *
                60
            )
        );


    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60
                )
            )
            /
            1000
        );


    document.getElementById(
        "days"
    ).innerText =
        String(days)
            .padStart(2, "0");


    document.getElementById(
        "hours"
    ).innerText =
        String(hours)
            .padStart(2, "0");


    document.getElementById(
        "minutes"
    ).innerText =
        String(minutes)
            .padStart(2, "0");


    document.getElementById(
        "seconds"
    ).innerText =
        String(seconds)
            .padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* =====================================================
   SWIPER — COVERFLOW 3D (Premium)
===================================================== */

if (
    typeof Swiper ===
    "undefined"
) {

    console.warn(
        "Swiper não carregou. Galeria desativada."
    );

} else {

const swiper =
    new Swiper(
        ".gallerySwiper",
        {

            loop: true,

            effect: "coverflow",

            grabCursor: true,

            speed: 700,

            centeredSlides: true,

            slidesPerView: "auto",

            spaceBetween: 20,

            coverflowEffect: {

                rotate: 10,

                stretch: 0,

                depth: 180,

                modifier: 1.2,

                slideShadows: false

            },

            autoplay: {

                delay: 4000,

                disableOnInteraction:
                    false,

                pauseOnMouseEnter: true

            },


            pagination: {

                el:
                    ".swiper-pagination",

                type: "fraction",

                formatFractionCurrent:
                    function (number) {
                        return String(number)
                            .padStart(2, "0");
                    },

                formatFractionTotal:
                    function (number) {
                        return String(number)
                            .padStart(2, "0");
                    }

            },


            navigation: {

                nextEl:
                    ".swiper-button-next",

                prevEl:
                    ".swiper-button-prev"

            },


            breakpoints: {

                768: {
                    slidesPerView: 1.3,
                    spaceBetween: 25,
                    coverflowEffect: {
                        rotate: 8,
                        stretch: 0,
                        depth: 200,
                        modifier: 1.3,
                        slideShadows: false
                    }
                },

                480: {
                    slidesPerView: 1.15,
                    spaceBetween: 15,
                    coverflowEffect: {
                        rotate: 5,
                        stretch: 0,
                        depth: 140,
                        modifier: 1.1,
                        slideShadows: false
                    }
                },

                360: {
                    slidesPerView: 1.1,
                    spaceBetween: 10,
                    coverflowEffect: {
                        rotate: 3,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false
                    }
                },

                0: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 80,
                        modifier: 0.9,
                        slideShadows: false
                    }
                }

            },


            on: {

                init: function () {

                    this.slides.forEach(
                        slide => {

                            slide.addEventListener(
                                "mouseenter",
                                () => {

                                    this.autoplay.stop();

                                }
                            );

                            slide.addEventListener(
                                "mouseleave",
                                () => {

                                    this.autoplay.start();

                                }
                            );

                        }
                    );

                }

            }

        }
    );

}
