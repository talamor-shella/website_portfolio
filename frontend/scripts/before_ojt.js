document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".spotlight-workspace");

    const folders = Array.from(
        document.querySelectorAll(".orbit-folder")
    );

    const totalFolders = folders.length;



    // HEXAGON SIZE
    const radiusX = 300;
    const radiusY = 190;


    // Hidden slot ABOVE the hexagon
    const hiddenY = -300;


    // 6 visible positions
    const visibleCount = 6;


    let currentStep = 0;

    // DRAG VARIABLES

    let isDragging = false;
    let startX = 0;
    let dragDistance = 0;

    // Lower = more sensitive
    const stepSize = 70;

    // HEXAGON POSITIONS

    const hexagonPositions = [

        // TOP
        {
            x: 0,
            y: -radiusY
        },

        // TOP RIGHT
        {
            x: radiusX * 0.866,
            y: -radiusY * 0.5
        },

        // BOTTOM RIGHT
        {
            x: radiusX * 0.866,
            y: radiusY * 0.5
        },

        // BOTTOM
        {
            x: 0,
            y: radiusY
        },

        // BOTTOM LEFT
        {
            x: -radiusX * 0.866,
            y: radiusY * 0.5
        },

        // TOP LEFT
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

            // SIX HEXAGON POSITIONS

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


            // EXTRA FOLDER

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

    // START DRAG
    container.addEventListener("mousedown", (e) => {

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

            currentStep--;

            if (currentStep < 0) {

                currentStep =
                    totalFolders - 1;

            }

            dragDistance = 0;

            updateFolderPositions();

        }


        // DRAG LEFT
        else if (dragDistance <= -stepSize) {

            currentStep++;

            if (currentStep >= totalFolders) {

                currentStep = 0;

            }

            dragDistance = 0;

            updateFolderPositions();

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

                currentStep++;

                if (currentStep >= totalFolders) {

                    currentStep = 0;

                }

            }


            // Scroll UP
            else {

                currentStep--;

                if (currentStep < 0) {

                    currentStep =
                        totalFolders - 1;

                }

            }


            updateFolderPositions();

        },
        {
            passive: false
        }
    );


    // INITIAL DISPLAY
    updateFolderPositions();

});