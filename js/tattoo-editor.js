/* ==================================================
   TATTOO EDITOR
   Preview del cliente
================================================== */


/* ==================================================
   STATE
================================================== */

const tattooEditorState = {

    hasImage: false,

    imageSource: null,

    width: 160,

    height: 160,

    rotation: 0,

    widthCm: 0,

    heightCm: 0,

    category: null,

    dragging: false,

    resizing: false,

    resizeHandle: null,

    startX: 0,

    startY: 0,

    startLeft: 0,

    startTop: 0,

    startWidth: 160,

    startHeight: 160

};


/* ==================================================
   ZONE PHYSICAL REFERENCE
================================================== */

const zonePhysicalSizes = {

    "Parte superior brazo derecho": {
        width: 14,
        height: 30
    },

    "Antebrazo derecho": {
        width: 11,
        height: 25
    },

    "Parte superior brazo izquierdo": {
        width: 14,
        height: 30
    },

    "Antebrazo izquierdo": {
        width: 11,
        height: 25
    },

    "Pecho": {
        width: 35,
        height: 30
    },

    "Espalda": {
        width: 40,
        height: 45
    },

    "Muslo derecho": {
        width: 18,
        height: 40
    },

    "Muslo izquierdo": {
        width: 18,
        height: 40
    },

    "Pantorrilla derecha": {
        width: 13,
        height: 35
    },

    "Pantorrilla izquierda": {
        width: 13,
        height: 35
    }

};


/* ==================================================
   CONSTANTS
================================================== */

const TATTOO_MIN_SIZE = 30;

const TATTOO_MAX_SIZE = 450;

const TATTOO_DEFAULT_SIZE = 160;

const TATTOO_ROTATION_STEP = 15;


/* ==================================================
   INIT
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupUpload();

        setupChangeButton();

        setupRemoveButton();

        setupDragging();

        setupResizing();

        setupRotation();

        initializeEditor();

    }
);


/* ==================================================
   INITIALIZE
================================================== */

function initializeEditor() {

    const object =
        document.getElementById(
            "tattooObject"
        );


    if (object) {

        object.style.display =
            "none";

    }


    tattooEditorState.width =
        TATTOO_DEFAULT_SIZE;

    tattooEditorState.height =
        TATTOO_DEFAULT_SIZE;

    tattooEditorState.rotation =
        0;


    updateRotationDisplay();

    updateDesignActions();

    clearRealZonePreview();

}


/* ==================================================
   UPLOAD
================================================== */

