// These functions handle rendering, navigation, and form logic.
import { aboutData, educationData, experienceData, skillsData } from "./details.js";
/**
 * Renders content into the DOM.
 */
export const ContentRenderer = {
    renderAbout() {
        const container = document.getElementById("about-content");
        if (container) {
            container.innerHTML = `<p>${aboutData.bio}</p>`;
        }
    },
    renderExperience() {
        const container = document.getElementById("experience-content");
        if (container) {
            container.innerHTML = experienceData
                .map(
                    (job) => `
                        <div class="relative pl-8 before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:bg-blue-500 before:rounded-full before:border-4 before:border-white">
                            <h3 class="text-xl font-bold text-slate-800">${job.role}</h3>
                            <p class="font-medium text-blue-600">${job.company} | ${job.period}</p>
                            <p class="mt-2 text-slate-600">${job.description}</p>
                        </div>
                    `
                )
                .join("");
        }
    },
    renderEducation() {
        const container = document.getElementById("education-content");
        if (container) {
            container.innerHTML = educationData
                .map(
                    (edu) => `
                        <div class="bg-white p-6 rounded-lg shadow-sm">
                            <h3 class="text-xl font-bold text-slate-800">${edu.degree}</h3>
                            <p class="font-medium text-blue-600">${edu.institution} | ${edu.period}</p>
                            <p class="mt-2 text-slate-600">${edu.details}</p>
                        </div>
                    `
                )
                .join("");
        }
    },
    renderSkills() {
        const container = document.getElementById("skills-content");
        if (container) {
            container.innerHTML = skillsData
                .map(
                    (skill) => `
                        <span class="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">${skill}</span>
                    `
                )
                .join("");
        }
    },
};
/**
 * Handles navigation logic, like active link highlighting.
 */
export const Navigation = {
    init() {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav a");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((link) => {
                            link.classList.remove("nav-active");
                            if (link.getAttribute("href")?.substring(1) === entry.target.id) {
                                link.classList.add("nav-active");
                            }
                        });
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );
        sections.forEach((section) => observer.observe(section));
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
            e.preventDefault();
            const name = form.elements.namedItem("name");
            const email = form.elements.namedItem("email");
            const message = form.elements.namedItem("message");
            const isNameValid = this.validateField(name, "Name is required.");
            const isEmailValid = this.validateEmail(email);
            const isMessageValid = this.validateField(message, "Message is required.");
            if (isNameValid && isEmailValid && isMessageValid) {
                this.saveToSessionStorage({
                    name: name.value,
                    email: email.value,
                    message: message.value,
                });
                const successMsg = document.getElementById("form-success-message");
                successMsg.textContent = "Thank you! Your message has been sent.";
                form.reset();
                setTimeout(() => {
                    successMsg.textContent = "";
                }, 5000);
            }
        });
    },
    validateField(field, errorMessage) {
        const errorEl = document.getElementById(`${field.id}-error`);
        if (field.value.trim() === "") {
            errorEl.textContent = errorMessage;
            field.classList.add("border-red-500");
            return false;
        } else {
            errorEl.textContent = "";
            field.classList.remove("border-red-500");
            return true;
        }
    },
    validateEmail(field) {
        const errorEl = document.getElementById(`${field.id}-error`);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value.trim() === "") {
            errorEl.textContent = "Email is required.";
            field.classList.add("border-red-500");
            return false;
        } else if (!emailRegex.test(field.value)) {
            errorEl.textContent = "Please enter a valid email address.";
            field.classList.add("border-red-500");
            return false;
        } else {
            errorEl.textContent = "";
            field.classList.remove("border-red-500");
            return true;
        }
    },
    saveToSessionStorage(data) {
        try {
            // We store messages in an array to keep a record during the session.
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
