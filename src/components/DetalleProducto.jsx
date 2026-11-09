import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function DetalleProducto({ productos, onAgregarAlCarrito }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cantidad, setCantidad] = useState(1)

  // Buscar el producto en base al ID de la URL (convertido a número)
  const producto = productos.find(p => p.id === Number(id))

  if (!producto) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-red-600 mb-2">Producto no encontrado</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 underline text-sm">Volver al Inventario</button>
      </div>
    )
  }

  const handleComprar = (e) => {
    e.preventDefault()
    const exito = onAgregarAlCarrito(producto, Number(cantidad))
    if (exito) {
      navigate('/carrito')
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">📦 Detalle del Producto</h2>
      
      <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
        <p><strong className="text-slate-700">Nombre:</strong> <span className="text-slate-900 font-semibold">{producto.nombre}</span></p>
        <p><strong className="text-slate-700">Marca:</strong> <span className="text-slate-600">{producto.marca}</span></p>
        <p><strong className="text-slate-700">Categoría:</strong> <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">{producto.tipo}</span></p>
        <p><strong className="text-slate-700">Precio unitario:</strong> <span className="text-slate-900 font-medium">${producto.precio}</span></p>
        <p><strong className="text-slate-700">Stock disponible:</strong> <span className={`font-bold ${producto.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{producto.stock} unidades</span></p>
      </div>

      {producto.stock > 0 ? (
        <form onSubmit={handleComprar} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Cantidad a llevar:</label>
            <input 
              type="number" 
              min="1" 
              max={producto.stock} 
              value={cantidad} 
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-500 transition text-sm shadow-md cursor-pointer"
          >
            🛒 Agregar al Carrito (Descuenta Stock)
          </button>
        </form>
      ) : (
        <p className="text-red-600 font-semibold text-center py-2">Producto agotado temporalmente.</p>
      )}

      <div className="mt-4 text-center">
        <button onClick={() => navigate('/')} className="text-slate-600 hover:underline text-sm font-medium">
          ← Volver al listado
        </button>
      </div>
    </div>
  )
}