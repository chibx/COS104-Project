/**  This is the entry point that runs all the setup functions. */
import { ContactForm, ContentRenderer, Navigation } from "./modules/logic.js";
const App = {
    init() {
        ContentRenderer.renderAbout();
        ContentRenderer.renderExperience();
        ContentRenderer.renderEducation();
        ContentRenderer.renderSkills();
        Navigation.init();
        ContactForm.init();
    },
};
App.init();