function setupUpload() {

    const input =
        document.getElementById(
            "tattooImage"
        );


    if (!input) {

        return;

    }


    input.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];


            if (!file) {

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Selecciona una imagen válida."
                );


                input.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    setTattooImage(
                        event.target.result
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* ==================================================
   SET IMAGE
================================================== */

function setTattooImage(
    source
) {

    const preview =
        document.getElementById(
            "imagePreview"
        );


    const editorImage =
        document.getElementById(
            "editorTattooImage"
        );


    const object =
        document.getElementById(
            "tattooObject"
        );


    const empty =
        document.getElementById(
            "canvasEmpty"
        );


    const placeholder =
        document.getElementById(
            "uploadPlaceholder"
        );


    /*
     * Preview lateral
     */

    if (preview) {

        preview.src =
            source;

        preview.style.display =
            "block";

    }


    /*
     * Imagen del editor
     */

    if (editorImage) {

        editorImage.src =
            source;

    }


    /*
     * Estado visual
     */

    if (object) {

        object.style.display =
            "block";

        object.classList.add(
            "visible"
        );

    }


    if (empty) {

        empty.style.display =
            "none";

    }


    if (placeholder) {

        placeholder.style.display =
            "none";

    }


    /*
     * Estado
     */

    tattooEditorState.hasImage =
        true;

    tattooEditorState.imageSource =
        source;


    /*
     * Reiniciar transformación
     * al cargar un nuevo diseño.
     */

    tattooEditorState.width =
        TATTOO_DEFAULT_SIZE;

    tattooEditorState.height =
        TATTOO_DEFAULT_SIZE;

    tattooEditorState.rotation =
        0;


    updateRotationDisplay();

    updateDesignActions();

    centerTattoo();

    updateTattooEditorMeasurements();

}


/* ==================================================
   CHANGE IMAGE
================================================== */

function setupChangeButton() {

    const button =
        document.getElementById(
            "changeTattooButton"
        );


    const input =
        document.getElementById(
            "tattooImage"
        );


    if (
        !button ||
        !input
    ) {

        return;

    }


    button.addEventListener(
        "click",
        function () {

            input.click();

        }
    );

}


/* ==================================================
   REMOVE IMAGE
================================================== */

function setupRemoveButton() {

    const button =
        document.getElementById(
            "removeTattooButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        removeTattoo
    );

}


/* ==================================================
   REMOVE TATTOO
================================================== */

function removeTattoo() {

    const input =
        document.getElementById(
            "tattooImage"
        );


    const preview =
        document.getElementById(
            "imagePreview"
        );


    const editorImage =
        document.getElementById(
            "editorTattooImage"
        );


    const object =
        document.getElementById(
            "tattooObject"
        );


    const empty =
        document.getElementById(
            "canvasEmpty"
        );


    const placeholder =
        document.getElementById(
            "uploadPlaceholder"
        );


    if (input) {

        input.value = "";

    }


    if (preview) {

        preview.src = "";

        preview.style.display =
            "none";

    }


    if (editorImage) {

        editorImage.src = "";

    }


    if (object) {

        object.style.display =
            "none";

        object.classList.remove(
            "visible"
        );

        object.style.left =
            "50%";

        object.style.top =
            "50%";

    }


    if (empty) {

        empty.style.display =
            "flex";

    }


    if (placeholder) {

        placeholder.style.display =
            "flex";

    }


    tattooEditorState.hasImage =
        false;

    tattooEditorState.imageSource =
        null;

    tattooEditorState.width =
        TATTOO_DEFAULT_SIZE;

    tattooEditorState.height =
        TATTOO_DEFAULT_SIZE;

    tattooEditorState.rotation =
        0;

    tattooEditorState.widthCm =
        0;

    tattooEditorState.heightCm =
        0;

    tattooEditorState.category =
        null;


    updateRotationDisplay();

    updateDesignActions();

    updateTattooEditorMeasurements();

}


/* ==================================================
   DESIGN ACTIONS
================================================== */

function updateDesignActions() {

    const actions =
        document.getElementById(
            "designActions"
        );


    if (!actions) {

        return;

    }


    actions.classList.toggle(
        "visible",
        tattooEditorState.hasImage
    );

}


/* ==================================================
   CENTER TATTOO
================================================== */

function centerTattoo() {

    const canvas =
        document.getElementById(
            "tattooCanvas"
        );


    const object =
        document.getElementById(
            "tattooObject"
        );


    if (
        !canvas ||
        !object
    ) {

        return;

    }


    /*
     * Ajustar tamaño si el canvas
     * es más pequeño que el tattoo.
     */

    const maxAllowed =
        Math.min(
            TATTOO_MAX_SIZE,
            Math.max(
                TATTOO_MIN_SIZE,
                Math.min(
                    canvas.clientWidth,
                    canvas.clientHeight
                ) * 0.75
            )
        );


    if (
        tattooEditorState.width >
        maxAllowed
    ) {

        const ratio =
            tattooEditorState.width /
            tattooEditorState.height;


        tattooEditorState.width =
            maxAllowed;

        tattooEditorState.height =
            maxAllowed /
            ratio;

    }


    object.style.left =
        (
            canvas.clientWidth / 2
        ) + "px";


    object.style.top =
        (
            canvas.clientHeight / 2
        ) + "px";


    object.style.width =
        tattooEditorState.width +
        "px";


    object.style.height =
        tattooEditorState.height +
        "px";


    applyTattooTransform();

}


/* ==================================================
   UPDATE ZONE
================================================== */

function updateTattooEditorZone(
    zone
) {

    if (!zone) {

        return;

    }


    updateZoneNamesEditor(
        zone
    );


    let selectedElement =
        null;


    if (
        typeof getSelectedZoneElement ===
        "function"
    ) {

        selectedElement =
            getSelectedZoneElement();

    }


    /*
     * UN SOLO PREVIEW.
     */

    renderRealZonePreview(
        selectedElement
    );


    const empty =
        document.getElementById(
            "canvasEmpty"
        );


    if (empty) {

        if (
            tattooEditorState.hasImage
        ) {

            empty.style.display =
                "none";

        } else {

            empty.style.display =
                "flex";


            const title =
                empty.querySelector(
                    "strong"
                );


            const text =
                empty.querySelector(
                    "small"
                );


            if (title) {

                title.textContent =
                    "Sube tu diseño";

            }


            if (text) {

                text.textContent =
                    "La zona seleccionada aparecerá ampliada aquí.";

            }

        }

    }


    if (
        tattooEditorState.hasImage
    ) {

        centerTattoo();

    }


    updateTattooEditorMeasurements();

}


/* ==================================================
   UPDATE ZONE NAMES
================================================== */

function updateZoneNamesEditor(
    zone
) {

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


    if (selectedZoneLarge) {

        selectedZoneLarge.textContent =
            zone;

    }


    if (canvasZoneName) {

        canvasZoneName.textContent =
            zone;

    }


    if (miniZoneName) {

        miniZoneName.textContent =
            zone;

    }

}


/* ==================================================
   CLEAR PREVIEW
================================================== */

function clearRealZonePreview() {

    const preview =
        document.getElementById(
            "zonePreview"
        );


    if (!preview) {

        return;

    }


    preview.innerHTML = "";

    preview.className =
        "zone-preview real-zone-preview";

}


/* ==================================================
   REAL ZONE PREVIEW
================================================== */

function renderRealZonePreview(
    zoneElement
) {

    const preview =
        document.getElementById(
            "zonePreview"
        );


    if (!preview) {

        return;

    }


    /*
     * ELIMINAR TODO EL CONTENIDO ANTERIOR.
     *
     * Esto garantiza que nunca se apilen
     * dos previews.
     */

    preview.replaceChildren();


    preview.className =
        "zone-preview real-zone-preview";


    if (!zoneElement) {

        return;

    }


    const originalSVG =
        zoneElement.ownerSVGElement;


    if (!originalSVG) {

        return;

    }


    let bbox;


    try {

        bbox =
            zoneElement.getBBox();

    } catch (error) {

        console.warn(
            "No se pudo obtener la geometría de la zona.",
            error
        );

        return;

    }


    if (
        !bbox ||
        bbox.width <= 0 ||
        bbox.height <= 0
    ) {

        return;

    }


    const SVG_NS =
        "http://www.w3.org/2000/svg";


    /*
     * Crear SVG aislado.
     */

    const previewSVG =
        document.createElementNS(
            SVG_NS,
            "svg"
        );


    previewSVG.classList.add(
        "zone-preview-svg"
    );


    previewSVG.setAttribute(
        "viewBox",
        `0 0 ${bbox.width} ${bbox.height}`
    );


    previewSVG.setAttribute(
        "preserveAspectRatio",
        "xMidYMid meet"
    );


    previewSVG.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
     * Grupo normalizador.
     */

    const group =
        document.createElementNS(
            SVG_NS,
            "g"
        );


    group.setAttribute(
        "transform",
        `translate(${-bbox.x}, ${-bbox.y})`
    );


    /*
     * Clonar SOLO la zona.
     */

    const clonedZone =
        zoneElement.cloneNode(true);


    /*
     * Limpiar atributos.
     */

    clonedZone.removeAttribute(
        "id"
    );


    clonedZone.removeAttribute(
        "tabindex"
    );


    clonedZone.removeAttribute(
        "role"
    );


    clonedZone.removeAttribute(
        "aria-label"
    );


    clonedZone.removeAttribute(
        "data-zone"
    );


    clonedZone.classList.remove(
        "selected"
    );


    /*
     * Aplicar estilo.
     */

    applyPreviewStyle(
        clonedZone
    );


    group.appendChild(
        clonedZone
    );


    previewSVG.appendChild(
        group
    );


    preview.appendChild(
        previewSVG
    );


    /*
     * Protección adicional:
     * solamente UN SVG.
     */

    const allPreviewSVGs =
        preview.querySelectorAll(
            ".zone-preview-svg"
        );


    if (
        allPreviewSVGs.length > 1
    ) {

        for (
            let i = 1;
            i < allPreviewSVGs.length;
            i++
        ) {

            allPreviewSVGs[i].remove();

        }

    }

}


/* ==================================================
   PREVIEW STYLE
================================================== */

function applyPreviewStyle(
    element
) {

    if (!element) {

        return;

    }


    element.style.fill =
        "rgba(214,179,106,0.20)";


    element.style.stroke =
        "#d6b36a";


    element.style.strokeWidth =
        "3";


    element.style.vectorEffect =
        "non-scaling-stroke";


    element.style.pointerEvents =
        "none";


    element
        .querySelectorAll(
            "path, polygon, ellipse, rect"
        )
        .forEach(
            function (shape) {

                shape.style.fill =
                    "rgba(214,179,106,0.20)";


                shape.style.stroke =
                    "#d6b36a";


                shape.style.strokeWidth =
                    "3";


                shape.style.vectorEffect =
                    "non-scaling-stroke";


                shape.style.pointerEvents =
                    "none";

            }
        );

}


/* ==================================================
   DRAGGING
================================================== */

function setupDragging() {

    const object =
        document.getElementById(
            "tattooObject"
        );


    if (!object) {

        return;

    }


    object.addEventListener(
        "pointerdown",
        function (event) {

            if (
                event.target.closest(
                    ".resize-handle"
                )
            ) {

                return;

            }


            if (
                !tattooEditorState.hasImage
            ) {

                return;

            }


            event.preventDefault();


            tattooEditorState.dragging =
                true;


            tattooEditorState.startX =
                event.clientX;


            tattooEditorState.startY =
                event.clientY;


            tattooEditorState.startLeft =
                object.offsetLeft;


            tattooEditorState.startTop =
                object.offsetTop;


            object.setPointerCapture(
                event.pointerId
            );

        }
    );


    object.addEventListener(
        "pointermove",
        function (event) {

            if (
                !tattooEditorState.dragging
            ) {

                return;

            }


            const dx =
                event.clientX -
                tattooEditorState.startX;


            const dy =
                event.clientY -
                tattooEditorState.startY;


            let newLeft =
                tattooEditorState.startLeft +
                dx;


            let newTop =
                tattooEditorState.startTop +
                dy;


            /*
             * Mantener una parte del tattoo
             * dentro del canvas.
             */

            const canvas =
                document.getElementById(
                    "tattooCanvas"
                );


            if (canvas) {

                const margin = 20;


                const minLeft =
                    margin;


                const maxLeft =
                    canvas.clientWidth -
                    margin;


                const minTop =
                    margin;


                const maxTop =
                    canvas.clientHeight -
                    margin;


                newLeft =
                    Math.max(
                        minLeft,
                        Math.min(
                            maxLeft,
                            newLeft
                        )
                    );


                newTop =
                    Math.max(
                        minTop,
                        Math.min(
                            maxTop,
                            newTop
                        )
                    );

            }


            object.style.left =
                newLeft + "px";


            object.style.top =
                newTop + "px";

        }
    );


    object.addEventListener(
        "pointerup",
        function (event) {

            tattooEditorState.dragging =
                false;


            try {

                object.releasePointerCapture(
                    event.pointerId
                );

            } catch (error) {

                /* Sin acción */

            }


            updateTattooEditorMeasurements();

        }
    );


    object.addEventListener(
        "pointercancel",
        function () {

            tattooEditorState.dragging =
                false;

        }
    );

}


/* ==================================================
   RESIZING
================================================== */

function setupResizing() {

    const handles =
        document.querySelectorAll(
            ".resize-handle"
        );


    const object =
        document.getElementById(
            "tattooObject"
        );


    if (
        !object ||
        !handles.length
    ) {

        return;

    }


    handles.forEach(
        function (handle) {

            handle.addEventListener(
                "pointerdown",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    tattooEditorState.resizing =
                        true;


                    tattooEditorState.resizeHandle =
                        handle.dataset.handle;


                    tattooEditorState.startX =
                        event.clientX;


                    tattooEditorState.startY =
                        event.clientY;


                    tattooEditorState.startWidth =
                        object.offsetWidth;


                    tattooEditorState.startHeight =
                        object.offsetHeight;


                    handle.setPointerCapture(
                        event.pointerId
                    );

                }
            );


            handle.addEventListener(
                "pointermove",
                function (event) {

                    if (
                        !tattooEditorState.resizing
                    ) {

                        return;

                    }


                    resizeTattoo(
                        event
                    );

                }
            );


            handle.addEventListener(
                "pointerup",
                function (event) {

                    tattooEditorState.resizing =
                        false;


                    try {

                        handle.releasePointerCapture(
                            event.pointerId
                        );

                    } catch (error) {

                        /* Sin acción */

                    }


                    updateTattooEditorMeasurements();

                }
            );


            handle.addEventListener(
                "pointercancel",
                function () {

                    tattooEditorState.resizing =
                        false;

                }
            );

        }
    );

}


