/* Vue – projektoversigt */
const { createApp } = Vue;

// Kort til hvert projekt – samme opbygning til alle
const ProjectCard = {
    props: {
        project: {
            type: Object,
            required: true
        }
    },

    template: `
        <a class="project-card">
            <img class="project-image" :src="project.billede" :alt="project.alt" loading="lazy">

            <h2 class="project-card-title">{{ project.titel }}</h2>
            <p class="project-description">{{ project.beskrivelse }}</p>

            <a class="text-link" :href="'./projekt.html?id=' + project.id">
                Udforsk projektet
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        d="M3 12.013L20.789 12m-6.776 7L21 12l-6.988-7" />
                </svg>
            </a>
        </a>
    `
};

createApp({
    components: {
        ProjectCard
    },

    setup() {
        return {
            projects
        };
    }
}).mount("#portfolio-app");