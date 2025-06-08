"use client"
import React, { useEffect, useState } from 'react'
import { IoCloseOutline, IoSettingsSharp } from "react-icons/io5";

const LOCAL_STORAGE_KEY = 'calculadoraDeCobroConfig';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [msg, setMsg] = useState('')
  const [config, setConfig] = useState({
    monto: '',
    email: '',
    binanceId: '',
    new: false,
  });


  const saveConfig = () => {
    if (isNaN(Number(config.monto))) {
      setMsg("Monto inválido");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    localStorage.setItem('calculadoraDeCobroConfig', JSON.stringify(config));
    window.dispatchEvent(new Event("configChanged"));
    setMsg("Cambios guardados.");
    setTimeout(() => setMsg(""), 3000);
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);



  return (
    <>
      <nav className="h-[4rem] w-full z-40 flex items-center justify-between px-4">
        <button onClick={() => setShowNav(true)} className="text-2xl text-white cursor-pointer hover:rotate-90 duration-200">
          <IoSettingsSharp />
        </button>

        <div className={`${showNav ? "w-full" : "w-0"} fixed top-0 z-40 bottom-0 left-0 right-0`}>
          <div onClick={() => setShowNav(false)} className={`${showNav ? "fixed" : "hidden"} bg-black/60 animate-appear top-0 bottom-0 left-0 right-0`} />

          <div className={`${showNav ? '' : '-translate-x-[20rem]'} duration-300 w-[20rem] bg-neutral-900 z-50 fixed top-0 bottom-0`}>
            <div onClick={() => setShowNav(false)} className="absolute top-2 right-2 border-2 border-neutral-600 p-1 rounded-md cursor-pointer">
              <IoCloseOutline />
            </div>

            <div className='p-6'>
              <h3 className='text-center font-bold'>Configuración</h3>
              <p className='text-sm italic mt-3'>Podés dejar guardado tu método de pago y pago por hora.</p>
              <p className='text-sm italic mt-3'>Estos datos solo quedan guardados en el Local Storage de tu navegador.</p>

              {/* Email */}
              <div className='mt-10 flex flex-col'>
                <input
                  type="text"
                  placeholder='email'
                  className='bg-neutral-800 py-2 px-4 rounded-md outline-none'
                  value={config.email}
                  onChange={e => setConfig({ ...config, email: e.target.value })}
                />
              </div>
              <div className='mt-4 flex flex-col'>
                <input
                  type="text"
                  placeholder='Binance ID'
                  className='bg-neutral-800 py-2 px-4 rounded-md outline-none'
                  value={config.binanceId}
                  onChange={e => setConfig({ ...config, binanceId: e.target.value })}
                />
              </div>
              <div className='mt-4 flex flex-col'>
                <input
                  type="text"
                  placeholder='USD por hora (ej: 3.5)'
                  className='bg-neutral-800 py-2 px-4 rounded-md outline-none'
                  value={config.monto}
                  onChange={e => setConfig({ ...config, monto: e.target.value })}
                />
              </div>
              <div className='flex justify-between mt-4'>
                <button onClick={saveConfig} className='bg-white text-neutral-800 mt-2 hover:bg-neutral-200 active:scale-95 duration-200 px-2 rounded cursor-pointer'>
                  Guardar
                </button>
              </div>
              {msg && (
                <p className={`mt-2 italic text-end text-sm ${msg === "Cambios guardados." ? "text-green-400" : "text-red-400"}`}>
                  {msg}
                </p>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