/* ==================================================
   RESIZE
================================================== */

function resizeTattoo(
    event
) {

    const object =
        document.getElementById(
            "tattooObject"
        );


    if (!object) {

        return;

    }


    const dx =
        event.clientX -
        tattooEditorState.startX;


    const ratio =
        tattooEditorState.startWidth /
        tattooEditorState.startHeight;


    let newWidth;


    if (
        tattooEditorState.resizeHandle ===
        "se" ||
        tattooEditorState.resizeHandle ===
        "ne"
    ) {

        newWidth =
            tattooEditorState.startWidth +
            dx;

    } else {

        newWidth =
            tattooEditorState.startWidth -
            dx;

    }


    /*
     * Límites.
     */

    newWidth =
        Math.max(
            TATTOO_MIN_SIZE,
            Math.min(
                TATTOO_MAX_SIZE,
                newWidth
            )
        );


    /*
     * Mantener proporción.
     */

    const newHeight =
        newWidth /
        ratio;


    object.style.width =
        newWidth + "px";


    object.style.height =
        newHeight + "px";


    tattooEditorState.width =
        newWidth;


    tattooEditorState.height =
        newHeight;


    updateTattooEditorMeasurements();

}


/* ==================================================
   MEASUREMENTS
================================================== */

function updateTattooEditorMeasurements() {

    if (
        !tattooEditorState.hasImage
    ) {

        setMeasurement(
            "tattooWidth",
            "—"
        );


        setMeasurement(
            "tattooHeight",
            "—"
        );


        setMeasurement(
            "tattooCategory",
            "—"
        );


        return;

    }


    let currentZone =
        null;


    if (
        typeof selectedZone !==
        "undefined"
    ) {

        currentZone =
            selectedZone;

    }


    const physical =
        zonePhysicalSizes[
            currentZone
        ];


    let widthCm;

    let heightCm;


    if (physical) {

        /*
         * Referencia física aproximada
         * de la zona.
         */

        const pixelsPerCm =
            300 /
            physical.height;


        widthCm =
            tattooEditorState.width /
            pixelsPerCm;


        heightCm =
            tattooEditorState.height /
            pixelsPerCm;

    } else {

        widthCm =
            tattooEditorState.width /
            12;


        heightCm =
            tattooEditorState.height /
            12;

    }


    tattooEditorState.widthCm =
        widthCm;


    tattooEditorState.heightCm =
        heightCm;


    setMeasurement(
        "tattooWidth",
        widthCm.toFixed(1) + " cm"
    );


    setMeasurement(
        "tattooHeight",
        heightCm.toFixed(1) + " cm"
    );


    updateCategory();

}


