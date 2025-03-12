const { body, validationResult } = require("express-validator");

const validateBar = [
    body("nom").notEmpty().withMessage("Le nom est requis").isString().withMessage("Le nom doit etre un string").trim(),

    body("adresse").notEmpty().withMessage("Le prix doit floaté positif").isString().trim(),

    body("tel")
        .optional()
        .matches(/^0[1-9](?: [0-9]{2}){4}$/)
        .withMessage("Le numéro de téléphone doit être valide, par exemple: 06 70 40 21 09")
        .trim(),

    body("email").notEmpty().isEmail().withMessage("L'adresse e-mail doit être valide").trim(),

    body("description").optional().isString().withMessage("La description doit etre un string").trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors) return res.status(400).json({ errors });
        next();
    },
];

module.exports = { validateBar };
