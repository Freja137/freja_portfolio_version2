/* Tab-navigation på case-siderne lavet med Vue.
   Inspiration til designet: https://vuetifyjs.com/en/components/tabs/ */

// Henter ref og onMounted fra Vue – ref gemmer værdier, der opdaterer siden, og onMounted kører kode, når siden er klar
import { ref, onMounted } from "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.prod.js";

// Samler alt til tabs i én funktion, som main.js henter og giver videre til Vue-appen
export function caseTabs() {
    // Det første trin i hver fase vises som standard, når man skifter fase
    const firstStep = {
        analyse: "desk-research",
        indhold: "indholdsmodel",
        prototyping: "design-sprint",
        udvikling: "rest-api"
    };

    // Gemmer den fase og det trin, der er valgt – siden starter på fase 01 og dens første trin
    // Når værdien ændres, opdaterer Vue selv :class og v-show i HTML'en
    // Kilde: https://vuejs.org/guide/essentials/reactivity-fundamentals
    const activePhase = ref("analyse");
    const activeStep = ref("desk-research");

    // Rækken med faser – Vue kobler den til elementet med ref="phaseTabs" i HTML'en, når siden er klar
    const phaseTabs = ref(null);

    // Om pilene kan bruges – false gør pilen svag (:disabled i HTML'en)
    const canScrollLeft = ref(false);
    const canScrollRight = ref(false);

    // Kører, når man klikker på en fase – phase er navnet på fasen, og event er klikket fra $event i HTML'en
    // Kilde: https://vuejs.org/guide/essentials/event-handling
    function selectPhase(phase, event) {
        // Gemmer den nye fase og viser fasens første trin
        activePhase.value = phase;
        activeStep.value = firstStep[phase];

        // event.currentTarget er den knap, der blev klikket på – stregen glider hen under den
        moveIndicator(event.currentTarget);

        // På mobil scrolles den valgte fase ind i midten af rækken, hvis den er delvist skjult
        event.currentTarget.scrollIntoView({ inline: "center", block: "nearest" });
    }

    // Flytter stregen under en fase – button er fasens knap
    function moveIndicator(button) {
        // offsetLeft er knappens afstand fra rækkens venstre kant – stregen flyttes lige så langt mod højre
        phaseTabs.value.style.setProperty("--indicator-left", button.offsetLeft + "px");

        // offsetWidth er knappens bredde – stregen bliver lige så bred
        // CSS'en bruger de to variabler og står selv for, at stregen glider
        phaseTabs.value.style.setProperty("--indicator-width", button.offsetWidth + "px");
    }

    // Sætter stregen under den fase, der er valgt – bruges, når siden åbner, og når vinduet ændrer størrelse
    function updateIndicator() {
        // Stopper, hvis siden ikke har faser – fx på forsiden
        if (!phaseTabs.value) return;

        // Finder knappen med klassen is-active og flytter stregen derhen
        moveIndicator(phaseTabs.value.querySelector(".phase-tab.is-active"));
    }

    // Kører, når man klikker på et trin – viser det trin
    function selectStep(step) {
        activeStep.value = step;
    }

    // Tjekker, om der er flere faser at scrolle til i hver side – kører, hver gang rækken scrolles
    function updateArrows() {
        const row = phaseTabs.value;

        // Stopper, hvis siden ikke har faser
        if (!row) return;

        // Venstre pil kan bruges, hvis rækken er scrollet bare lidt mod højre
        canScrollLeft.value = row.scrollLeft > 0;

        // Højre pil kan bruges, hvis det synlige stykke ikke når helt ud til rækkens ende
        // scrollLeft + clientWidth er, hvor langt man kan se, og scrollWidth er hele rækkens bredde
        canScrollRight.value = row.scrollLeft + row.clientWidth < row.scrollWidth - 1;
    }

    // Kører, når man klikker på en pil – direction er -1 (venstre) eller 1 (højre)
    function scrollTabs(direction) {
        // Scroller 70 % af det synlige stykke, så man stadig kan se lidt af den fase, man kom fra
        phaseTabs.value.scrollBy({ left: direction * phaseTabs.value.clientWidth * 0.7 });
    }

    // Kører én gang, når Vue har sat siden op, og elementerne findes
    onMounted(() => {
        // Sætter pilene og stregen rigtigt fra start
        updateArrows();
        updateIndicator();

        // Skrifttypen hentes lidt efter siden og kan gøre faserne bredere, så stregen sættes igen, når den er klar
        document.fonts.ready.then(updateIndicator);

        // Faserne ændrer bredde, når vinduet ændrer størrelse, så pilene og stregen tjekkes igen
        window.addEventListener("resize", () => {
            updateArrows();
            updateIndicator();
        });
    });

    // Gør værdierne og funktionerne tilgængelige i HTML'en
    return { activePhase, activeStep, selectPhase, selectStep, phaseTabs, canScrollLeft, canScrollRight, updateArrows, scrollTabs };
}