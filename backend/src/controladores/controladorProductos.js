const productos = require('../modelos/productos')

exports.crearProducto = async(req,res) =>{
    try{
        const nuevoProducto = new productos(req.body)
        await nuevoProducto.save()
        res.status(201).json(nuevoProducto)
    }catch(error){
        res.status(500).json({ mensaje: 'Error al crear el producto: ', error: error.message})
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        // Renombra la variable local para evitar conflictos
        const listaProductos = await productos.find().populate('categoria');
        res.status(200).json(listaProductos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos',
            error: error.message
        });
    }
};


exports.actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await productos.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        await productos.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
    }
};