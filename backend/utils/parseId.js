/**
 * Converte un valore in un intero decimale positivo valido (base 10).
 * Lancia un errore con statusCode 400 se il valore è NaN, non intero, o <= 0.
 *
 * @param {string|number} value - Il valore da convertire
 * @param {string} [name='ID'] - Il nome del parametro per il messaggio di errore
 * @returns {number} L'ID numerico intero valido
 */
const parseId = (value, name = "ID") => {
    const str = String(value ?? "").trim();
    const parsed = parseInt(str, 10);

    if (!/^\d+$/.test(str) || Number.isNaN(parsed) || parsed <= 0) {
        const err = new Error(`${name} non valido`);
        err.statusCode = 400;
        throw err;
    }

    return parsed;
};

module.exports = parseId;