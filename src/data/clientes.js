

export async function obtenerClientes () {
    
    const resp = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await resp.json()

    return resultado

}

export async function obtenerCliente (id) {
    
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const resultado = await resp.json()

    return resultado

}

export async function agregarCliente (datos) {
    
    try {
        const resp = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            await resp.json()
    } catch (error) {
        console.log(error)
    }

}

export async function actualizarCliente(id, datos){

    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            await resp.json()
    } catch (error) {
        console.log(error)
    }

}
    
export async function eliminarCliente(id){
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'            
        })
            await resp.json()
            
    } catch (error) {
        console.log(error)
    }

}