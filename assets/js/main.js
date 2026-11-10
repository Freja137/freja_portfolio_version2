/* Fælles header og footer på alle sider.
   Kilder: https://vuejs.org/guide/quick-start
           https://vuejs.org/guide/essentials/component-basics */

// Henter Vue fra et CDN, så siden ikke skal bygges
import { createApp } from "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.prod.js";

// Henter komponenterne fra deres egne filer
import { TheHeader } from "../components/TheHeader.js";
import { TheFooter } from "../components/TheFooter.js";

// Henter tab-navigationen til case-siderne
import { caseTabs } from "./case.js";

createApp({
    components: {
        TheHeader,
        TheFooter
    },

    // Tabs bruges kun på case-siderne – på de andre sider gør de ingenting
    setup() {
        return caseTabs();
    }
}).mount("#app");