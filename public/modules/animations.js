const Animatino = {
    init() {
        const skillsSection = document.querySelector('#skills');
        const skillItems = document.querySelectorAll('#skills-content li');

        if (skillsSection) {
            // Add the .skills-item class to each list item in the skills section
            skillItems.forEach(item => {
                item.classList.add('skills-item');
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillsSection.classList.add('in-view');
                        // Once the animation is triggered, we don't need to observe anymore
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% of the section is visible
            });

            observer.observe(skillsSection);
        }
    }
}

export default Animatino