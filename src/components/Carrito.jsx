import { Link } from 'react-router-dom'

export default function Carrito({ carrito, onActualizarCantidad }) {
  const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">🛒 Carrito de Compras</h2>
      <p className="text-slate-600 mb-6 text-sm">Gestiona los artículos seleccionados y ajusta las cantidades si lo deseas:</p>

      {carrito.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-600 mb-4 text-sm font-medium">Tu carrito está vacío.</p>
          <Link to="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
            Ir a comprar al inventario
          </Link>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-sm">
                  <th className="p-3">Producto</th>
                  <th className="p-3">Precio Unitario</th>
                  <th className="p-3 text-center">Cantidad</th>
                  <th className="p-3 text-right">Subtotal</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {carrito.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-semibold text-slate-800">{item.nombre}</td>
                    <td className="p-3 text-slate-600">${item.precio}</td>
                    <td className="p-3 text-center font-bold text-slate-800">{item.cantidad}</td>
                    <td className="p-3 text-right font-medium text-slate-800">${item.precio * item.cantidad}</td>
                    <td className="p-3 text-center space-x-2">
                      <button 
                        onClick={() => onActualizarCantidad(item.id, 1)}
                        className="bg-emerald-600 text-white px-2.5 py-1 rounded text-xs font-bold hover:bg-emerald-500 transition cursor-pointer"
                        title="Aumentar cantidad (resta stock bodega)"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => onActualizarCantidad(item.id, -1)}
                        className="bg-amber-600 text-white px-2.5 py-1 rounded text-xs font-bold hover:bg-amber-500 transition cursor-pointer"
                        title="Disminuir cantidad (devuelve stock bodega)"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-lg font-bold text-slate-800">Total a Pagar:</span>
            <span className="text-2xl font-extrabold text-blue-600">${totalPagar}</span>
          </div>
        </div>
      )}
    </div>
  )
}