const { body, validationResult } = require("express-validator");

const validateCommande = [
    body("nom").notEmpty().withMessage("Le nom est requis").isString().withMessage("Le nom doit etre un string").trim(),

    body("prix").notEmpty().isFloat({ gt: 0 }).withMessage("Le prix doit floaté positif").trim(),

    body("date")
        .notEmpty()
        .isDate()
        .withMessage("La date doit etre valide")
        .custom((value) => {
            const inputDate = new Date(value);
            const currentDate = new Date();
            if (inputDate > currentDate) {
                throw new Error("La date ne peut pas etre dans le futur");
            }
            return true;
        })
        .trim(),

    body("status")
        .notEmpty()
        .isString()
        .withMessage("Le status doit être une chaîne de caractères")
        .isIn(["brouillon", "en cours", "terminée"])
        .withMessage("Le status doit être 'brouillon', 'en cours', ou 'terminée'")
        .trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors) return res.status(400).json({ errors });
        next();
    },
];

module.exports = { validateCommande };
