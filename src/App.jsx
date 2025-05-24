import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [horas, setHoras] = useState(null)
  const [minutos, setMinutos] = useState(null)
  const [monto, setMonto] = useState(null)
  const [montoTotal, setMontoTotal] = useState(0)
  const [error, setError] = useState('')
  const [copiado, setCopiado] = useState(false)

  const resultadoRef = useRef(null)

  const inputStyle = 'bg-neutral-800 py-2 px-4 rounded-md text-xl outline-none mb-8'
  const labelStyle = 'text-lg font-semibold'

  const copiarAlPortapapeles = async () => {
    try {
      const texto = resultadoRef.current.innerText
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Error al copiar: ', err)
    }
  }

  useEffect(() => {
    if (
      horas >= 0 &&
      minutos >= 0 &&
      minutos <= 60 &&
      monto >= 0
    ) {
      setMontoTotal(horas * monto + (minutos * monto / 60))
      setError("")
    } else {
      setError("Hay valores que no son correctos")
    }
  }, [horas, minutos, monto])

  return (
    <div className='bg-neutral-900 min-h-screen text-neutral-200 py-10 px-6'>
      <h1 className='text-center text-4xl font-semibold'>Calculadora de cobro</h1>
      <div className='flex flex-col lg:w-fit mx-auto my-24'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <label className={labelStyle} htmlFor="horasTrabajadas">Horas:</label>
            <input onChange={e => setHoras(e.target.value)} value={horas} className={inputStyle} type="number" placeholder='' id='horasTrabajadas' />
          </div>
          <div className='flex flex-col'>
            <label className={labelStyle} htmlFor="minutos">Minutos:</label>
            <input onChange={e => setMinutos(e.target.value)} value={minutos} className={inputStyle} type="number" placeholder='' id='minutos' max={60} />
          </div>
        </div>
        <div className='flex flex-col'>
          <label className={labelStyle} htmlFor="montoHora">Monto por hora (USD):</label>
          <input onChange={e => setMonto(e.target.value)} value={monto} className={inputStyle} type="number" placeholder='' id='montoHora' />
        </div>
        <div className='flex justify-between items-center'>
          <h2 className={labelStyle}>Resultados:</h2>
          <button onClick={copiarAlPortapapeles} className='bg-white text-black px-3 py-1 rounded cursor-pointer'>
            Copiar
          </button>
        </div>
        <div ref={resultadoRef} className='bg-neutral-800 h-40 rounded-lg w-full p-6 text-lg font-semibold'>
          <p>Tiempo: <span className='font-normal ms-2'>{horas || 0} Horas {minutos || 0} Minutos</span> <br /> Monto: <span className='font-normal ms-2'>{montoTotal.toFixed(2)} usd</span></p>
          {/* <p>Monto: <span className='font-normal ms-2'>{montoTotal.toFixed(2)} usd</span></p> */}
        </div>
        {copiado && <p className='text-green-400 mt-2'>¡Copiado al portapapeles!</p>}
        <p className='text-red-500 italic'>{error}</p>
      </div>
    </div>
  )
}

export default App