/* ==================================================
   CATEGORY
================================================== */

function updateCategory() {

    const largest =
        Math.max(
            tattooEditorState.widthCm,
            tattooEditorState.heightCm
        );


    let category;


    if (
        largest <= 10
    ) {

        category =
            "Pequeño";

    } else if (
        largest <= 20
    ) {

        category =
            "Mediano";

    } else if (
        largest <= 30
    ) {

        category =
            "Grande";

    } else {

        category =
            "Extra grande";

    }


    tattooEditorState.category =
        category;


    setMeasurement(
        "tattooCategory",
        category
    );


    updatePrice();

}


/* ==================================================
   PRICE
================================================== */

function updatePrice() {

    if (
        typeof calculateTattooPrice !==
        "function"
    ) {

        return;

    }


    let zone =
        null;


    if (
        typeof selectedZone !==
        "undefined"
    ) {

        zone =
            selectedZone;

    }


    const category =
        categoryToKey(
            tattooEditorState.category
        );


    const price =
        calculateTattooPrice(
            category,
            zone
        );


    setMeasurement(
        "price",
        "$" + price
    );

}


/* ==================================================
   CATEGORY KEY
================================================== */

function categoryToKey(
    category
) {

    switch (category) {

        case "Pequeño":

            return "pequeno";


        case "Mediano":

            return "mediano";


        case "Grande":

            return "grande";


        case "Extra grande":

            return "extraGrande";


        default:

            return "mediano";

    }

}


