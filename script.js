/* =========================================================
   SCRAPBOOK JAVASCRIPT
========================================================= */


/* ================= BASIC STATE ================= */

let currentPage = 0;

let isAnimating = false;

const totalPages = 8;

let pages = [];

let musicPlaying = false;

let slideshowInterval = null;

const SLIDE_DURATION = 3000;


/* ================= ENGAGEMENT PHOTOS ================= */

const engagementPhotos = [

    "foto03.jpg",
    "foto04.jpg",
    "foto05.jpg",
    "foto06.jpg",
    "foto07.jpg",
    "foto08.jpg",

    "foto09.jpg",
    "foto10.jpg",
    "foto11.jpg",
    "foto12.jpg",
    "foto13.jpg",
    "foto14.jpg",

    "foto15.jpg",
    "foto16.jpg",
    "foto17.jpg",
    "foto19.jpg",
    "foto20.jpg",
    "foto21.jpg",

    "foto22.jpg",
    "foto23.jpg",
    "foto24.jpg",
    "foto25.jpg",
    "foto26.jpg",
    "foto27.jpg",

    "foto28.jpg",
    "foto29.jpg"

];


/* ================= SIX PHOTO SLIDESHOW ================= */

const SLIDES_VISIBLE = 6;

let currentSlideSet = [
    0,
    1,
    2,
    3,
    4,
    5
];


/* ================= PAGE LOAD ================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hidden");
        }

        initBook();

        buildSixPhotoSlideshow();

        buildDots();

        updateUI();

    }, 1800);

});


/* ================= START EXPERIENCE ================= */

function startExperience() {

    const overlay = document.getElementById("musicOverlay");

    const music = document.getElementById("bgMusic");

    if (overlay) {
        overlay.classList.add("hidden");
    }

    if (music) {

        music.volume = 0.4;

        music.play()
            .then(() => {
                musicPlaying = true;
            })
            .catch(() => {
                musicPlaying = false;
            });

    }

}


/* ================= INIT BOOK ================= */

function initBook() {

    pages = Array.from(
        document.querySelectorAll(".page")
    );


    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {
            nextPage();
        }

        if (event.key === "ArrowLeft") {
            prevPage();
        }

        if (event.key === "Escape") {

            closeImage();
            closeLetter();

        }

    });


    let touchStartX = 0;

    let touchStartY = 0;


    document.addEventListener(
        "touchstart",
        (event) => {

            if (
                event.target.closest(".letter-modal") ||
                event.target.closest(".lightbox")
            ) {
                return;
            }

            touchStartX = event.changedTouches[0].screenX;

            touchStartY = event.changedTouches[0].screenY;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        (event) => {

            if (
                event.target.closest(".letter-modal") ||
                event.target.closest(".lightbox")
            ) {
                return;
            }

            const touchEndX =
                event.changedTouches[0].screenX;

            const touchEndY =
                event.changedTouches[0].screenY;


            const diffX =
                touchEndX - touchStartX;

            const diffY =
                touchEndY - touchStartY;


            if (
                Math.abs(diffX) > 60 &&
                Math.abs(diffX) > Math.abs(diffY)
            ) {

                if (diffX < 0) {
                    nextPage();
                } else {
                    prevPage();
                }

            }

        },
        {
            passive: true
        }
    );

}


/* ================= NEXT PAGE ================= */

function nextPage() {

    if (isAnimating) {
        return;
    }

    if (currentPage >= totalPages - 1) {
        return;
    }

    goToPage(currentPage + 1, "next");

}


/* ================= PREVIOUS PAGE ================= */

function prevPage() {

    if (isAnimating) {
        return;
    }

    if (currentPage <= 0) {
        return;
    }

    goToPage(currentPage - 1, "prev");

}


/* ================= GO TO PAGE ================= */

function goToPage(targetPage, direction = "next") {

    if (isAnimating) {
        return;
    }

    if (
        targetPage < 0 ||
        targetPage >= totalPages
    ) {
        return;
    }


    if (targetPage === currentPage) {
        return;
    }


    isAnimating = true;


    const current = pages[currentPage];

    const target = pages[targetPage];


    current.classList.remove("active");

    current.classList.add(
        direction === "next"
            ? "slide-left"
            : "slide-right"
    );


    target.classList.add("active");


    currentPage = targetPage;


    updateUI();


    setTimeout(() => {

        current.classList.remove(
            "slide-left",
            "slide-right"
        );

        isAnimating = false;

    }, 700);

}


/* ================= UPDATE UI ================= */

function updateUI() {

    const currentNum =
        document.getElementById("currentNum");

    const totalNum =
        document.getElementById("totalNum");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");


    if (currentNum) {
        currentNum.textContent =
            currentPage + 1;
    }


    if (totalNum) {
        totalNum.textContent =
            totalPages;
    }


    if (prevBtn) {

        prevBtn.disabled =
            currentPage === 0;

    }


    if (nextBtn) {

        nextBtn.disabled =
            currentPage === totalPages - 1;

    }


    document
        .querySelectorAll(".nav-dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        });

}


/* ================= DOTS ================= */

function buildDots() {

    const container =
        document.getElementById("navDots");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    for (
        let i = 0;
        i < totalPages;
        i++
    ) {

        const dot =
            document.createElement("button");

        dot.className =
            "nav-dot";


        if (i === 0) {
            dot.classList.add("active");
        }


        dot.setAttribute(
            "aria-label",
            `Go to page ${i + 1}`
        );


        dot.addEventListener(
            "click",
            () => {

                if (i === currentPage) {
                    return;
                }


                const direction =
                    i > currentPage
                        ? "next"
                        : "prev";


                goToPage(i, direction);

            }
        );


        container.appendChild(dot);

    }

}


/* =========================================================
   SIX PHOTO ENGAGEMENT SLIDESHOW
========================================================= */

function buildSixPhotoSlideshow() {

    const boxes = [

        document.getElementById("slideBox1"),
        document.getElementById("slideBox2"),
        document.getElementById("slideBox3"),
        document.getElementById("slideBox4"),
        document.getElementById("slideBox5"),
        document.getElementById("slideBox6")

    ];


    boxes.forEach((box, index) => {

        if (!box) {
            return;
        }


        box.innerHTML = "";


        const img =
            document.createElement("img");


        const photoIndex =
            currentSlideSet[index];


        const photo =
            engagementPhotos[photoIndex];


        img.src =
            `fotot/${photo}`;


        img.alt =
            `Engagement memory ${index + 1}`;


        img.classList.add("active");


        img.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                openImage(
                    `fotot/${engagementPhotos[currentSlideSet[index]]}`
                );

            }
        );


        box.appendChild(img);

    });


    startSixPhotoSlideshow();

}


