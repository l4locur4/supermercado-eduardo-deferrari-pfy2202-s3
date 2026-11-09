import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home({ productos }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')

  const categorias = ['Todas', ...new Set(productos.map(p => p.tipo))]

  const productosFiltrados = categoriaSeleccionada === 'Todas' 
    ? productos 
    : productos.filter(p => p.tipo === categoriaSeleccionada)

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">🏠 Inventario Actual del Supermercado</h2>
          <p className="text-slate-600 text-sm">Haz clic en cualquier producto para ver su detalle y comprarlo:</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="filtro-cat" className="text-sm font-semibold text-slate-700">Filtrar:</label>
          <select 
            id="filtro-cat"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="p-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none shadow-sm"
          >
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm font-medium">
          No hay productos registrados en esta categoría.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white text-sm">
                <th className="p-3">Nombre</th>
                <th className="p-3">Marca</th>
                <th className="p-3">Tipo</th>
                <th className="p-3 text-right">Precio ($)</th>
                <th className="p-3 text-right">Stock</th>
                <th className="p-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {productosFiltrados.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold text-slate-800">
                    <Link to={`/producto/${prod.id}`} className="text-blue-600 hover:underline">
                      {prod.nombre}
                    </Link>
                  </td>
                  <td className="p-3 text-slate-600">{prod.marca}</td>
                  <td className="p-3">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {prod.tipo}
                    </span>
                  </td>
                  <td className="p-3 text-right font-medium text-slate-800">${prod.precio}</td>
                  <td className="p-3 text-right text-slate-800">{prod.stock}</td>
                  <td className="p-3 text-center">
                    <Link 
                      to={`/producto/${prod.id}`}
                      className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
                    >
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}