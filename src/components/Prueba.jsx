'use client';

import { useEffect, useState } from "react";
import usePrueba from '@/hooks/usePrueba'

export default function Prueba() {
  const { anoter , hollow ,updateState }  = usePrueba();
  
  const [ life , setLife ]  = useState('')
  console.log("renderizado")
  return (
    <div>
      <h1>{anoter}</h1>
      <h1>{hollow}</h1>
      {/* <h1>{life}</h1> */}
      <button  onClick={()=> { updateState( {hollow:'thunder'})}} > PROBAR</button>
      <button  onClick={()=> { updateState( {anoter:'thunder'})}} > PROBAR</button>
      <button  onClick={()=> { setLife('juanito')}} > PROBAR</button>
      </div>
  )
}
