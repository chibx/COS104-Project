/**  This is the entry point that runs all the setup functions. */
import { ContactForm, ContentRenderer } from "./modules/logic.js";
import { Navigation } from "./modules/navigation.js";
import Animatino from "./modules/animations.js";
const App = {
    init() {
        ContentRenderer.renderAbout();
        ContentRenderer.renderExperience();
        ContentRenderer.renderEducation();
        ContentRenderer.renderSkills();
        Navigation.init();
        ContactForm.init();
        Animatino.init();
    },
};

App.init();
