import { useEffect , useState } from "react";
import { useLocalStorage } from '@/hooks/useLocalStore';
 
export default function Aprieta (){
const [state, setState] = useState({ anoter: '12' , hollow : '123'  , city: ''});
  const [lcities, lsetCities] = useLocalStorage('cities', [
    'mexico city',
    'sydney',
    'new york',
    'london',
    'tokyo',
  ]);

  useEffect(()=>{
    updateState({hollow: lcities})
  
    console.log(state)
  },[])

  function setCity(_city){
    console.log(state.hollow , 'qwe')
  }

  useEffect(()=>{
    setCity("rafa")
  },[state.city])



  useEffect(()=>{
    console.log( 'labver')
  },[state.hollow])

  useEffect(()=>{
    console.log( 'anoter')
  },[state.anoter])


  const updateState = (data) =>{
    setState(prev=> ({ ...prev ,...data }));
  }

 return {...state, updateState} 

}