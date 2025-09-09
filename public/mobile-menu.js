// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    // Close menu when clicking on a link
    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on a nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = mobileNav.contains(e.target) || mobileMenuBtn.contains(e.target);
        if (!isClickInsideNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu when window is resized to desktop view
    function handleResize() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }

    window.addEventListener('resize', handleResize);
});
