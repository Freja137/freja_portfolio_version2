/* Vue – side til et enkelt projekt */
const { createApp } = Vue;

createApp({
    setup() {
        // Find projektets id i adressen, fx projekt.html?id=vejr-app
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        // Find projektet med det id i data.js
        const project = projects.find((item) => item.id === id);

        // Næste projekt – efter det sidste starter vi forfra
        let nextProject = null;

        if (project) {
            const index = projects.indexOf(project);
            nextProject = projects[(index + 1) % projects.length];

            // Fanen viser projektets navn
            document.title = `Portfolio | ${project.titel}`;
        }

        return {
            project,
            nextProject
        };
    }
}).mount("#project-app");