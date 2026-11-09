import { useState } from 'react'

export default function Contact() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">📞 Contáctanos</h2>
      <p className="text-slate-600 mb-6 text-sm">¿Tienes dudas o sugerencias sobre el stock? Escríbenos:</p>

      {enviado ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl font-medium">
          ¡Mensaje enviado con éxito! Te responderemos pronto.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre:</label>
            <input 
              type="text" 
              placeholder="Tu nombre..." 
              required 
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correo electrónico:</label>
            <input 
              type="email" 
              placeholder="tu.correo@duocuc.cl" 
              required 
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm shadow-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Mensaje:</label>
            <textarea 
              placeholder="Escribe tu consulta aquí..." 
              rows="4" 
              required 
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm shadow-sm"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white font-semibold py-2.5 rounded-lg hover:bg-slate-800 transition shadow-md cursor-pointer text-sm"
          >
            Enviar Mensaje
          </button>
        </form>
      )}
    </div>
  )
}