/* ==================================================
   CALCULATOR
================================================== */

let selectedZone = null;

let selectedZoneElement = null;


/* ==================================================
   INIT
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupViewSwitcher();

        waitForBodySVG("bodyFront");

        waitForBodySVG("bodyBack");

    }
);


/* ==================================================
   VIEW SWITCHER
================================================== */

function setupViewSwitcher() {

    const frontButton =
        document.getElementById("frontButton");

    const backButton =
        document.getElementById("backButton");

    const front =
        document.getElementById("bodyFront");

    const back =
        document.getElementById("bodyBack");


    if (
        !frontButton ||
        !backButton ||
        !front ||
        !back
    ) {

        return;

    }


    frontButton.addEventListener(
        "click",
        function () {

            front.classList.add("active");

            back.classList.remove("active");

            frontButton.classList.add("active");

            backButton.classList.remove("active");

        }
    );


    backButton.addEventListener(
        "click",
        function () {

            back.classList.add("active");

            front.classList.remove("active");

            backButton.classList.add("active");

            frontButton.classList.remove("active");

        }
    );

}


/* ==================================================
   WAIT FOR SVG
================================================== */

function waitForBodySVG(objectId) {

    const object =
        document.getElementById(objectId);


    if (!object) {

        return;

    }


    /*
     * Si el SVG ya está cargado.
     */

    if (
        object.contentDocument &&
        object.contentDocument.readyState !== "loading"
    ) {

        initializeBodyZones(object);

    }


    /*
     * Cuando termine de cargar.
     */

    object.addEventListener(
        "load",
        function () {

            initializeBodyZones(object);

        }
    );

}


/* ==================================================
   INITIALIZE BODY ZONES
================================================== */

function initializeBodyZones(object) {

    if (!object) {

        return;

    }


    const svgDocument =
        object.contentDocument;


    if (!svgDocument) {

        return;

    }


    const zones =
        svgDocument.querySelectorAll(
            ".tattoo-zone"
        );


    zones.forEach(
        function (zone) {

            /*
             * Evitar eventos duplicados.
             */

            if (
                zone.dataset.initialized === "true"
            ) {

                return;

            }


            zone.dataset.initialized =
                "true";


            /*
             * CLICK
             */

            zone.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    selectBodyZone(zone);

                }
            );


            /*
             * TECLADO
             */

            zone.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        selectBodyZone(zone);

                    }

                }
            );

        }
    );

}


/* ==================================================
   SELECT BODY ZONE
================================================== */

function selectBodyZone(zoneElement) {

    if (!zoneElement) {

        return;

    }


    const zone =
        zoneElement.dataset.zone;


    if (!zone) {

        return;

    }


    /*
     * Eliminar selección anterior.
     */

    clearSelectedZones();


    /*
     * Seleccionar nueva zona.
     */

    zoneElement.classList.add("selected");


    selectedZoneElement =
        zoneElement;


    selectedZone =
        zone;


    /*
     * Actualizar editor.
     */

    if (
        typeof updateTattooEditorZone ===
        "function"
    ) {

        updateTattooEditorZone(zone);

    }


    /*
     * Actualizar nombres.
     */

    updateZoneNames(zone);


    /*
     * Actualizar medidas.
     */

    if (
        typeof updateTattooEditorMeasurements ===
        "function"
    ) {

        updateTattooEditorMeasurements();

    }

}


/* ==================================================
   CLEAR SELECTED ZONES
================================================== */

function clearSelectedZones() {

    const front =
        document.getElementById("bodyFront");

    const back =
        document.getElementById("bodyBack");


    removeSelectedFromObject(front);

    removeSelectedFromObject(back);


    selectedZoneElement =
        null;

}


/* ==================================================
   REMOVE SELECTED FROM SVG
================================================== */

function removeSelectedFromObject(object) {

    if (!object) {

        return;

    }


    const svgDocument =
        object.contentDocument;


    if (!svgDocument) {

        return;

    }


    const selected =
        svgDocument.querySelectorAll(
            ".tattoo-zone.selected"
        );


    selected.forEach(
        function (zone) {

            zone.classList.remove(
                "selected"
            );

        }
    );

}


/* ==================================================
   UPDATE ZONE NAMES
================================================== */

function updateZoneNames(zone) {

    const selectedZoneElement =
        document.getElementById(
            "selectedZone"
        );

    const selectedZoneLarge =
        document.getElementById(
            "selectedZoneLarge"
        );

    const canvasZoneName =
        document.getElementById(
            "canvasZoneName"
        );

    const miniZoneName =
        document.getElementById(
            "miniZoneName"
        );


    /*
     * Nombre de zona seleccionada.
     */

    if (selectedZoneElement) {

        selectedZoneElement.textContent =
            zone;

    }


    /*
     * Live Preview.
     */

    if (selectedZoneLarge) {

        selectedZoneLarge.textContent =
            zone;

    }


    /*
     * Nombre encima del canvas.
     */

    if (canvasZoneName) {

        canvasZoneName.textContent =
            zone;

    }


    /*
     * Mini cuerpo.
     */

    if (miniZoneName) {

        miniZoneName.textContent =
            zone;

    }

}


/* ==================================================
   GET SELECTED ZONE
================================================== */

function getSelectedZone() {

    return selectedZone;

}


/* ==================================================
   GET SELECTED ZONE ELEMENT
================================================== */

function getSelectedZoneElement() {

    return selectedZoneElement;

}
