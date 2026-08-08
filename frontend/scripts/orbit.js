document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".spotlight-workspace");

    const folders = Array.from(
        document.querySelectorAll(".orbit-folder")
    );

    const totalFolders = folders.length;


    // NAVIGATION BUTTONS

    const leftButton =
        document.querySelector(".arrow-left");

    const rightButton =
        document.querySelector(".arrow-right");


    // HEXAGON SIZE

    const radiusX = 360;
    const radiusY = 200;


    // Hidden slot ABOVE the hexagon
    const hiddenY = -300;


    // Number of visible folders
    const visibleCount = 6;


    let currentStep = 0;


    // DRAG VARIABLES

    let isDragging = false;
    let startX = 0;
    let dragDistance = 0;
    const stepSize = 70;


    // HEXAGON POSITIONS

    const hexagonPositions = [

        // 1. TOP
        {
            x: 0,
            y: -radiusY
        },

        // 2. TOP RIGHT
        {
            x: radiusX * 0.866,
            y: -radiusY * 0.5
        },

        // 3. BOTTOM RIGHT
        {
            x: radiusX * 0.866,
            y: radiusY * 0.5
        },

        // 4. BOTTOM
        {
            x: 0,
            y: radiusY
        },

        // 5. BOTTOM LEFT
        {
            x: -radiusX * 0.866,
            y: radiusY * 0.5
        },

        // 6. TOP LEFT
        {
            x: -radiusX * 0.866,
            y: -radiusY * 0.5
        }

    ];


    // UPDATE FOLDER POSITIONS

    function updateFolderPositions() {

        for (let i = 0; i < totalFolders; i++) {

            const folder = folders[i];

            const position =
                (i - currentStep + totalFolders) % totalFolders;

            // SIX VISIBLE HEXAGON POSITIONS

            if (position < visibleCount) {

                const pos =
                    hexagonPositions[position];


                folder.style.transform =
                    `translate(-50%, -50%)
                     translate3d(${pos.x}px, ${pos.y}px, 0px)`;


                folder.style.opacity = "1";

                folder.style.pointerEvents = "auto";

                folder.style.zIndex =
                    20 + position;

            }


            // HIDDEN TOP SLOT

            else if (position === visibleCount) {

                folder.style.transform =
                    `translate(-50%, -50%)
                     translate3d(0px, ${hiddenY}px, 0px)`;


                folder.style.opacity = "0";

                folder.style.pointerEvents = "none";

                folder.style.zIndex = "1";

            }

            // EXTRA HIDDEN FOLDER

            else {

                folder.style.transform =
                    `translate(-50%, -50%)
                     translate3d(0px, ${hiddenY}px, 0px)`;


                folder.style.opacity = "0";

                folder.style.pointerEvents = "none";

                folder.style.zIndex = "0";

            }

        }

    }


    // MOVE LEFT

    function moveLeft() {

        currentStep++;

        if (currentStep >= totalFolders) {

            currentStep = 0;

        }

        updateFolderPositions();

    }

    // MOVE RIGHT

    function moveRight() {

        currentStep--;

        if (currentStep < 0) {

            currentStep = totalFolders - 1;

        }

        updateFolderPositions();

    }


    // LEFT BUTTON

    if (leftButton) {

        leftButton.addEventListener("click", (e) => {

            e.stopPropagation();

            moveLeft();

        });

    }

    // RIGHT BUTTON

    if (rightButton) {

        rightButton.addEventListener("click", (e) => {

            e.stopPropagation();

            moveRight();

        });

    }

    // START DRAG
    container.addEventListener("mousedown", (e) => {

        if (
            e.target.closest(".arrow-left") ||
            e.target.closest(".arrow-right")
        ) {
            return;
        }


        isDragging = true;

        startX = e.clientX;

        dragDistance = 0;

        container.style.cursor = "grabbing";

        e.preventDefault();

    });

    // DRAG
    window.addEventListener("mousemove", (e) => {

        if (!isDragging) return;


        const deltaX =
            e.clientX - startX;


        startX = e.clientX;


        dragDistance += deltaX;


        // DRAG RIGHT
        if (dragDistance >= stepSize) {

            moveRight();

            dragDistance = 0;

        }


        // DRAG LEFT
        else if (dragDistance <= -stepSize) {

            moveLeft();

            dragDistance = 0;

        }

    });


    // STOP DRAG
    window.addEventListener("mouseup", () => {

        if (!isDragging) return;


        isDragging = false;

        dragDistance = 0;

        container.style.cursor = "grab";

    });


    // MOUSE WHEEL
    container.addEventListener(
        "wheel",
        (e) => {

            e.preventDefault();


            // Scroll DOWN
            if (e.deltaY > 0) {

                moveLeft();

            }


            // Scroll UP
            else {

                moveRight();

            }

        },
        {
            passive: false
        }
    );

    // INITIAL DISPLAY
    
    updateFolderPositions();

});