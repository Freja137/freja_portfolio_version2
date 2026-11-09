/* Dropdown menu */
const menuButton = document.querySelector(".burgerMenuIcon");
const menuDropdown = document.querySelector("#navDropdown");

if (menuButton && menuDropdown) {
    const menuIcon = menuButton.querySelector("i");
    const backgroundContent = document.querySelectorAll("main, footer");

    function setMenu(open) {
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute(
            "aria-label",
            open ? "Luk menu" : "Åbn menu"
        );

        menuDropdown.classList.toggle("show", open);
        menuDropdown.inert = !open;

        menuIcon.classList.toggle("fa-bars", !open);
        menuIcon.classList.toggle("fa-xmark", open);

        document.body.classList.toggle("menu-open", open);

        backgroundContent.forEach((element) => {
            element.inert = open;
        });
    }

    menuButton.addEventListener("click", () => {
        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        setMenu(!isOpen);
    });

    menuDropdown.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenu(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (!isOpen) return;

        if (event.key === "Escape") {
            setMenu(false);
            menuButton.focus();
        }
    });
}

/* Markér den aktuelle side i navigationen */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

const navLinks = document.querySelectorAll(
    ".nav-list a, .nav-desktop a"
);

navLinks.forEach((link) => {
    const linkPage = new URL(link.href).pathname.split("/").pop();

    if (linkPage === currentPage) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});

// Alle sektioner fader ind, når de kommer ind på skærmen
/* https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */
const revealSections = document.querySelectorAll("main section");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Vis sektionen, når den er på skærmen, og skjul den igen, når den er helt ude af skærmen
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
}, { rootMargin: "0px 0px -15% 0px" });

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

// Accordions – kun ét punkt i "Det bidrager jeg med" kan være åbent ad gangen
const accordions = document.querySelectorAll(".accordion");

// Åbn eller luk ét punkt
function setAccordion(accordion, open) {
    const button = accordion.querySelector(".accordion-title");
    const panel = accordion.querySelector(".accordion-panel");
    const icon = button.querySelector("i");

    // Fortæl skærmlæsere, om punktet er åbent
    button.setAttribute("aria-expanded", String(open));
    accordion.classList.toggle("is-open", open);

    // Lukket indhold kan ikke nås med tastaturet
    panel.inert = !open;

    // Skift mellem plus og minus
    icon.classList.toggle("fa-plus", !open);
    icon.classList.toggle("fa-minus", open);
}

accordions.forEach((accordion) => {
    const button = accordion.querySelector(".accordion-title");

    button.addEventListener("click", () => {
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

// Skjul "Til toppen", mens hero-sektionen er på skærmen
const toTop = document.querySelector(".to-top");
const heroSection = document.querySelector("main section");

if (toTop && heroSection) {
    // Skjult fra start, så den ikke blinker frem, når siden åbner
    toTop.classList.add("is-hidden");

    const toTopObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            toTop.classList.toggle("is-hidden", entry.isIntersecting);
        });
    }, { rootMargin: "0px 0px -60% 0px" });

    // kilde: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin

    toTopObserver.observe(heroSection);
}

/* ----- Custom cursor ----- */
const cursor = document.querySelector(".cursor");

// Kun på enheder med mus, og ikke hvis brugeren har slået bevægelse fra
const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cursor && hasMouse && !reduceMotion) {
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const speed = 0.15; // mellem 0 og 1 – lavere tal giver mere forsinkelse

    // Gemmer musens position
    window.addEventListener("mousemove", (e) => {
        // Første gang starter cirklen præcis ved musen
        if (!cursor.classList.contains("is-visible")) {
            pos.x = e.clientX;
            pos.y = e.clientY;
            cursor.classList.add("is-visible");
        }

        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Skjuler cirklen, når musen forlader vinduet
    document.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-visible");
    });

    // Cirklen vokser over links og knapper
    document.addEventListener("mouseover", (e) => {
        const isLink = e.target.closest("a, button");
        cursor.classList.toggle("is-hovering", Boolean(isLink));
    });

    // Cirklen glider efter musen
    function moveCursor() {
        pos.x += (mouse.x - pos.x) * speed;
        pos.y += (mouse.y - pos.y) * speed;
        cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        requestAnimationFrame(moveCursor);
    }

    requestAnimationFrame(moveCursor);
}
