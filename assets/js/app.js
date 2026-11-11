/* ----- Dropdown menu ----- */
// Henter menuknappen og menuen fra DOM'en
const menuButton = document.querySelector(".burgerMenuIcon");
const menuDropdown = document.querySelector("#navDropdown");

// Koden kører kun, hvis siden har en mobilmenu
if (menuButton && menuDropdown) {
    // Henter ikonet inde i knappen – det skifter senere mellem burger og kryds
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

    // Tilføjer en eventlistener, der lytter efter klik på knappen – åbner menuen, hvis den er lukket, og lukker den, hvis den er åben
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

// Venter, til browseren har vist sektionerne med klassen "reveal" på skærmen, før observeren begynder at holde øje
// Ellers bliver den første sektion bare vist med det samme, fordi der ikke er noget "før" at fade ind fra
// To requestAnimationFrame inde i hinanden gør, at skærmen er opdateret mindst én gang imellem
// Kilde: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
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
    // Finder knappen, teksten, billedet og ikonet inde i det punkt, der skal åbnes eller lukkes
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
// Kilde: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin 
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

// Koden kører kun, hvis siden har en cirkel
if (cursor) {
    // Gemmer musens placering
    const mouse = { x: 300, y: 300 };

    // Gemmer cirklens placering
    const pos = { x: 0, y: 0 };

    // Hvor stor en del af afstanden cirklen flytter sig hver gang – mellem 0 og 1, jo lavere tallet er, jo større forsinkelse giver det
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

        // Viser cirklen, når musen har bevæget sig – i CSS'en er den usynlig fra start
        cursor.classList.add("is-visible");

        // Cirklen vokser, når musen er over et link eller en knap – closest tjekker, om elementet er, eller ligger inde i, et link eller en knap
        cursor.classList.toggle("is-hovering", e.target.closest("a, button") !== null);
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
}

/* ----- Billed-modal ----- */
/* Kilde: https://www.w3schools.com/howto/howto_css_modal_images.asp */
// Henter modalen fra DOM'en
const imageModal = document.querySelector(".image-modal");

// Koden kører kun på sider med en modal
if (imageModal) {
    // Billedet, krydset og billedteksten inde i modalen gemmes i variabler
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
            // Hvis ovenstående er sandt, køres moveZoom(e), så zoomet følger musen
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

/* ----- Typing-effekt i kodekortet på forsiden ----- */
//  Koden i kortet bliver skrevet ét bogstav ad gangen. Inspiration: https://www.w3schools.com/howto/howto_js_typewriter.asp

// Henter alle linjerne i kodekortet. Kortet findes kun på forsiden, så på de andre sider er listen tom
const codeLines = document.querySelectorAll(".profile-code .code-line");

// Koden kører kun, hvis der er linjer – length er mere end 0
if (codeLines.length) {
    // const, fordi tallet aldrig ændres – tid mellem hvert bogstav i millisekunder. Jo højere tal, jo langsommere
    const typingSpeed = 130;

    // Et tomt array, som bliver fyldt med alle tekststykkerne i kortet i den rækkefølge, de skal skrives
    const parts = [];

    // Gennemgår hver linje i kortet
    codeLines.forEach((line) => {
        // childNodes er alt indhold i linjen – både almindelig tekst og <span>'erne med farve
        line.childNodes.forEach((node) => {
            // Finder alle steder med et eller flere mellemrum, tabs eller linjeskift, og erstatter dem med ét mellemrum
            const text = node.textContent.replace(/\s+/g, " ");

            // trim() fjerner mellemrum i begge ender
            if (text.trim()) {
                // Gemmer element, text og line i et objekt
                // element er selve stykket på siden, hvor teksten skal skrives
                // text er den fulde tekst, der skal skrives
                // line er den linje, stykket ligger på, så markøren kan flyttes derhen
                parts.push({ element: node, text: text, line: line });
            }

            // Tømmer stykket på siden, så det kan skrives igen bogstav for bogstav
            node.textContent = "";
        });
    });

    let partIndex = 0; // Nummeret på det stykke der bliver skrevet nu 
    let characterIndex = 0; // Hvor mange bogstaver af stykket der vises lige nu

    // Funktionen skriver ét bogstav og kalder så sig selv igen med setTimeout
    function writeCode() {
        // Henter det stykke, vi er nået til
        const part = parts[partIndex];

        // Markøren er et "|" i CSS'en, som vises efter den linje, der har klassen is-typing
        // Først fjernes klassen fra den linje, der har den nu – ?. betyder "hvis der er en", så første gang springes det bare over
        document.querySelector(".code-line.is-typing")?.classList.remove("is-typing");

        // Derefter får den linje, vi skriver på, klassen – så flytter markøren med ned på næste linje
        part.line.classList.add("is-typing");

        // Tæller ét bogstav op
        characterIndex++;

        // slice(0, characterIndex) tager teksten fra starten og frem til characterIndex
        part.element.textContent = part.text.slice(0, characterIndex);

        // Er hele stykket skrevet?
        if (characterIndex === part.text.length) {
            // Var det også det sidste stykke i parts? length - 1, fordi arrays tæller fra 0
            if (partIndex === parts.length - 1) {
                // Klassen is-done på kortet starter blinke-animationen på markøren i CSS'en
                document.querySelector(".profile-code").classList.add("is-done");

                // return stopper funktionen, så setTimeout nedenfor ikke kører igen – effekten er færdig
                return;
            }

            // Ellers går vi videre til næste stykke og starter fra dets første bogstav
            partIndex++;
            characterIndex = 0;
        }

        // Kører funktionen igen efter typingSpeed millisekunder – så kommer næste bogstav
        setTimeout(writeCode, typingSpeed);
    }

    // Starter først, hvis der faktisk er noget at skrive
    if (parts.length) {
        // Venter et halvt sekund, så siden når at vise sig, før der skrives
        setTimeout(writeCode, 500);
    }
}