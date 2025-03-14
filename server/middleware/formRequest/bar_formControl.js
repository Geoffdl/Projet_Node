const { body, validationResult } = require("express-validator");

const validateBar = [
    body("nom").notEmpty().withMessage("Le nom est requis").isString().withMessage("Le nom doit etre un string").trim(),

    body("adresse").notEmpty().withMessage("L'adresse doit etre précisée").isString().withMessage("L'adresse doit un string").trim(),

    body("tel")
        .optional()
        .isString()
        .withMessage("Le numéro de téléphone doit être une chaîne de caractères")
        .custom((value) => {
            const digitsOnly = value.replace(/\s/g, "");
            return /^0[1-9]\d{8}$/.test(digitsOnly);
        })
        .withMessage("Le numéro de téléphone doit être un numéro français valide (10 chiffres commençant par 0)")
        .trim(),

    body("email").notEmpty().isEmail().withMessage("L'adresse e-mail doit être valide").trim(),

    body("description").optional().isString().withMessage("La description doit etre un string").trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

const updateBar = [
    body("nom").optional().isString().withMessage("Le nom doit etre un string").trim(),

    body("adresse").optional().isString().withMessage("L'adresse doit etre un string").trim(),

    body("tel").optional().isNumeric().withMessage("Le numéro de téléphone doit être valide, par exemple: 06 70 40 21 09").trim(),

    body("email").optional().isEmail().withMessage("L'adresse e-mail doit être valide").trim(),

    body("description").optional().isString().withMessage("La description doit etre un string").trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

module.exports = { validateBar, updateBar };
