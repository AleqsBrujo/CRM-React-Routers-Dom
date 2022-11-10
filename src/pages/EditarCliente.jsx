import { obtenerCliente, actualizarCliente } from "../data/clientes" 
import { Formulario } from "../components/Formulario"
import { Form, useActionData, redirect } from "react-router-dom"
import { useNavigate, useLoaderData } from "react-router-dom"
import { Error } from "../components/Error"

export async function loader({params}){
  const cliente = await obtenerCliente(params.clienteId)
  if(Object.values(cliente).length === 0){
    throw new Response('', {
      status: 404,
      statusText: 'No se encontro ningun usuario con ese ID'
    })
  }
return cliente

}

export async function action({request, params}){
  const formDat = await request.formData();
  const data = Object.fromEntries(formDat)
  const email = formDat.get('email')
  
  //Validacion de Formulario
  const errores = []

  if(Object.values(data).includes('')){
    errores.push('Todos los datos son Obligatorios')
    
  }

  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)){
      errores.push('El email no es Valido');
  }


  if(Object.keys(errores).length){
    return errores
  }

  //Actualizar el Cliente
  await actualizarCliente( params.clienteId, data )
 
  return redirect('/')


}

export const EditarCliente = () => {
  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()
  
  return (
    <>
      <h1 className='font-black text-3xl text-black'>Editar Cliente</h1>
      <p className='mt-3'>Edita los datos de tú Cliente</p>  

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
        
          <Formulario
            cliente={cliente} />
          
          <input 
            type='submit'
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md'
            value='Guardar Cambios'/>
        
        </Form> 
      </div>


    </>
  )
}
