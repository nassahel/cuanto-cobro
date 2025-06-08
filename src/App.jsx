import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { IoIosLaptop } from 'react-icons/io'
import { GiMoneyStack } from 'react-icons/gi'
import Navbar from './components/Navbar'

function App() {
  const [horas, setHoras] = useState(null)
  const [minutos, setMinutos] = useState(null)
  const [monto, setMonto] = useState(null)
  const [idle, setIdle] = useState(null)
  const [montoTotal, setMontoTotal] = useState(0)
  const [error, setError] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [local, setLocal] = useState(null)

  console.log(local);

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

  function limpiar() {
    setHoras(null)
    setMinutos(null)
    setMonto(null)
    setMontoTotal(0)
  }

  useEffect(() => {
    const loadLocalConfig = () => {
      const localData = JSON.parse(localStorage.getItem('calculadoraDeCobroConfig'))
      setLocal(localData)
      localData?.monto !== '' && setMonto(Number(localData.monto))
    }
    //para que los cambios que se hacen en el nav se reflejen automaticamente.
    loadLocalConfig();
    window.addEventListener("configChanged", loadLocalConfig);
    return () => window.removeEventListener("configChanged", loadLocalConfig);
  }, [])

  useEffect(() => {
    setMontoTotal((horas * monto + (minutos * monto / 60)) * (1 - idle / 100));
  }, [horas, monto, minutos, idle])


  return (
    <div className='bg-neutral-900 min-h-screen text-neutral-200 pt-2 px-6 flex flex-col'>
      <Navbar />
      <h1 className='text-center text-2xl mt-6 md:text-4xl font-semibold'>
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
        <div className='flex flex-col md:flex-row gap-4'>
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
          <div className='flex flex-col'>
            <label className={labelStyle} htmlFor="idle">Descuento por Idle (%):</label>
            <input
              onChange={e => setIdle(e.target.value === '' ? null : Number(e.target.value))}
              value={idle ?? ''}
              className={inputStyle}
              type="number"
              id='idle'
            />
          </div>
        </div>


        <div className='flex justify-between items-center'>
          <h2 className={labelStyle}>Resultados:</h2>
        </div>

        <div className='bg-neutral-800 rounded-lg w-full p-6 text-lg font-semibold flex flex-col justify-between '>
          <div ref={resultadoRef}>
            <p>Tiempo: <span className='font-normal ms-2'>
              {typeof horas === 'number' && horas > 0 && `${horas} Horas `}
              {typeof minutos === 'number' && minutos > 0 && `${minutos} Minutos`}
            </span> <br />
              Monto: <span className='font-normal ms-2'>
                {montoTotal > 0 && `${montoTotal.toFixed(2)} usd`}
              </span>


              {local?.email !== '' && <><br />Email: <span className='font-normal ms-2'>{local?.email}</span></>}
              {local?.binanceId !== '' && <><br />Binance ID: <span className='font-normal ms-2'>{local?.binanceId}</span></>}

            </p>
          </div>
        </div>

        <div className='flex gap-3'>
          <button
            onClick={copiarAlPortapapeles}
            className='bg-white text-neutral-800 mt-2 font-bold text-lg hover:bg-neutral-200 active:scale-95 duration-200 py-1 rounded cursor-pointer w-2/3'
          >
            Copiar
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