/* ================= START SLIDESHOW ================= */

function startSixPhotoSlideshow() {

    clearInterval(slideshowInterval);


    slideshowInterval =
        setInterval(() => {

            const boxes = [

                document.getElementById("slideBox1"),
                document.getElementById("slideBox2"),
                document.getElementById("slideBox3"),
                document.getElementById("slideBox4"),
                document.getElementById("slideBox5"),
                document.getElementById("slideBox6")

            ];


            const totalPhotos =
                engagementPhotos.length;


            const nextStart =
                (
                    currentSlideSet[0] +
                    SLIDES_VISIBLE
                ) % totalPhotos;


            currentSlideSet =
                Array.from(
                    {
                        length: SLIDES_VISIBLE
                    },
                    (_, index) => {

                        return (
                            nextStart +
                            index
                        ) % totalPhotos;

                    }
                );


            boxes.forEach(
                (box, index) => {

                    if (!box) {
                        return;
                    }


                    const img =
                        box.querySelector("img");


                    if (!img) {
                        return;
                    }


                    img.classList.remove("active");


                    setTimeout(() => {

                        const photo =
                            engagementPhotos[
                                currentSlideSet[index]
                            ];


                        img.src =
                            `fotot/${photo}`;


                        img.classList.add("active");

                    }, 180);

                }
            );


        }, SLIDE_DURATION);

}


/* ================= IMAGE LIGHTBOX ================= */

function openImage(src) {

    const lightbox =
        document.getElementById("lightbox");

    const image =
        document.getElementById("lightboxImg");


    if (!lightbox || !image) {
        return;
    }


    image.src = src;


    lightbox.classList.add("show");


    document.body.classList.add(
        "modal-open"
    );

}


/* ================= CLOSE IMAGE ================= */

function closeImage() {

    const lightbox =
        document.getElementById("lightbox");


    if (!lightbox) {
        return;
    }


    lightbox.classList.remove("show");


    document.body.classList.remove(
        "modal-open"
    );

}


/* ================= LETTER ================= */

function openLetter() {

    const modal =
        document.getElementById("letterModal");


    if (!modal) {
        return;
    }


    modal.classList.add("show");


    document.body.classList.add(
        "modal-open"
    );

}


/* ================= CLOSE LETTER ================= */

function closeLetter(event) {

    if (
        event &&
        event.target &&
        event.target.id !== "letterModal"
    ) {
        return;
    }


    const modal =
        document.getElementById("letterModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("show");


    document.body.classList.remove(
        "modal-open"
    );

}


/* ================= COUNTER ================= */

function updateCounter() {

    const startDate =
        new Date("2025-10-04T00:00:00");


    const now =
        new Date();


    let difference =
        now.getTime() -
        startDate.getTime();


    if (difference < 0) {
        difference = 0;
    }


    const seconds =
        Math.floor(
            difference / 1000
        );


    const minutes =
        Math.floor(
            seconds / 60
        );


    const hours =
        Math.floor(
            minutes / 60
        );


    const days =
        Math.floor(
            hours / 24
        );


    const remainingHours =
        hours % 24;


    const remainingMinutes =
        minutes % 60;


    const remainingSeconds =
        seconds % 60;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (daysElement) {
        daysElement.textContent =
            days.toLocaleString();
    }


    if (hoursElement) {
        hoursElement.textContent =
            String(
                remainingHours
            ).padStart(2, "0");
    }


    if (minutesElement) {
        minutesElement.textContent =
            String(
                remainingMinutes
            ).padStart(2, "0");
    }


    if (secondsElement) {
        secondsElement.textContent =
            String(
                remainingSeconds
            ).padStart(2, "0");
    }

}


updateCounter();

setInterval(
    updateCounter,
    1000
);


/* ================= MUSIC TOGGLE ================= */

function toggleMusic() {

    const music =
        document.getElementById("bgMusic");


    if (!music) {
        return;
    }


    if (music.paused) {

        music.play()
            .then(() => {
                musicPlaying = true;
            })
            .catch(() => {});

    } else {

        music.pause();

        musicPlaying = false;

    }

}


/* ================= CLICK SOUND ================= */

function playClick() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return;
        }


        const context =
            new AudioContext();


        const oscillator =
            context.createOscillator();


        const gain =
            context.createGain();


        oscillator.frequency.value =
            500;


        gain.gain.setValueAtTime(
            0.05,
            context.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + 0.08
        );


        oscillator.connect(gain);

        gain.connect(
            context.destination
        );


        oscillator.start();

        oscillator.stop(
            context.currentTime + 0.08
        );

    } catch (error) {

        console.log(
            "Click sound unavailable."
        );

    }

}