/* Headerkomponent, kilde: https://vuejs.org/guide/essentials/component-basics */

// Finder filnavnet på den side, man er på
const currentPage = location.pathname.split("/").pop() || "index.html";

export const TheHeader = {
    setup() {
        // Tjekker om et link peger på den aktuelle side
        function isCurrent(page) {
            return currentPage === page ? "page" : null;
        }
        return { isCurrent };
    },

    template: `
        <header>
        <nav class="nav-mobile" aria-label="Mobilnavigation">
            <a class="site-logo" href="./index.html" aria-label="Freja Fischer – forside">
                FF.
            </a>

            <button class="burgerMenuIcon" type="button" aria-label="Åbn menu" aria-expanded="false"
                aria-controls="navDropdown">
                <i class="fa-solid fa-bars" aria-hidden="true"></i>
            </button>

            <div class="navDropdown" id="navDropdown" inert>
                <ul class="nav-list">
                    <li class="links">
                        <a href="./kompetencer.html">Kompetencer</a>
                    </li>
                    <li class="links">
                        <a href="./om-mig.html">Om mig</a>
                    </li>
                    <li class="links">
                        <a href="./portfolio.html" aria-current="page">Portfolio</a>
                    </li>
                    <li class="links">
                        <a href="./kontakt.html">Kontakt</a>
                    </li>
                </ul>
            </div>
        </nav>
        <nav class="nav-desktop" aria-label="Hovednavigation">
            <ul class="nav-list-desktop">
                <li><a href="./kompetencer.html">Kompetencer</a></li>
                <li><a href="./om-mig.html">Om mig</a></li>
                <li><a href="./portfolio.html" aria-current="page">Portfolio</a></li>
            </ul>

            <a class="site-logo" href="./index.html" aria-label="Freja Fischer – forside">
                FF.
            </a>

            <a class="contact-link" href="./kontakt.html">
                Kontakt
                <!-- Ikon hentet fra google fonts -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        d="M3 12.013L20.789 12m-6.776 7L21 12l-6.988-7" />
                </svg>
            </a>
        </nav>
    </header>
    `
};