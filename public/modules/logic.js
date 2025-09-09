// These functions handle rendering, navigation, and form logic.
import { aboutData, educationData, experienceData, skillsData } from "./details.js";
/**
 * Renders content into the DOM.
 */
export const ContentRenderer = {
    renderAbout() {
        const container = document.getElementById("about-content");
        if (container) {
            container.innerHTML = `<p style="text-align: center">${aboutData.bio}</p>`;
        }
    },
    renderExperience() {
        const container = document.getElementById("experience-content");
        if (container) {
            container.innerHTML = experienceData
                .map(
                    (job) => `
                        <div>
                            <h3>${job.role}</h3>
                            <em>${job.company} | ${job.period}</em>
                            <ul>
                            ${job.description.map((dsc) => `<li>${dsc}</li>`).join("\n")}
                           </ul>
                        </div>
                    `
                )
                .join("\n");
        }
    },
    renderEducation() {
        const container = document.getElementById("education-content");
        if (container) {
            container.innerHTML = educationData
                .map(
                    (edu) => `
                        <div style="margin-bottom: 15px;">
                            <h3>${edu.degree}</h3>
                            <em>${edu.institution} | ${edu.period}</em>
                            <ul>
                            ${edu.details.map((det) => `<li>${det}</li>`).join("\n")}
                            </ul>
                        </div>
                    `
                )
                .join("\n");
        }
    },
    renderSkills() {
        const container = document.getElementById("skills-content");
        if (container) {
            container.innerHTML = `<ul>` + skillsData.map((skill) => `<li>${skill[1]} <span>${skill[0]}</span></li>`).join("\n") + `</ul>`;
            /*   `
                <ul class="grid grid-cols-2 gap-4">
                    <li><i class="fa-brands fa-html5"></i> HTML5</li>
                    <li><i class="fa-brands fa-css3-alt"></i> CSS3</li>
                    <li><i class="fa-brands fa-js"></i> JavaScript (ES6+)</li>
                    <li><i class="fa-brands fa-react"></i> React.js</li>
                    <li><i class="fa-brands fa-node-js"></i> Node.js</li>
                    <li><i class="fa-brands fa-github"></i> Git & GitHub</li>
                </ul>
                `
                    `
                    <span class="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">${skill}</span>
                ` */
        }
    },
};

/**
 * Handles form validation and submission.
 */
export const ContactForm = {
    init() {
        const form = document.getElementById("contact-form");
        if (!form) return;

        form.addEventListener("submit", (e) => {
            // Stop the form from submitting right away.
            e.preventDefault();

            const name = form.elements.namedItem("name");
            const email = form.elements.namedItem("email");
            const message = form.elements.namedItem("message");

            // Store the validation results in variables.
            const isNameValid = this.validateField(name, "Name is required.");
            const isEmailValid = this.validateEmail(email);
            const isMessageValid = this.validateField(message, "Message is required.");

            // Noaw, check if all fields are valid.
            if (isNameValid && isEmailValid && isMessageValid) {
                // If they are, then proceed with saving and resetting the form.
                this.saveToSessionStorage({
                    name: name.value,
                    email: email.value,
                    message: message.value,
                });

                const successMsg = document.getElementById("form-success-message");
                successMsg.innerText = "Thank you! Your message has been sent.";
                successMsg.classList.add("show")
                
                form.style.display = "none"
                form.reset();
                
                // setTimeout(() => {
                //     successMsg.classList.remove("show")
                //     successMsg.innerText = "";
                // }, 5000);

            }
        });
    },

    // ... (rest of the code for validateField, validateEmail, and saveToSessionStorage is correct)
    validateField(field, errorMessage) {
        const errorEl = document.getElementById(`${field.id}-error`);
        if (field.value.trim() === "") {
            errorEl.innerText = errorMessage;
            field.classList.add("border-red-500");
            return false;
        } else {
            errorEl.innerText = "";
            field.classList.remove("border-red-500");
            return true;
        }
    },
    
    validateEmail(field) {
        const errorEl = document.getElementById(`${field.id}-error`);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value.trim() === "") {
            errorEl.innerText = "Email is required.";
            field.classList.add("border-red-500");
            return false;
        } else if (!emailRegex.test(field.value)) {
            errorEl.innerText = "Please enter a valid email address.";
            field.classList.add("border-red-500");
            return false;
        } else {
            errorEl.innerText = "";
            field.classList.remove("border-red-500");
            return true;
        }
    },
    
    saveToSessionStorage(data) {
        try {
            const messages = JSON.parse(sessionStorage.getItem("contactMessages") || "[]") || [];
            messages.push({ ...data, timestamp: new Date().toISOString() });
            sessionStorage.setItem("contactMessages", JSON.stringify(messages));
            console.log("Message saved to sessionStorage:", messages);
        } catch (error) {
            console.error("Could not save to sessionStorage:", error);
        }
    },
};

console.log("Yo");
