/*
Este es un ejemplo de una API REST utilizando una llamada con fetch el cual sirve para obtener informacion sobre el tipo de API , (Pokemon) y obtener su estructura a partir de crear
una funcion call back con una promesa.
*/

const pokeApiURL = "https://pokeapi.co/api/v2/"; 
//vamos a crear una funvion para obtener los datos de la pokedex, para esto tenemos que imaginar el orden y la obtencion de los datos

const pokedex = () => {
    //primero debemos obtener todas las estadisticas del pokemon, asi que neesitamos crear un diccionario para obtener cada uno de los elementos del front para despues vaciar los datos
    const pokemonStatsElements = {
        hp : document.getElementById("pokemonStatHP"),
        attack : document.getElementById("pokemonStatAttack"),
        defense : document.getElementById("pokemonStatDefense"),
        speed : document.getElementById("pokemonStatSpeed"),
        spAttack : document.getElementById("pokemonStatSpAttack"),
        spDefense : document.getElementById("pokemonStatSpDefense")
    };
    
//necesiatmos un auxiliar que nos permita utilizar la clase del tipo de pokemon para cambiar la css dependiendo del tipo

let currentClassType = null;
//tiene que cambiar los elementos de la imagen para ello tenemos que crear un template que se encargue de encadenar los datos
const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt='Pokedisplay' />";
//necesitamos un objeto que se encargue de guardar las rutas de las imagenes que vamos a cambiar dependiendo de si es una búsqueda, si lo encontro o no al pokemon 
const images = {
    imgPokemonNotFound : "../RecursosAPI/img/404.png",
    imgLoading : "../RecursosAPI/img/loading.gif", 
};
//necesitamos una variable que guarde todos los contenedores de la pokedex   
const containers = {
    imagenContainer:document.getElementById("pokedisplay-container"),
    pokemonTypesContainer: document.getElementById("pokemonTypes"), 
    pokemonName: document.getElementById("pokemonNameResult"),
    pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
pokemonMovesElement: document.getElementById("pokemonMoves"),
pokemonIdElement: document.getElementById("pokemonID"),

};
//necesitamos un objeto de tipo array que guarde los botones con su tipo de referencua
const buttons = {
    all : Array.from(document.getElementsByClassName("btn")), 
    search : document.getElementById("btnSearch"),
    next : document.getElementById("btnUp"),
    previous : document.getElementById("btnDown"),
};

//vamos a buscar un pokemon necesitamos una variable que guarde el nombre del pokemon
const pokemonInput = document.getElementById("pokemonName");

//la agrupacion de los elementos en este objeto debe de ser una estructura que nos permita crear funciones más pequeñas  que sin importar el orden puedan obtener cada uno de los datos solicitados
const processPokemonType = (pokemonData) =>{

    //primero  necesitamos obtener el tipo de pokemon, el nombre, y la clase para que se modifique en el html, ya que tenemos eso tendremos que obtener los stats, moves, abilities 
    let pokemonType = "";

    //utilizo una busqueda de la clase de pokemon, eso se refiere al tipo de pokemon
    const firstClass = pokemonData.types[0].type.name; 
    pokemonData.types.forEach((pokemonTypeData) => {

        pokemonType += `<span class="pokemon-type ${pokemonData.type.name}">${pokemonTypeData.type.name}</span> `;
    });
    //para poder quitar y cambiar el contenedor dependiendo del tipo tengo que saber a cual pertenece 
    if(currentClassType){
        containers.pokemonMovesElement,
        classlist.remove(currentClassType);
         containers.pokemonAbilitiesElement,
        classlist.remove(currentClassType);
        //ahora tengo que agregar lo nuevo


        containers.pokemonMovesElement.classList.add(firstClass);
        containers.pokemonAbilitiesElement.classList.add(firstClass);
        //debo agregar las etiquetas creadas dentro  del forEach
        containers.pokemonTypesContainer.innerHTML = pokemonType;
    };
    //ahora necesitamos obtener los stats del pokemon 
    const processPokemonStats = (pokemonData) => { 
        pokemonData.stats.?.forEach((pokemonstatData) => {
            //vamos a evaluar si encuentra el nombre de la estadistica, para colocarlo en su contenedor correspondiente
            switch(pokemonstatData.stat.name){
                case "hp":
                    pokemonStatsElements.hp.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0, 118, 225, 1) ${pokemonstatData.base_stat}%, rgba(0, 0, 0, 1) ${pokemonstatData.base_stat}%);`;

            }
            break; 
            switch(pokemonstatData.stat.name){
                case "attack":
                    pokemonStatsElements.attack.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0, 118, 225, 1) ${pokemonstatData.base_stat}%, rgba(0, 0, 0, 1) ${pokemonstatData.base_stat}%);`;

                    switch(pokemonstatData.stat.name){
                case "defense":
                    pokemonStatsElements.defense.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0, 118, 225, 1) ${pokemonstatData.base_stat}%, rgba(0, 0, 0, 1) ${pokemonstatData.base_stat}%);`;

            }
            break; 

            switch(pokemonstatData.stat.name){
                case "special-attack":
                    pokemonStatsElements.specialAttack.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0, 118, 225, 1) ${pokemonstatData.base_stat}%, rgba(0, 0, 0, 1) ${pokemonstatData.base_stat}%);`;

            }
            break; 
                switch(pokemonstatData.stat.name){
                case "special-defense":
                    pokemonStatsElements.specialDefense.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0, 118, 225, 1) ${pokemonstatData.base_stat}%, rgba(0, 0, 0, 1) ${pokemonstatData.base_stat}%);`;

            }
            break;
                switch(pokemonstatData.stat.name){      
                case "speed":
                    pokemonStatsElements.speed.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0, 118, 225, 1) ${pokemonstatData.base_stat}%, rgba(0, 0, 0, 1) ${pokemonstatData.base_stat}%);`;        
            }
            break;

        }
        break;
        });
    };
    




















}