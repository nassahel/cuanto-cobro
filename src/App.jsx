import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { IoIosLaptop } from 'react-icons/io'
import { GiMoneyStack } from 'react-icons/gi'

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

  function calcular() {
    if (
      horas !== null && horas >= 0 &&
      minutos !== null && minutos >= 0 && minutos <= 60 &&
      monto !== null && monto >= 0
    ) {
      setMontoTotal(horas * monto + (minutos * monto / 60))
      setError("")
    } else {
      setError("Hay valores que no son correctos")
      setTimeout(() => setError(""), 3000)
    }
  }

  function limpiar() {
    setHoras(null)
    setMinutos(null)
    setMonto(null)
    setMontoTotal(0)
  }

  return (
    <div className='bg-neutral-900 min-h-screen text-neutral-200 pt-10 pb-2 px-6 flex flex-col'>
      <h1 className='text-center text-2xl md:text-4xl font-semibold'>
        <GiMoneyStack className='inline' /> Calculadora de cobro <GiMoneyStack className='inline' />
      </h1>

      <div className='flex flex-col w-full lg:w-fit mx-auto my-20'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex flex-col'>
            <label className={labelStyle} htmlFor="horasTrabajadas">Horas:</label>
            <input
              onChange={e => setHoras(e.target.value === '' ? null : Number(e.target.value))}
              value={horas ?? ''}
              className={inputStyle}
              type="number"
              id='horasTrabajadas'
            />
          </div>

          <div className='flex flex-col'>
            <label className={labelStyle} htmlFor="minutos">Minutos:</label>
            <input
              onChange={e => setMinutos(e.target.value === '' ? null : Number(e.target.value))}
              value={minutos ?? ''}
              className={inputStyle}
              type="number"
              id='minutos'
              max={60}
            />
          </div>
        </div>

        <div className='flex flex-col'>
          <label className={labelStyle} htmlFor="montoHora">Monto por hora (USD):</label>
          <input
            onChange={e => setMonto(e.target.value === '' ? null : Number(e.target.value))}
            value={monto ?? ''}
            className={inputStyle}
            type="number"
            id='montoHora'
          />
        </div>

        <div className='flex justify-between items-center'>
          <h2 className={labelStyle}>Resultados:</h2>
        </div>

        <div className='bg-neutral-800 h-40 rounded-lg w-full p-6 text-lg font-semibold flex flex-col justify-between '>
          <div ref={resultadoRef}>
            <p>Tiempo: <span className='font-normal ms-2'>
              {typeof horas === 'number' && horas > 0 && `${horas} Horas `}
              {typeof minutos === 'number' && minutos > 0 && `${minutos} Minutos`}
            </span> <br />
              Monto: <span className='font-normal ms-2'>
                {montoTotal > 0 && `${montoTotal.toFixed(2)} usd`}
              </span>
            </p>
          </div>

          <button
            onClick={copiarAlPortapapeles}
            className='bg-neutral-500 hover:bg-neutral-600 duration-200 text-black text-sm px-3 py-1 rounded cursor-pointer w-fit ms-auto'
          >
            Copiar
          </button>
        </div>

        <div className='flex gap-3'>
          <button
            onClick={calcular}
            className='bg-white text-neutral-800 mt-2 font-bold text-lg hover:bg-neutral-200 active:scale-95 duration-200 py-1 rounded cursor-pointer w-2/3'
          >
            Calcular
          </button>
          <button
            onClick={limpiar}
            className='bg-neutral-400 text-neutral-800 mt-2 font-bold text-lg hover:bg-neutral-300 active:scale-95 duration-200 py-1 rounded cursor-pointer w-1/3'
          >
            Limpiar
          </button>
        </div>

        {copiado && <p className='text-green-400 mt-2'>¡Copiado al portapapeles!</p>}
        <p className='text-red-500 italic'>{error}</p>
      </div>

      <p className='mt-auto text-end italic text-neutral-400'>
        © By Nassa Elias. <IoIosLaptop className='inline' />
      </p>
    </div>
  )
}

export default App
