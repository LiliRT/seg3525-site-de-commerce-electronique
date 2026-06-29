export function validateShipping(data) {

    const errors = {};

    if (!data.name) errors.name = "Nom requis";
    if (!data.address) errors.address = "Adresse requise";
    if (!data.city) errors.city = "Ville requise";
    if (!data.zip) errors.zip = "Code postal requis";

    return errors;
}

export function validatePayment(data) {

    const errors = {};

    if (!data.card) errors.card = "Carte requise";
    if (!data.exp) errors.exp = "Expiration requise";
    if (!data.cvc) errors.cvc = "CVC requis";

    return errors;
}