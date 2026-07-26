document.addEventListener("DOMContentLoaded", function() {
    const folderBtn = document.querySelector('.portfolio-back-folder');
    const cardsSection = document.querySelector('.portfolio-carousel-section');

    if (folderBtn && cardsSection) {
        folderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cardsSection.classList.toggle('active');
        });
    }
});