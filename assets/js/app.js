/* ----- Dropdown menu ----- */
// Henter menuknappen og menuen fra DOM'en
const menuButton = document.querySelector(".burgerMenuIcon");
const menuDropdown = document.querySelector("#navDropdown");

// Koden kører kun, hvis siden har en mobilmenu
if (menuButton && menuDropdown) {
    // Ikonet skifter mellem burger ikon og kryds ikon.
    const menuIcon = menuButton.querySelector("i");

    // Gemmer indholdet bag menuen, som ikke må kunne nås, mens menuen er åben, i en variabel.
    const backgroundContent = document.querySelectorAll("main, footer");

    // Åbner eller lukker menuen – open er true eller false
    function setMenu(open) {
        // Fortæller skærmlæsere, om menuen er åben
        menuButton.setAttribute("aria-expanded", String(open));

        // Knappens tekst til skærmlæsere skifter efter, om menuen er åben
        menuButton.setAttribute(
            "aria-label",
            open ? "Luk menu" : "Åbn menu"
        );

        // Viser eller skjuler menuen
        menuDropdown.classList.toggle("show", open);

        // Lukket menu kan ikke nås med tastaturet
        menuDropdown.inert = !open;

        // Skifter mellem burger-ikon og kryds
        menuIcon.classList.toggle("fa-bars", !open);
        menuIcon.classList.toggle("fa-xmark", open);

        // Stopper scroll på siden bag menuen
        document.body.classList.toggle("menu-open", open);

        // Indholdet bag menuen kan ikke nås, mens menuen er åben
        backgroundContent.forEach((element) => {
            element.inert = open;
        });
    }

    // Tilføjer et eventlistener der lytter efter et Klik på knappen, der åbner menuen, hvis den er lukket, og lukker den, hvis den er åben
    menuButton.addEventListener("click", () => {
        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        setMenu(!isOpen);
    });

    // Lukker menuen, når man klikker på et link i den
    menuDropdown.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenu(false);
        }
    });

    // Lukker menuen med Escape-tasten
    document.addEventListener("keydown", (event) => {
        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        // Gør ingenting, hvis menuen allerede er lukket
        if (!isOpen) return;

        if (event.key === "Escape") {
            setMenu(false);

            // Sender fokus tilbage til knappen, så tastaturbrugere ikke mister deres plads
            menuButton.focus();
        }
    });
}

/* ----- Markér den aktuelle side i navigationen ----- */
// Finder filnavnet på den side, man er på, fx "kontakt.html" – forsiden har intet filnavn, så den bliver "index.html"
const currentPage = window.location.pathname.split("/").pop() || "index.html";

// Henter alle links i både mobil- og desktopnavigationen
const navLinks = document.querySelectorAll(
    ".nav-list a, .nav-desktop a"
);

navLinks.forEach((link) => {
    // Finder filnavnet, linket peger på
    const linkPage = new URL(link.href).pathname.split("/").pop();

    // Linket til den side, man er på, får aria-current, som CSS'en bruger til at sætte en streg under
    if (linkPage === currentPage) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});

/* ----- Fade-in animation på sektioner ----- */
/* Kilde: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */
// Henter alle sektioner i main
const revealSections = document.querySelectorAll("main section");

// Holder øje med, hvornår sektionerne er på skærmen
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Vis sektionen, når den er på skærmen, og skjul den igen, når den er helt ude af skærmen
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
}, { rootMargin: "0px 0px -15% 0px" }); // Sektionen skal være 15 % inde på skærmen, før den fader ind

// Skjul alle sektioner fra start
revealSections.forEach((section) => {
    section.classList.add("reveal");
});

// Vent to frames, så browseren når at tegne sektionerne skjult, før animationen starter
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        revealSections.forEach((section) => {
            revealObserver.observe(section);
        });
    });
});

/* ----- Accordions ----- */
// Kun ét punkt i "Det bidrager jeg med" kan være åbent ad gangen
const accordions = document.querySelectorAll(".accordion");

// Åbn eller luk ét punkt – open er true eller false
function setAccordion(accordion, open) {
    const button = accordion.querySelector(".accordion-title");
    const panel = accordion.querySelector(".accordion-panel");
    const media = accordion.querySelector(".accordion-media");
    const icon = button.querySelector("i");

    // Fortæl skærmlæsere, om punktet er åbent
    button.setAttribute("aria-expanded", String(open));

    // Klassen is-open styrer, at indholdet glider op og ned i CSS'en
    accordion.classList.toggle("is-open", open);

    // Lukket indhold kan ikke nås med tastaturet
    panel.inert = !open;

    // Billedet åbner og lukker sammen med teksten
    if (media) {
        media.inert = !open;
    }

    // Skift mellem plus og minus
    icon.classList.toggle("fa-plus", !open);
    icon.classList.toggle("fa-minus", open);
}

accordions.forEach((accordion) => {
    const button = accordion.querySelector(".accordion-title");

    button.addEventListener("click", () => {
        // Tjekker, om punktet allerede er åbent
        const isOpen = button.getAttribute("aria-expanded") === "true";

        // Luk alle de andre punkter først
        accordions.forEach((otherAccordion) => {
            if (otherAccordion !== accordion) {
                setAccordion(otherAccordion, false);
            }
        });

        // Åbn eller luk det punkt, der blev klikket på
        setAccordion(accordion, !isOpen);
    });
});

