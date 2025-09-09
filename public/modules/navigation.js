/**
 * Handles navigation logic, highlighting the active link
 * based on which section is currently in view on the page.
 */
export const Navigation = {
    init() {
        // Grab all the page sections and navigation links to work with.
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav a");

        // Set up a new Intersection Observer to watch our sections.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Check if the section is currently intersecting with our viewport.
                    if (entry.isIntersecting) {
                        // Remove the active class from all links first to reset the state.
                        navLinks.forEach((link) => {
                            link.classList.remove("nav-active");

                            // Get the ID of the section that's in view.
                            const sectionId = entry.target.id;
                            
                            // Check if the link's href matches the section's ID.
                            // The substring(1) removes the leading '#' from the href.
                            if (link.getAttribute("href")?.substring(1) === sectionId) {
                                link.classList.add("nav-active");
                            }
                        });
                    }
                });
            },
            {
                // this is an offsett for the interaction observer
                rootMargin: "-50% 0px -50% 0px",
            }
        );

        // Tell the observer to start watching each section we found.
        sections.forEach((section) => observer.observe(section));



        // Mobile navigation
          const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mobileNav = document.querySelector('.mobile-nav');
            const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            
            // Toggle mobile menu
            function toggleMobileMenu() {
                mobileMenuBtn.classList.toggle('active');
                mobileNav.classList.toggle('active');
                mobileNavOverlay.classList.toggle('active');
                document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            }
            
            // Close menu when clicking on a link
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                    mobileNavOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking on overlay
            mobileNavOverlay.addEventListener('click', toggleMobileMenu);
            
            // Toggle menu when clicking the menu button
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    },
};