/* ==================================================
   ROTATION
================================================== */

function setupRotation() {

    const leftButton =
        document.getElementById(
            "rotateLeftButton"
        );


    const rightButton =
        document.getElementById(
            "rotateRightButton"
        );


    if (leftButton) {

        leftButton.addEventListener(
            "click",
            function () {

                rotateTattoo(
                    -TATTOO_ROTATION_STEP
                );

            }
        );

    }


    if (rightButton) {

        rightButton.addEventListener(
            "click",
            function () {

                rotateTattoo(
                    TATTOO_ROTATION_STEP
                );

            }
        );

    }

}


/* ==================================================
   ROTATE TATTOO
================================================== */

function rotateTattoo(
    degrees
) {

    if (
        !tattooEditorState.hasImage
    ) {

        return;

    }


    tattooEditorState.rotation +=
        degrees;


    tattooEditorState.rotation =
        (
            tattooEditorState.rotation %
            360 +
            360
        ) % 360;


    applyTattooTransform();

    updateRotationDisplay();

}


/* ==================================================
   APPLY TRANSFORM
================================================== */

function applyTattooTransform() {

    const object =
        document.getElementById(
            "tattooObject"
        );


    if (!object) {

        return;

    }


    object.style.transform =
        "translate(-50%, -50%) " +
        "rotate(" +
        tattooEditorState.rotation +
        "deg)";

}


/* ==================================================
   ROTATION DISPLAY
================================================== */

function updateRotationDisplay() {

    const rotationValue =
        document.getElementById(
            "rotationValue"
        );


    if (!rotationValue) {

        return;

    }


    rotationValue.textContent =
        tattooEditorState.rotation +
        "°";

}


/* ==================================================
   HELPER
================================================== */

function setMeasurement(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}
