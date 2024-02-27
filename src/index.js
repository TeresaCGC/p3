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
        
        let pais;
        let opcion;
        let moneda;
        let simbolo;
        for(let i=0; i<data.length; i++)
        {
            pais = data[i].name.common;
            for(const infoMoneda in data[i].currencies){
                moneda= data[i].currencies[infoMoneda].name;
                simbolo = data[i].currencies[infoMoneda].symbol;
            }

            console.log("esto es el pais",pais);
            console.log("esto es la moneda", moneda);
            opcion = document.createElement('option');
           
            opcion.value = pais;
            opcion.textContent = pais;
           
            selector.appendChild(opcion);
            
            listaMonedas.push(moneda);
            listaSimbolo.push(simbolo);
        
        };
        
        divLista.appendChild(selector); // Agregar selector a divLista
        divInfo.appendChild(labelBusqueda);
        divInfo.appendChild(inputPaises);
        //listaMonedas.appendChild(selectorMonedas);

        document.body.appendChild(divLista); // Agregar divLista al body
        document.body.appendChild(divInfo);
        document.getElementById('pais').addEventListener('change', function(event) {
            const seleccionado = event.target.value;
            const posicion = event.target.selectedIndex;
            const url = conversor(seleccionado);
            mostrarImagen(url);
            mostrarInfo(posicion);
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
        console.error('There was a problem with your fetch operation:', error);
    })  
    }

const mostrarInfo = function(posicion) {
    console.log(listaMonedas[posicion]);
    console.log(listaSimbolo[posicion]);
    parrafo1.textContent="Moneda vigente: "+ listaMonedas[posicion];
    parrafo2.textContent="\n Simbolo: "+ listaSimbolo[posicion];
    document.body.appendChild(parrafo1);
    document.body.appendChild(parrafo2);
}

  




















