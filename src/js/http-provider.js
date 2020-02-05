const jokeUrl     = 'https://api.chucknorris.io/jokes/random';
const urlUsuarios = 'https://reqres.in/api/users?page=2';

// Cloudinary
const cloudPreset = 'autwc6pa';
const cloudUrl    = 'https://api.cloudinary.com/v1_1/dx0pryfzn/upload';

const obtenerChiste = async() => {

    try {

        const resp = await fetch( jokeUrl );

        if( !resp.ok ) throw 'No se pudo realizar la peticion'; 

        const { icon_url, id, value } = await resp.json();

        return { icon_url, id, value };

    } catch (err ){

        throw err;

    }
    
    
}

const obtenerUsuarios = async() => {

    const resp = await fetch( urlUsuarios );
    const { data:usuarios } = await resp.json();

    return usuarios; 
}


// ArchivoSubir :: File
const subirImagen = async( archivoSubir ) => {

    const formData = new FormData();
    formData.append('upload_preset', cloudPreset );
    formData.append('file', archivoSubir );

    try { 
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url; 
        } else {
            throw await resp.json();
        }

    } catch( err ) {
        throw err;
    }

}


export {
    obtenerChiste,
    obtenerUsuarios,
    subirImagen
}


