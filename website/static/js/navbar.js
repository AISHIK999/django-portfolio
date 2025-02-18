document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const themeBar = document.querySelector('.theme-bar');

    navbar.addEventListener('click', (e) => {
        const button = e.target.closest('.navbar-btn');
        if (!button) return;

        const newSectionId = button.dataset.id;
        const currentSection = document.querySelector('section.active');
        const newSection = document.getElementById(newSectionId);

        if (currentSection === newSection) return;

        // Update navigation buttons
        document.querySelector('.navbar .active-btn')?.classList.remove('active-btn');
        button.classList.add('active-btn');

        // Fade out current section
        if (currentSection) {
            currentSection.style.opacity = '0';
            currentSection.style.visibility = 'hidden';
            currentSection.classList.remove('active');
        }

        // Fade in new section
        newSection.style.opacity = '1';
        newSection.style.visibility = 'visible';
        newSection.classList.add('active');
    });

    themeBar.addEventListener('click', (e) => {
        const themeButton = e.target.closest('.theme-btn');
        if (!themeButton) return;

        const isDarkTheme = themeButton.classList.contains('theme-btn-moon');
        document.body.classList.toggle('light-theme', !isDarkTheme);

        themeBar.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active-btn', btn === themeButton);
        });
    });
});