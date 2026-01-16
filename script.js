document.addEventListener('DOMContentLoaded', () => {

    // === 1. IMAGE SLIDER LOGIC ===
    const sliderContainer = document.querySelector('.slider-image-container');
    const images = sliderContainer ? sliderContainer.querySelectorAll('img') : [];
    const prevButton = document.querySelector('.banner-btn.prev');
    const nextButton = document.querySelector('.banner-btn.next');
    const bannerSection = document.querySelector('.banner');

    let currentIndex = 0;
    const totalImages = images.length;
    const slideInterval = 5000; 
    let autoSlideTimer;

    if (totalImages > 0 && sliderContainer && prevButton && nextButton && bannerSection) {
        
        // The core function to move the slider
        function updateSlider(shouldResetTimer = true) {
            // Calculate the horizontal offset needed to show the current image
            const offset = -currentIndex * 100;
            sliderContainer.style.transform = `translateX(${offset}%)`;

            // Reset the auto-slide timer if the movement was user-triggered
            if (shouldResetTimer) {
                resetAutoSlide(); 
            }
        }

        function nextSlide() {
            // Move to the next index, wrapping back to 0 at the end
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        }

        function prevSlide() {
            // Move to the previous index, wrapping to the end index if moving from 0
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
        }

        // Auto-Slide functions
        function startAutoSlide() {
            clearInterval(autoSlideTimer); 
            autoSlideTimer = setInterval(nextSlide, slideInterval);
        }

        function resetAutoSlide() {
            startAutoSlide();
        }

        // --- Event Listeners ---
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        // Pause auto-slide when the user hovers over the banner area
        bannerSection.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
        // Resume auto-slide when the user moves the mouse away
        bannerSection.addEventListener('mouseleave', startAutoSlide);
        
        // Keyboard Accessibility (Use left/right arrows to navigate slides)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });

        // Initialize the slider position and start the auto-slide
        updateSlider(false); 
        startAutoSlide();
    }

    // === 2. BACK TO TOP FUNCTIONALITY ===
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // === 3. SEARCH FORM SIMULATION ===
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const searchDropdown = document.querySelector('.search-dropdown');
    
    if (searchButton && searchInput && searchDropdown) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            const category = searchDropdown.value;
            const query = searchInput.value.trim();
            
            if (query) {
                console.log(`[SEARCH] Category: ${category}, Query: "${query}". (Simulation)`);
            } else {
                console.log("[SEARCH] Please enter a search term.");
            }
            
            searchInput.value = ''; 
        });
    }
});