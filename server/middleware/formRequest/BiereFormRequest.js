const { body, validationResult } = require("express-validator");

const validateBiere = [
    body("nom").notEmpty().withMessage("Ajoute un nom à ta bière !").isString().withMessage("Ton nom doit être une chaîne de caractère").trim(),

    body("degree").notEmpty().withMessage("Ajoute un degré d'alcool !").isFloat().withMessage("Ajoute un nombre (float) à ton degré d'alcool").trim(),

    body("prix")
        .notEmpty()
        .withMessage("Y'a pas de prix !")
        .isFloat({ min: 0 })
        .withMessage("Ton prix ne peut pas être moins cher que gratuit enfin.")
        .trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        next();
    },
];

module.exports = { validateBiere };
