import { Outlet, Link, useLocation } from 'react-router-dom'

export const Layout = () => {
  const location = useLocation()
  

  return (
    <div className='md:flex md:min-h-screen'>  
        <aside className='md:w-1/4 bg-blue-600 px-5 py-10'>
            <h2 className='text-2xl font-black text-center text-white'>CRM - Clientes</h2>
            <nav className='mt-10'>
                <Link to='/' 
                      className={`${location.pathname === '/' ? 'text-white text-lg font-bold' : 'text-black '} 
                                                          block text-1xl mt-2 hover:text-black`}>Clientes</Link>
                <Link to='/clientes/nuevo' 
                      className={`${location.pathname === '/clientes/nuevo' ? 'text-white text-lg font-bold'  : 'text-black'} 
                                                          block text-1xl mt-2 hover:text-black `} >Nuevo Cliente</Link>

            </nav>
        </aside>

        <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
            <Outlet/>
        </main>

    </div>
  )
}
