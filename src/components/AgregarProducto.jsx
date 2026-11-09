import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AgregarProducto({ onAgregar }) {
  const [nombre, setNombre] = useState('')
  const [marca, setMarca] = useState('')
  const [tipo, setTipo] = useState('Abarrotes')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Envía el nuevo artículo al estado principal de App.jsx
    onAgregar({
      nombre,
      marca,
      tipo,
      precio: Number(precio),
      stock: Number(stock)
    })

    // Redirige de vuelta al Home para ver la tabla actualizada
    navigate('/')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">📦 Ingresar Nuevo Artículo</h2>
      <p className="text-slate-600 mb-6">Completa el formulario para registrar un producto en el sistema del supermercado:</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Producto:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
            placeholder="Ej: Jugo Durazno 1.5L"
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Marca:</label>
          <input 
            type="text" 
            value={marca} 
            onChange={(e) => setMarca(e.target.value)} 
            required 
            placeholder="Ej: Watt's"
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Producto:</label>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-none bg-white"
          >
            <option value="Abarrotes">Abarrotes</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Limpieza">Limpieza</option>
            <option value="Frescos">Frescos</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Precio ($):</label>
            <input 
              type="number" 
              value={precio} 
              onChange={(e) => setPrecio(e.target.value)} 
              required 
              min="0"
              placeholder="1200"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Stock:</label>
            <input 
              type="number" 
              value={stock} 
              onChange={(e) => setStock(e.target.value)} 
              required 
              min="0"
              placeholder="20"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-none"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-slate-800 text-white font-semibold py-2.5 rounded-lg hover:bg-slate-700 transition cursor-pointer mt-4"
        >
          Guardar y Registrar Producto
        </button>
      </form>
    </div>
  )
}