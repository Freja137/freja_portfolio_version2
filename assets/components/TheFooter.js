/* Footer komponent, kilde: https://vuejs.org/guide/essentials/component-basics */

export const TheFooter = {
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
            <p class="footer-copy">&copy;Freja Fischer 2026</p>
        </div>
    </footer>
    `
};