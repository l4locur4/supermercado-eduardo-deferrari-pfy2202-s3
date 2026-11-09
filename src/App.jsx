import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import AgregarProducto from './components/AgregarProducto'
import DetalleProducto from './components/DetalleProducto'
import Carrito from './components/Carrito'

function App() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Leche Entera 1L', marca: 'Colun', tipo: 'Lácteos', precio: 1200, stock: 25 },
    { id: 2, nombre: 'Arroz Grado 1 1kg', marca: 'Tucapel', tipo: 'Abarrotes', precio: 1450, stock: 40 }
  ])

  // Estado del carrito de compras
  const [carrito, setCarrito] = useState([])

  const agregarProducto = (nuevoProd) => {
    setProductos([...productos, { id: Date.now(), ...nuevoProd }])
  }

  // Función para agregar un producto al carrito y restar stock del inventario
  const agregarAlCarrito = (producto, cantidadDeseada) => {
    if (producto.stock < cantidadDeseada) {
      alert('No hay suficiente stock disponible en bodega.')
      return false
    }

    // Restar stock en el inventario general
    setProductos(productos.map(p => 
      p.id === producto.id ? { ...p, stock: p.stock - cantidadDeseada } : p
    ))

    // Agregar o actualizar en el carrito
    const enCarrito = carrito.find(item => item.id === producto.id)
    if (enCarrito) {
      setCarrito(carrito.map(item => 
        item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidadDeseada } : item
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: cantidadDeseada }])
    }
    return true
  }

  // Función para modificar cantidades desde la pantalla del Carrito (aumentar/disminuir)
  const actualizarCantidadCarrito = (id, delta) => {
    const itemEnCarrito = carrito.find(item => item.id === id)
    const productoOriginal = productos.find(p => p.id === id)

    if (!itemEnCarrito) return

    const nuevaCantidad = itemEnCarrito.cantidad + delta

    if (nuevaCantidad <= 0) {
      // Si llega a 0, devolvemos todo el stock al inventario y removemos del carrito
      setProductos(productos.map(p => p.id === id ? { ...p, stock: p.stock + itemEnCarrito.cantidad } : p))
      setCarrito(carrito.filter(item => item.id !== id))
    } else if (delta > 0) {
      // Si quiere aumentar, verificamos si hay stock en bodega
      if (productoOriginal.stock < delta) {
        alert('Stock insuficiente en bodega.')
        return
      }
      setProductos(productos.map(p => p.id === id ? { ...p, stock: p.stock - delta } : p))
      setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
    } else if (delta < 0) {
      // Si quiere disminuir, devolvemos 1 unidad al stock de bodega
      setProductos(productos.map(p => p.id === id ? { ...p, stock: p.stock + 1 } : p))
      setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          <header className="w-full">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60" 
              alt="Supermercado" 
              className="w-full h-48 object-cover"
            />
          </header>

          <nav className="bg-slate-900 p-4 flex flex-wrap justify-center gap-3 shadow-md">
            <Link to="/" className="text-white bg-slate-800 hover:bg-slate-700 font-medium px-4 py-2 rounded-lg transition text-sm">
              🏠 Inventario
            </Link>
            <Link to="/agregar" className="text-white bg-slate-800 hover:bg-slate-700 font-medium px-4 py-2 rounded-lg transition text-sm">
              ➕ Agregar Producto
            </Link>
            <Link to="/carrito" className="text-white bg-blue-600 hover:bg-blue-500 font-medium px-4 py-2 rounded-lg transition text-sm flex items-center gap-1">
              🛒 Carrito ({carrito.reduce((acc, item) => acc + item.cantidad, 0)})
            </Link>
            <Link to="/about" className="text-white bg-slate-800 hover:bg-slate-700 font-medium px-4 py-2 rounded-lg transition text-sm">
              👥 Quiénes Somos
            </Link>
            <Link to="/contact" className="text-white bg-slate-800 hover:bg-slate-700 font-medium px-4 py-2 rounded-lg transition text-sm">
              📞 Contacto
            </Link>
          </nav>

          <main className="p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Home productos={productos} />} />
              <Route path="/agregar" element={<AgregarProducto onAgregar={agregarProducto} />} />
              <Route path="/producto/:id" element={<DetalleProducto productos={productos} onAgregarAlCarrito={agregarAlCarrito} />} />
              <Route path="/carrito" element={<Carrito carrito={carrito} onActualizarCantidad={actualizarCantidadCarrito} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

        </div>
      </div>
    </BrowserRouter>
  )
}

export default App