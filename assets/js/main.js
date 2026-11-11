/* Starter Vue på alle sider – giver fælles header og footer og tab-navigationen på case-siderne.
   Filen hentes med <script type="module">, fordi den bruger import.
   Kilder: https://vuejs.org/guide/quick-start
           https://vuejs.org/guide/components/registration#local-registration */

// Henter createApp fra Vue på et CDN, så Vue ikke skal installeres eller bygges
import { createApp } from "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.prod.js";

// Henter header- og footerkomponenten fra deres egne filer
import { TheHeader } from "../components/TheHeader.js";
import { TheFooter } from "../components/TheFooter.js";

// Henter tab-navigationen til case-siderne
import { caseTabs } from "./case.js";

// Laver Vue-appen
createApp({
    // Registrerer komponenterne, så de kan bruges som <the-header> og <the-footer> i HTML'en
    components: {
        TheHeader,
        TheFooter
    },

    // Gør tabs klar til HTML'en – på sider uden tabs gør de ingenting
    setup() {
        return caseTabs();
    }
    // Starter appen på <div id="app">, så Vue styrer alt indholdet inde i den
}).mount("#app");