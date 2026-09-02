/*
==================================================
TATTOO PRICING
==================================================
*/


const basePrices = {

    pequeno: 100,

    mediano: 150,

    grande: 250,

    extraGrande: 350

};


const zoneModifiers = {

    "Parte superior brazo derecho": 1.00,

    "Antebrazo derecho": 1.05,

    "Parte superior brazo izquierdo": 1.00,

    "Antebrazo izquierdo": 1.05,

    "Pecho": 1.15,

    "Espalda": 1.30,

    "Muslo derecho": 1.15,

    "Muslo izquierdo": 1.15,

    "Pantorrilla derecha": 1.10,

    "Pantorrilla izquierda": 1.10

};


function calculateTattooPrice(
    category,
    zone
) {

    const base =
        basePrices[category] ||
        basePrices.mediano;


    const modifier =
        zoneModifiers[zone] ||
        1;


    return Math.round(
        base * modifier
    );

}
