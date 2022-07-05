const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const AllRecipe = require('./recipes');
const Types = require("./types")
const AllCreate = require("./create")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', AllRecipe);
router.use("/types", Types)
router.use("/create", AllCreate)


module.exports = router;
