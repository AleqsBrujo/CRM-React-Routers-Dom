import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import { Formulario } from '../components/Formulario'
import { Error } from '../components/Error'
import { agregarCliente } from '../data/clientes';


//Con esta funcion utilizando formData, Obtendremos los valores de un Formulario (fromEntries)
export async function action({request}) {
  const formDat = await request.formData();
  const data = Object.fromEntries(formDat)
  const email = formDat.get('email')
  
  //Validacion de Formulario
  const errores = []

  if(Object.values(data).includes('')){
    errores.push('Todos los datos son Obligatorios')
    console.log(errores)
  }

  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)){
      errores.push('El email no es Valido');
  }


  if(Object.keys(errores).length){
    return errores
  }

  await agregarCliente( data )
 
  return redirect('/')
}

export const NuevoCliente = () => {
    const errores = useActionData()
    
    const navigate = useNavigate()    

    
    
  return (
    <>
      <h1 className='font-black text-3xl text-black'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena todo los campos para registrar nuevo Cliente</p>  

      <div className='flex justify-end'>
        <button className='bg-blue-800 rounded-md text-white px-3 py-1 font-bold uppercase'
                onClick={ () => navigate(-1)}> Volver </button>
      </div>

      <div className='bg-white shadow border-b rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10'>
        
        {errores?.length && errores.map((error, i) => <Error key={i}>{ error }</Error>)}

        <Form 
          method='POST'
          noValidate
                        >
        
          <Formulario />
          
          <input 
            type='submit'
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md'
            value='Registrar Cliente'/>
        
        </Form> 
      </div>


    </>
  )
}
