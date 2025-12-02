// Importamos useState para manejar estados y useEffect para efectos secundarios
import { useState, useEffect } from 'react'
// Importamos el archivo CSS con los estilos del cronómetro
import './Cronometro.css'

// Creamos el componente Cronometro (función que retorna JSX)
function Cronometro() {
  
  // Estado que guarda los milisegundos totales transcurridos (empieza en 0)
  const [milisegundos, setMilisegundos] = useState(0)
  
  // Estado que guarda si el cronómetro está corriendo o no (empieza en false)
  const [corriendo, setCorriendo] = useState(false)

  // useEffect se ejecuta cada vez que 'corriendo' cambia
  useEffect(() => {
    // Variable que guardará el ID del intervalo
    let intervalo = null

    // Si el cronómetro está corriendo...
    if (corriendo) {
      // setInterval ejecuta una función cada 10ms (10 milisegundos)
      intervalo = setInterval(() => {
        // Incrementamos los milisegundos en 10
        setMilisegundos(ms => ms + 10)
      }, 10) // 10 milisegundos para mayor precisión
    } else {
      // Si no está corriendo, limpiamos el intervalo para detenerlo
      clearInterval(intervalo)
    }

    // Función de limpieza: se ejecuta cuando el componente se desmonta o antes de ejecutar el efecto de nuevo
    return () => clearInterval(intervalo)
  }, [corriendo]) // Este efecto solo se ejecuta cuando 'corriendo' cambia

  // Función que convierte milisegundos totales a formato MM:SS:MS
  const formatearTiempo = () => {
    // Calculamos los minutos (1 minuto = 60000 milisegundos)
    const minutos = Math.floor(milisegundos / 60000)
    
    // Calculamos los segundos (1 segundo = 1000 milisegundos)
    const segundos = Math.floor((milisegundos % 60000) / 1000)
    
    // Calculamos los centésimas de segundo (milisegundos / 10)
    const centesimas = Math.floor((milisegundos % 1000) / 10)

    // Retornamos el formato con ceros a la izquierda si es necesario
    // padStart(2, '0') agrega un 0 al inicio si el número tiene solo 1 dígito
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${centesimas.toString().padStart(2, '0')}`
  }

  // Función que inicia el cronómetro
  const iniciar = () => {
    setCorriendo(true) // Cambia el estado a true
  }

  // Función que pausa el cronómetro
  const pausar = () => {
    setCorriendo(false) // Cambia el estado a false
  }

  // Función que reinicia el cronómetro
  const reiniciar = () => {
    setCorriendo(false) // Primero lo detenemos
    setMilisegundos(0) // Luego ponemos los milisegundos en 0
  }

  // Retornamos el JSX (lo que se verá en pantalla)
  return (
    // Contenedor principal con la clase CSS
    <div className="cronometro-container">
      {/* Título del cronómetro */}
      <h1 className="cronometro-titulo">Cronómetro / Temporizador</h1>
      
      {/* Mostramos el tiempo formateado en MM:SS:MS */}
      <div className="cronometro-display">
        {formatearTiempo()}
      </div>
      
      {/* Etiquetas para indicar qué significa cada parte */}
      <p className="cronometro-etiquetas">MM : SS : MS</p>
      
      {/* Contenedor de botones */}
      <div className="cronometro-botones">

        {/* Botón Iniciar - se deshabilita cuando ya está corriendo */}
        <button 
          onClick={iniciar} 
          disabled={corriendo}
          className="cronometro-boton boton-iniciar"
        >
          ▶️ Iniciar
        </button>
        
        {/* Botón Pausar-Reaundar*/}
        {/* si esta corriendo mostrar pausar y si esta en pausar mostrar reanudar*/}
        
        <button 
          onClick={corriendo ? pausar : iniciar}
          disabled={milisegundos === 0}
          className="cronometro-boton boton-pausar"
        >
            {corriendo ? '⏸️ Pausar' : '▶️ Reanudar'}
        </button>
        
        {/* Botón Reiniciar - siempre está habilitado */}
        <button 
          onClick={reiniciar}
          className="cronometro-boton boton-reiniciar"
        >
          🔄 Reiniciar
        </button>
      </div>
    </div>
  )
}
// Exportamos el componente para poder usarlo en otros archivos
export default Cronometro






















/*
}// Importamos useState para manejar estados y useEffect para efectos secundarios
import { useState, useEffect } from 'react'

// Creamos el componente Cronometro (función que retorna JSX)
function Cronometro() {
  
  // Estado que guarda los segundos transcurridos (empieza en 0)
  const [segundos, setSegundos] = useState(0)
  
  // Estado que guarda si el cronómetro está corriendo o no (empieza en false)
  const [corriendo, setCorriendo] = useState(false)

  // useEffect se ejecuta cada vez que 'corriendo' cambia
  useEffect(() => {
    // Variable que guardará el ID del intervalo
    let intervalo = null

    // Si el cronómetro está corriendo...
    if (corriendo) {
      // setInterval ejecuta una función cada 1000ms (1 segundo)
      intervalo = setInterval(() => {
        // Incrementamos los segundos en 1 (seg es el valor actual)
        setSegundos(seg => seg + 1)
      }, 1000) // 1000 milisegundos = 1 segundo
    } else {
      // Si no está corriendo, limpiamos el intervalo para detenerlo
      clearInterval(intervalo)
    }

    // Función de limpieza: se ejecuta cuando el componente se desmonta o antes de ejecutar el efecto de nuevo
    return () => clearInterval(intervalo)
  }, [corriendo]) // Este efecto solo se ejecuta cuando 'corriendo' cambia

  // Función que inicia el cronómetro
  const iniciar = () => {
    setCorriendo(true) // Cambia el estado a true
  }

  // Función que pausa el cronómetro
  const pausar = () => {
    setCorriendo(false) // Cambia el estado a false
  }

  // Función que reinicia el cronómetro
  const reiniciar = () => {
    setCorriendo(false) // Primero lo detenemos
    setSegundos(0) // Luego ponemos los segundos en 0
  }

  // Retornamos el JSX (lo que se verá en pantalla)
  return (
    <div>
    
 //  {/* Título del cronómetro */
 //     <h1>Cronómetro</h1>
      
 //     {/* Mostramos los segundos actuales */}
//      <h2>{segundos} segundos</h2>
      
//      {/* Botón que ejecuta la función iniciar cuando se hace clic */}
 //     <button onClick={iniciar}>Iniciar</button>
      
//      {/* Botón que ejecuta la función pausar cuando se hace clic */}
//      <button onClick={pausar}>Pausar</button>
 //     
 //     {/* Botón que ejecuta la función reiniciar cuando se hace clic */}
//      <button onClick={reiniciar}>Reiniciar</button>
//    </div>
//  )
//}

// Exportamos el componente para poder usarlo en otros archivos
//export default Cronometro 



