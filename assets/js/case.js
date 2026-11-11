/* Tab-navigation på case-siderne lavet med Vue.
   Inspiration til designet: https://vuetifyjs.com/en/components/tabs/ */

// Henter ref og onMounted fra Vue – ref gemmer værdier, der opdaterer siden, og onMounted kører kode, når siden er klar
import { ref, onMounted } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// Samler alt til tabs i én funktion, som main.js henter og giver videre til Vue-appen
export function caseTabs() {
    // Gemmer den fase og det trin, der er valgt. Når værdien ændres, opdaterer Vue selv :class og v-show i HTML'en
    const activePhase = ref("");
    const activeStep = ref("");

    // Rækken med faser – Vue kobler den til elementet med ref="phaseTabs" i HTML'en, når siden er klar
    // Kilde: https://vuejs.org/guide/essentials/template-refs
    const phaseTabs = ref(null);

    // Ser om pilene kan bruges – false gør pilen svag (:disabled i HTML'en)
    const canScrollLeft = ref(false);
    const canScrollRight = ref(false);

    // Kører, når man klikker på en fase – phase er navnet på fasen, og event er klikket fra $event i HTML'en
    // Kilde: https://vuejs.org/guide/essentials/event-handling
    function selectPhase(phase, event) {
        // Gemmer den nye fase
        activePhase.value = phase;

        // Viser fasens første trin - det som står i knappens data-first-step i HTML'en
        activeStep.value = event.currentTarget.dataset.firstStep;

        // event.currentTarget er den knap, der blev klikket på – stregen glider hen under den, der er blevet valgt
        moveIndicator(event.currentTarget);

        // På mobil scrolles den valgte fase ind i midten af rækken, hvis den er delvist skjult
        event.currentTarget.scrollIntoView({ inline: "center", block: "nearest" });
    }

    // Flytter stregen under en fase – button er fasens knap
    function moveIndicator(button) {
        // offsetLeft er knappens afstand fra rækkens venstre kant – stregen flyttes lige så langt mod højre
        phaseTabs.value.style.setProperty("--indicator-left", button.offsetLeft + "px");

        // offsetWidth er knappens bredde – stregen bliver lige så bred
        phaseTabs.value.style.setProperty("--indicator-width", button.offsetWidth + "px");
    }

    // Sætter stregen under den fase, der er valgt – bruges, når siden åbner, og når vinduet ændrer størrelse
    function updateIndicator() {
        // Stopper, hvis siden ikke har faser – fx på forsiden
        if (!phaseTabs.value) return;

        // Find den fase, der er markeret som valgt som har class = "is-active", og flyt stregen derhen.
        moveIndicator(phaseTabs.value.querySelector(".phase-tab.is-active"));
    }

    // Kører, når man klikker på et trin – viser det trin
    function selectStep(step) {
        activeStep.value = step;
    }

    // Tjekker, om der er flere faser at scrolle til i hver side – kører, hver gang rækken scrolles
    function updateArrows() {
        const row = phaseTabs.value;

        // Er der ingen række, så stop.
        if (!row) return;

        // Venstre pil kan bruges, hvis rækken er scrollet bare lidt mod højre
        canScrollLeft.value = row.scrollLeft > 0;

        // Højre pil kan bruges, hvis det synlige stykke ikke når helt ud til rækkens ende
        // scrollLeft + clientWidth er, hvor langt man kan se, og scrollWidth er hele rækkens bredde
        canScrollRight.value = row.scrollLeft + row.clientWidth < row.scrollWidth - 1;
    }

    // Kører, når man klikker på en pil – direction er -1 (venstre) eller 1 (højre)
    // Kilde: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
    function scrollTabs(direction) {
        // Scroller 60 % af det synlige stykke, så man stadig kan se lidt af den fase, man kom fra
        phaseTabs.value.scrollBy({ left: direction * phaseTabs.value.clientWidth * 0.6 });
    }

    // Kører én gang, når Vue har sat siden op, og elementerne findes
    // Kilde: https://vuejs.org/guide/essentials/lifecycle
    onMounted(() => {
        // Stopper, hvis siden ikke har faser – fx på forsiden
        if (!phaseTabs.value) return;

        // Siden starter på den første fase og dens første trin
        const firstPhase = phaseTabs.value.querySelector(".phase-tab");
        activePhase.value = firstPhase.dataset.phase;
        activeStep.value = firstPhase.dataset.firstStep;

        // Sætter stregen under den første fase og tjekker pilene
        moveIndicator(firstPhase);
        updateArrows();

        // Skrifttypen hentes lidt efter siden og kan ændre fasernes bredde, så stregen sættes igen, når den er klar
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