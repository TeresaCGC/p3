//Elementos HTML a manipular
const nuevaImagen = document.createElement('img');

const nuevoDiv = document.createElement('div');
nuevoDiv.id = 'divFoto';
nuevoDiv.classList.add('contenedor-imagen');

const divLista = document.createElement('div');
divLista.id = 'divLista'; // Corregir asignación de id

const labelPaises = document.createElement('label');
labelPaises.id = 'labelPaises'; // Corregir asignación de id
labelPaises.textContent = 'Escoja un pais: '; // Corregir asignación de texto

const selector = document.createElement("select"); //elemento que se encarga de mostrar la lista de paises.
selector.id='pais';

divLista.appendChild(labelPaises); // Agregar labelPaises a divLista

const busqueda = function(){
    
    fetch('https://restcountries.com/v3.1/all?fields=name')
    .then(response => {
        if(!response.ok){
            throw new Error ('Programa no funciona');
        }
        return response.json();
    }) 
    .then(data =>{
        const paises = data;
        let pais;
        let opcion;
        console.log(paises);
        for(let i=0; i<data.length; i++)
        {
            pais = data[i].name.common;
            console.log("esto es el pais",pais);
            opcion = document.createElement('option');
            opcion.value = pais;
            opcion.textContent = pais;
            selector.appendChild(opcion);
        
        };
        
        console.log(selector);
        divLista.appendChild(selector); // Agregar selector a divLista
        console.log(divLista);
        document.body.appendChild(divLista); // Agregar divLista al body
       
        document.getElementById('pais').addEventListener('change', function(event) {
            const seleccionado = event.target.value;
            console.log("valor seleccionado: ", seleccionado);
            const url = conversor(seleccionado);
            mostrarImagen(url);
        });
        //document.write("<div class=\"contenedor-imagen\"><img src="+breed[indice]+" alt=\"Imagen molona\" width=\"100%\" height=\"100%\"></div>");
        
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}


const conversor = function(pais){
    const paisc = pais.toLowerCase();
    const variable = paisc.charAt(0) + paisc.charAt(1);
    const url = "https://flagcdn.com/w320/"+variable+".png";
    return url;
}



const mostrarImagen= function(url) {
    console.log(url);
    nuevaImagen.src=url;
    nuevaImagen.width=200;
    nuevaImagen.height=200;
    nuevoDiv.appendChild(nuevaImagen);        
    document.body.appendChild(nuevoDiv);               
        
    }

  




















