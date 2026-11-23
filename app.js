const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto

app.post('/productos', (req, res)=>{

    const {nombre, descripcion, precio } = req.body

     const precioNumerico = parseFloat(precio)

    if(!nombre || !descripcion || isNaN(precioNumerico) || precioNumerico <= 0)
    {
        return res.status(400).json({mensaje: 'La peticion tiene campos vacios'})
    }

    const idAgregado = productos.length > 0 ? Math.max(...productos.map(p=>p.id)) + 1 : 1

    const nuevoProducto = 
    {
        id: idAgregado,
        nombre,
        descripcion,
        precio: precioNumerico
    }

    productos.push(nuevoProducto)

    return res.status(201).json(nuevoProducto)


})
// TODO: PUT /productos/:id - Actualizar producto

app.put('/productos/:id', (req, res) =>
{

    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p=> p.id===id)
    const {nombre, descripcion, precio} = req.body

    if(indice < 0)
    {
        return res.status(404).json({mensaje: 'Id no existe'})
    }

    const precioNumerico = parseFloat(precio)

    if(!nombre || !descripcion || isNaN(precioNumerico) || precioNumerico <= 0)
    {
        return res.status(400).json({mensaje: 'Los datos no pueden estar vacios'})
    }

    productos[indice].nombre = nombre
    productos[indice].descripcion = descripcion
    productos[indice].precio = precioNumerico

    return res.status(200).json(productos[indice])
})

// TODO: DELETE /productos/:id - Eliminar producto

app.delete('/productos/:id', (req,res) => 
{
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p=> p.id === id)

    if(indice<0)
    {
        return res.status(404).json({mensaje: 'Producto no disponible o ya eliminado'})
    }

    const productoEliminado = productos[indice]
    productos.splice(indice, 1)
    return res.json({mensaje: 'producto eliminado', producto: productoEliminado})

})


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
