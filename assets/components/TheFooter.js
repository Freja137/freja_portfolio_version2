/* Footerkomponent – skabelonen til footeren, så den kun skal skrives ét sted.
   Hentes i main.js og indsættes på alle sider med <the-footer></the-footer>.
   Kilde: https://vuejs.org/guide/essentials/component-basics */

// Export gør det muligt for main.js at hente den med import{TheFooter} from "../components/TheFooter.js"
export const TheFooter = {
    setup() {
        // Henter årstallet, så det altid er det nuværende år
        const year = new Date().getFullYear();
        return { year };
    },

    template: `
            <footer class="site-footer">
        <div class="footer-inner">
            <ul class="footer-links">
                <li>
                    <a href="https://github.com/Freja137" target="_blank" rel="noopener">
                        <i class="fa-brands fa-github" aria-hidden="true"></i>
                        GitHub
                    </a>
                </li>
                <li>
                    <a href="mailto:Frejahfischer@gmail.com">
                        <i class="fa-regular fa-envelope" aria-hidden="true"></i>
                        Mail
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/freja-fischer" target="_blank" rel="noopener">
                        <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                        LinkedIn
                    </a>
                </li>
            </ul>
            <!-- {{ year }} skriver årstallet fra setup() ind i teksten. Kilde: https://vuejs.org/guide/essentials/template-syntax#text-interpolation -->
             <p class="footer-copy">&copy;Freja Fischer {{ year }}</p>
        </div>
    </footer>
    `
};