/* ----- Til toppen knap ----- */
/* Kilde: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin */
// Skjul "Til toppen", mens den første sektion er på skærmen
const toTop = document.querySelector(".to-top");
const heroSection = document.querySelector("main section");

// Koden kører kun, hvis siden har en knap og en sektion
if (toTop && heroSection) {
    // Skjult fra start, så den ikke blinker frem, når siden åbner
    toTop.classList.add("is-hidden");

    // Knappen er skjult, så længe den første sektion er på skærmen
    const toTopObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            toTop.classList.toggle("is-hidden", entry.isIntersecting);
        });
    }, { rootMargin: "0px 0px -15% 0px" }); // Knappen kommer frem, når sektionen er scrollet godt op

    toTopObserver.observe(heroSection);
}

/* ----- Custom cursor ----- */
/* Inspiration: https://codepen.io/gabrielcojea/pen/dyGKKXY?editors=1010 */

// Henter cirklen fra DOM'en
const cursor = document.querySelector(".cursor");

// Gemmer musens placering
const mouse = { x: 300, y: 300 };

// Gemmer cirklens placering – den halter lidt efter musen
const pos = { x: 0, y: 0 };

// Hvor stor en del af afstanden cirklen flytter sig hver gang – mellem 0 og 1, lavere tal giver mere forsinkelse
const speed = 0.1;

// Flytter cirklen et stykke hen mod musen
const updatePosition = () => {
    // Afstanden til musen ganges med speed, så cirklen kun flytter sig 10 % af vejen
    pos.x += (mouse.x - pos.x) * speed;
    pos.y += (mouse.y - pos.y) * speed;

    // Flytter cirklen til den nye position
    cursor.style.transform = "translate3d(" + pos.x + "px, " + pos.y + "px, 0)";
};

// Gemmer musens position fra eventet i mouse
const updateCoordinates = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};

// Kører updateCoordinates, hver gang musen bevæger sig
window.addEventListener("mousemove", updateCoordinates);

// Kører igen og igen, så cirklen hele tiden glider efter musen
function loop() {
    updatePosition();

    // Beder browseren om at køre loop igen før næste billede tegnes
    requestAnimationFrame(loop);
}

// Starter løkken
requestAnimationFrame(loop);

/* ----- Billed-modal ----- */
/* Kilde: https://www.w3schools.com/howto/howto_css_modal_images.asp */
// Henter modalen fra DOM'en
const imageModal = document.querySelector(".image-modal");

// Koden kører kun på sider med en modal
if (imageModal) {
    // Billedet, krydset og billedteksten inde i modalen
    const modalImg = imageModal.querySelector(".image-modal-img");
    const closeButton = imageModal.querySelector(".image-modal-close");
    const modalCaption = imageModal.querySelector(".image-modal-caption");

    // Åbner modalen med det billede, man trykker på
    document.querySelectorAll(".image-zoom").forEach((button) => {
        button.addEventListener("click", () => {
            const img = button.querySelector("img");

            // Bruger modal-billedet fra data-full, hvis der er et, ellers det samme som på siden
            modalImg.src = img.dataset.full || img.src;
            modalImg.alt = img.alt;

            // Billedteksten under billedet er billedets alt-tekst
            modalCaption.textContent = img.alt;

            // Åbner modalen
            imageModal.showModal();
        });
    });

    // Lukker med krydset
    closeButton.addEventListener("click", () => {
        imageModal.close();
    });

    // Lukker, når man trykker uden for billedet – altså på selve baggrunden
    imageModal.addEventListener("click", (e) => {
        if (e.target === imageModal) {
            imageModal.close();
        }
    });

    // Klik på billedet zoomer ind det sted, man klikker
    modalImg.addEventListener("click", (e) => {
        moveZoom(e);
        modalImg.classList.toggle("is-zoomed");
    });

    // Mens billedet er zoomet, følger det musen
    modalImg.addEventListener("mousemove", (e) => {
        // Tjekker, om billedet har klassen is-zoomed. Den får klassen, når man klikker på det.
        if (modalImg.classList.contains("is-zoomed")) {
            //Hvis overstående er sandt køres moveZoom(e), så zoomet følger musen
            moveZoom(e);
        }
    });

    // Finder ud af, hvor på billedet musen er i procent, og zoomer ind omkring det punkt
    function moveZoom(e) {
        // Musens afstand fra billedets venstre kant og top, delt med billedets bredde og højde
        const x = (e.offsetX / modalImg.offsetWidth) * 100;
        const y = (e.offsetY / modalImg.offsetHeight) * 100;

        // Zoomet tager udgangspunkt i det punkt
        modalImg.style.transformOrigin = `${x}% ${y}%`;
    }

    // Zoomer ud igen, når modalen lukkes
    imageModal.addEventListener("close", () => {
        modalImg.classList.remove("is-zoomed");
    });
}