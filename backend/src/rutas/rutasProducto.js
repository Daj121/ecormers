const express = require('express')
const router = express.Router()
const controladorProductos = require('../controladores/controladorProductos')

router.post('/', controladorProductos.crearProducto);
router.get('/', controladorProductos.obtenerProductos);
router.put('/:id', controladorProductos.actualizarProducto);
router.delete('/:id', controladorProductos.eliminarProducto);
module.exports = router