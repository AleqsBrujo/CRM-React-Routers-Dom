import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout }  from './components/Layout'
import { NuevoCliente,  action as actionForm } from './pages/NuevoCliente'
import { Index,  loader as clientesLoader } from './pages/Index' //Cambiamos por si reusamors useLoaderData en otro cmp!
import { ErrorPage } from './components/ErrorPage'
import { EditarCliente, loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarCliente'
import { action as eliminarClienteAction} from './components/Cliente'

const router = createBrowserRouter([
{
  path: '/',
  element: <Layout />,
  children: [
  {
    index: true,  //Index: true Indica que esta es la pag principal
    element: <Index />,
    loader: clientesLoader, //Le pasamos la propiedad
    errorElement: <ErrorPage/>
  },
  {
    path:'/clientes/nuevo',
    element: <NuevoCliente/>,
    action: actionForm
  },
  {
    path: '/clientes/:clienteId/editar',
    element: <EditarCliente/>,
    loader: editarClienteLoader,
    action: editarClienteAction,
    errorElement: <ErrorPage/>
  },
  {
    path: '/clientes/:clienteId/destroy',
    action: eliminarClienteAction
  }
]
},

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
)
