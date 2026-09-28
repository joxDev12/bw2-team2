require("dotenv").config();

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const isUniqueError = err.code === "23505";
    const isCorsError = Boolean(
        err.message &&
        (err.message.includes("CORS") ||
            err.message.includes("Origine non consentita")),
    );
    const isJsonParseError =
        err instanceof SyntaxError &&
        (err.status === 400 || err.statusCode === 400) &&
        "body" in err;

    const status =
        err.statusCode ||
        err.status ||
        (isCorsError
            ? 403
            : err.name === "MulterError" || isUniqueError || isJsonParseError
                ? 400
                : 500);

    let messaggio = err.message || "Errore interno del server";

    if (isCorsError) {
        messaggio = err.message || "Origine non consentita dalle policy CORS";
    } else if (isJsonParseError) {
        messaggio = "Formato JSON non valido nel corpo della richiesta";
    } else if (err.code === "LIMIT_FILE_SIZE") {
        messaggio = "Il file non puo superare 5 MB";
    } else if (isUniqueError && err.constraint?.includes("email")) {
        messaggio = "Email gia presente";
    } else if (isUniqueError && err.constraint?.includes("username")) {
        messaggio = "Username gia presente";
    } else if (
        isUniqueError &&
        (err.constraint?.includes("user_event") ||
            err.constraint?.includes("registrations"))
    ) {
        messaggio = "Sei gia registrato a questo evento";
    }

    if (process.env.NODE_ENV !== "production") {
        console.error(`[${new Date().toISOString()}] ${status} - ${messaggio}`);
        if (status === 500) console.error(err.stack);
    }

    res.status(status).json({ successo: false, errore: messaggio });
};

module.exports = errorHandler;