import { useLoaderData } from "react-router-dom"; //Para poder usar el loader
import { Cliente } from "../components/Cliente";
import { obtenerClientes } from "../data/Clientes";

export function loader() {  //loader invoca la funcion de useLoaderData
  
  const clientes = obtenerClientes()
  return clientes
  
}


export const Index = () => {
  const datos = useLoaderData();
  

  return (
    <>
      <h1 className='font-black text-3xl text-black'>Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>

      {datos.length ? (
        <table className="w-full bg-white shadow table-auto rounded-md ">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left indent-3">Cliente</th>
              <th className="p-2 text-left indent-3">Contacto</th>
              <th className="p-2 text-left indent-3">Acciones</th>
            </tr>
          </thead>  
            <tbody>
              {datos.map(cliente => (
                <Cliente
                  cliente={cliente}
                  key={cliente.id}
                />

             ))}
            </tbody>
        

        </table>
      ) : (
        <p className='text-center mt-10 text-red-600'>No hay Clientes</p>

      )}
    
    </>
  )
}
