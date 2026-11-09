//Henter Vue fra et CDN, så siden ikke skal bygges
import { createApp } from "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.prod.js";
//Henter projekterne fra datafilen
import { projects } from "./projects.js";

createApp({
    //Det, der returneres her, kan bruges i skabelonen
    setup() {
        return { projects };
    },
    //Vue styrer kun listen med projekter
}).mount("#project-list");