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

const inputPaises = document.createElement('input');
inputPaises.id="inputPaises";

const selectorSimbolo = document.createElement("select");
selectorSimbolo.id="selectorSimbolo";

const selectorMoneda = document.createElement("select");
selectorMoneda.id="selectorMoneda";

const labelBusqueda = document.createElement('label');
labelBusqueda.id="labelBusqueda";
labelBusqueda.textContent="Búsqueda directa: ";

const divInfo = document.createElement('div');
divInfo.id="divInfo";
/*
const mostrarMoneda = document.getElementById('moneda');
const mostrarSimbolo = document.getElementById('simbolo');*/
const parrafo1 = document.createElement("p");
const parrafo2 = document.createElement("p");


const listaMonedas= [];  //solo quiero la lista para el navegador, no quiero que se me muestra en la web
const listaSimbolo= [];
const listaPais = [];

divLista.appendChild(labelPaises); // Agregar labelPaises a divLista

const busqueda = function(){
    const existingDivLista = document.getElementById('divLista');
    if (existingDivLista) {
        window.location.reload();
    }
    
    fetch('https://restcountries.com/v3.1/all')
    .then(response => {
        if(!response.ok){
            throw new Error ('Programa no funciona');
        }
        return response.json();
    }) 
    .then(data =>{

        ordenarLista(data);
        listaPais.forEach( function(pais) {
            
            opcion = document.createElement('option');
            opcionSimbolo = document.createElement('option');

            opcion.value = pais;
            opcion.textContent = pais;

            selector.appendChild(opcion);
            selectorSimbolo.appendChild(opcionSimbolo);
            
        });
        
        divLista.appendChild(selector); // Agregar selector a divLista
        document.body.appendChild(divLista); // Agregar divLista al body        
        document.body.appendChild(divInfo);
        
        document.getElementById('pais').addEventListener('change', function(event) {
            const seleccionado = event.target.value;
            console.log("dentro del eventlistener", seleccionado);
            const url = conversor(seleccionado);
            mostrarImagen(url);
            mostrarInfo(seleccionado);
        });

       
        
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
    fetch(url)
    .then(response => {
        if(response.ok) {
            nuevaImagen.src=url;
            nuevaImagen.width=100;
            nuevaImagen.height=100;
            nuevoDiv.appendChild(nuevaImagen);        
            document.body.appendChild(nuevoDiv);  
        }
    })     
    .catch(error => {
        console.error('No existe imagen enlazada:', error);
    })  
    }

const mostrarInfo = function(pais) {
   
    for (let i = 0; i < selectorMoneda.options.length; i++) {
        
        if (selectorMoneda.options[i].value == pais) {            
            parrafo1.textContent="Moneda vigente: "+ selectorMoneda.options[i].textContent;
            parrafo2.textContent="\n Simbolo: "+ selectorSimbolo.options[i].textContent;
        }
    document.body.appendChild(parrafo1);
    document.body.appendChild(parrafo2);
    }
}   



const ordenarLista = function(data) {
        console.log(data);
        let pais;
        let moneda;
        let simbolo;
        for(let i=0; i<data.length; i++)
        {
            pais = data[i].name.common;
            console.log(pais)
            for(const infoMoneda in data[i].currencies){
                moneda= data[i].currencies[infoMoneda].name;
                simbolo = data[i].currencies[infoMoneda].symbol;
                console.log(moneda);
                console.log(simbolo);
            }

            listaPais.push(pais);
         
            opcionSimbolo = document.createElement('option');
            opcionMoneda = document.createElement('option');
            opcionSimbolo.value = pais;
            opcionSimbolo.textContent=simbolo;

            opcionMoneda.value = pais;
            opcionMoneda.textContent=moneda;
         
            selectorSimbolo.appendChild(opcionSimbolo);
            selectorMoneda.appendChild(opcionMoneda);
        
        };
        listaPais.sort();
        
}

/*
const crearTabla = function (pais) {
    const tR = document.createElement('tr');
    const celda= document.createElement('td');
    const boton = document.createElement('button'); // Crear un elemento de botón
    boton.textContent = pais;
    boton.id="boton";

    boton.addEventListener('click', function(event) {
        console.log(pais);
        const seleccionado = pais; // Utilizamos el país asociado al botón
        const url = conversor(seleccionado);
        mostrarImagen(url);
        //mostrarInfo(event.target.textContent); // Pasamos el texto del botón como argumento
    });
   
    tR.appendChild(boton);
    tBody.appendChild(tR);
    tabla.appendChild(tBody);
    document.body.appendChild(tabla);


   
}

*/

  




















