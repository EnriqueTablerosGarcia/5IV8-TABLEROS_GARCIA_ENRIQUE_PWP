/*
Este es un ejemplo de una API REST utilizando una llamada con fetch, el cual sirve para obtener información sobre el tipo de api (pokemon) y obtener su estrutura a partir de crear una función call back con una promesa.
*/
const pokeApiUrl = 'https://pokeapi.co/api/v2/';

//Vamos a crear una función para obtener todos los datosde la pokedex, para esto tenemos que imaginar el orden y la obtención de los datos
const pokedex = () => {
    //Primero necesitamos obtener todas las stats del pokemon, así que necesitamos crear un diccionario para obtener cada uno de los elementos del front para despues vaciar los datos
    const pokemonStatsElements = {
        hp: document.getElementById('pokemonStatHP'),
        attack: document.getElementById('pokemonStatAttack'),
        defense: document.getElementById('pokemonStatDefense'),
        specialAttack: document.getElementById('pokemonStatSpecialAttack'),
        specialDefense: document.getElementById('pokemonStatSpecialDefense'),
        speed: document.getElementById('pokemonStatSpeed')
    };
    //Necesitamos un auxiliar que nos permita utilizar la clase del tipo de pokemon para cambiar la css dependiendo del tipo
    let currentClassType = null;

    //TIene que cambiar los elementos de la imagen, para ello debemos crear un template que se encargue de encadenar los datos
    const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt='pokedisplay'/>";

    //Necesitamos un objeto que se encargue de guardar las rutas de las imagenes que vamos a cambiar dependiendo de si es una búsqueda, si lo encontró o no al pokemon
    const images = {
        imgPokemonNotFound: "./img/404.png",
        imgLoading: "./img/loading.gif"
    }

    //Necesitamos una variable que guarde todos los contenedores de la pokedex
    const containers = {
        imageContainer: document.getElementById('pokedisplay-container'),
        pokemonTypesContainer: document.getElementById('pokemonTypes'),
        pokemonNameElement: document.getElementById('pokemonNameResult'),
        pokemonAbilitiesElement: document.getElementById('pokemonAbilities'),
        pokemonMovesElement: document.getElementById('pokemonMoves'),
        pokemonIdElement: document.getElementById('pokemonId')
    };

    //Necesitamos un objeto de tipo array que guarde los botones con su tipo de referencia
    const buttons = {
        all: Array.from(document.getElementsByClassName('btn')),
        search: document.getElementById('btnSearch'),
        next: document.getElementById('btnUp'),
        previous: document.getElementById('btnDown')
    };

    //Para buscar un pokemon necesitamos una variable que guarde el nombre del pokemon
    const pokemonInput = document.getElementById('pokemonName');

    //La agregación de los elementos en este objeto debe ser una estructura que nos permita crear funciones mas pequeñas que sin importar el orden puedan obtener cada uno de los datos solicitados
    const processPokemonTypes = (pokemonData) => {
        //Primero necesitamos obtener el tupo de pokemon, el nombre y la clase, para que se modifique en el html, ya que tenemos eso tendremos que obtener stats, moves, abilities
        let pokemonType = "";
        //Utilizo una búsqueda de la clase de pokemon, eso se refiere al tipo de pokemon
        const firstClass = pokemonData.types[0].type.name;

        pokemonData.types.forEach((pokemonTypeData) => {
            //Necesito obtener la etiqueta de cada cambio
            pokemonType += <span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>;
        });
        //Para poder quitar y cambiar el contenedor dependiendo del tipo tengo que saber a cual pertenece
        if (currentClassType) {
            containers.pokemonMovesElement.classList.remove(currentClassType);
            containers.pokemonAbilitiesElement.classList.remove(currentClassType);
        }
        //Ahora tengo que agregar lo nuevo
        containers.pokemonMovesElement.classList.add(firstClass);
        containers.pokemonAbilitiesElement.classList.add(firstClass);

        //Debo de agregar las etiquetas creadas dentro del foreach
        containers.pokemonTypesContainer.innerHTML = pokemonType;
    };
    //Ahora necesitamos obtener las stats del pokemon
    const processPokemonStats = (pokemonData) => {
        pokemonData.stats?.forEach((pokemonstatData) => {
            //Vamos a evaluar si encuentra el nombre de la estadística para colocarla en el contenedor correspondiente
            switch (pokemonstatData.stat.name) {
                case 'hp':
                    pokemonStatsElements.hp.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.hp.style = background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);;
                    break;
                case 'attack':
                    pokemonStatsElements.attack.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.attack.style = background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);;
                    break;
                case 'defense':
                    pokemonStatsElements.defense.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.defense.style = background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);;
                    break;
                case 'special-attack':
                    pokemonStatsElements.specialAttack.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.specialAttack.style = background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);;
                    break;
                case 'special-defense':
                    pokemonStatsElements.specialDefense.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.specialDefense.style = background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);;
                    break;
                case 'speed':
                    pokemonStatsElements.speed.innerHTML = pokemonstatData.base_stat;
                    pokemonStatsElements.speed.style = background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonstatData.base_stat}%, rgba(0,0,0,1) ${pokemonstatData.base_stat}%);;
                    break;
            }
        });
    };
    // Procesa los movimientos del pokemon, y los coloca en su respectivo contenedor
    const processPokemonMoves = (pokemonData) => {
        let pokemonMovesContent = "";
        pokemonData.moves?.forEach((pokemonMove) => {
            pokemonMovesContent += <li>${pokemonMove.move.name}</li>;
        });
        containers.pokemonMovesElement.innerHTML = pokemonMovesContent;
    };
    // Procesa las habilidades del pokemon, y los coloca en su respectivo contenedor
    const processPokemonAbilities = (pokemonData) => {
        let pokemonAbilitiesContent = "";
        pokemonData.abilities?.forEach((pokemonAbility) => {
            pokemonAbilitiesContent += <li>${pokemonAbility.ability.name}</li>;
        });
        containers.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;
    };
    // Pone la imagen de cargando y deshabilita los botones
    const setLoading = () => {
        containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        buttons.all.forEach(button => button.disabled = true);
    };
    // Vuelve a habilitar los botones
    const setLoadingComplete = () => {
        buttons.all.forEach(button => checkDisabled(button));
    };
    /*/
    // Esta función es la que consulta la pokeapi para obtener la información del pokemon solicitado
    // fetch nos sirve para hacer solicitudes a otros sitios, pero también se puede usar para cargar archivos locales
    // fetch recibe la url del recurso o destino de la petición, y un objeto que nos ayuda a establecer algunos parámetros
    // de la petición, fetch devuelve una promesa, por eso tiene un then y un catch, por otro lado, getPokemonData, devuelve
    // un objeto json con la información del pokemon, o en caso de error, el objeto json contiene el campo que indica que
    // la petición falló https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
    const getPokemonData = async (pokemonName) => fetch(${pokeApiUrl}pokemon/${pokemonName}, {
        // Existen varios métodos HTTP que sirven, entre otras cosas, para especificar el tipo de petición, pero también
        // son necesarios para enviar adecuadamente sus parámetros https://developer.mozilla.org/es/docs/Web/HTTP/Methods
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // En las cabeceras de la petición se puede especificar el tipo de información que vamos a utilizar, también
        // aquí se suelen colocar, por ejemplo la identidad del usuario por si la petición requiere alguna información
        // de este o por motivos de seguridad https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Content-Type
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(miObjetoJson)||"" IMPORTANTE:Cuando tu petición use un cuerpo(por ejemplo post y put), debes convertirlo a string
    })
        .then((res) => res.json())
        .catch((error) => ({ requestFailed: true }));
    /*/
    // válida si debe deshabilitar los botones o no, en este caso, únicamente el botón inferior, si está en el ID 1,
    // ya que no hay pokemon con ID negativo
    const checkDisabled = (button) => {
        button.disabled = button.id === "btnDown" && containers.pokemonIdElement.value <= 1;
    };
    // Esta es la función principal, válida que reciba un nombre o ID y realiza la búsqueda del pokemon y procesa
    // la respuesta para colocar los datos en sus respectivos elementos HTML
    const setPokemonData = async (pokemonName) => {
        if (pokemonName) {
            // pone la imagen de búsqueda y deshabilita los botones en lo que realiza la consulta
            setLoading();
            // realiza la consulta, en este caso, con await espera hasta tener respuesta, primero utilizo un operador
            // ternario para poner el nombre en minúsculo si es string
            // operador ternario: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
            // await: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await
            const pokemonData = await getPokemonData(typeof pokemonName === typeof "" ? pokemonName.toLowerCase() : pokemonName);
            if (pokemonData.requestFailed) {
                // Si no se encontró el pokemon, se pone la imagen de no encontrado
                containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPokemonNotFound);
            } else {
                // Pone las imágenes del pokemon, su nombre y el ID del pokemon
                containers.imageContainer.innerHTML = `
        ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_default)}
        ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_shiny)}
                `;
                containers.pokemonNameElement.innerHTML = pokemonData.name;
                containers.pokemonIdElement.value = pokemonData.id;
                // reparte el resto de procesamientos pertinentes a cada función
                processPokemonTypes(pokemonData);
                processPokemonStats(pokemonData);
                processPokemonAbilities(pokemonData);
                processPokemonMoves(pokemonData);
            }
            // vuelve a habilitar los botones.
            setLoadingComplete();
        } else {
            // Esta es la forma de utilizar SweetAlert 2, por si te interesa aprender más sobre su uso puedes revisar su
            // sitio oficial https://sweetalert2.github.io/ pero no es necesario.
            Swal.fire({
                title: "Error!",
                text: "Ingresa el nombre de un pokémon primero",
                icon: "error",
                confirmButtonText: "Aceptar.",
            });
        }
    };

    const triggers = () => {
        // se le vincula la función de búsqueda al botón de buscar.
        buttons.search.onclick = () => setPokemonData(pokemonInput.value);
        // se le vincula la función de búsqueda al campo de texto para buscar cuando presionan enter
        pokemonInput.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                setPokemonData(pokemonInput.value);
            }
        }
        // se le vincula la función de búsqueda al arriba y abajo, estos funcionan con el ID en lugar del campo de texto.
        buttons.next.onclick = () => setPokemonData(+containers.pokemonIdElement.value + 1);
        buttons.previous.onclick = () => setPokemonData(+containers.pokemonIdElement.value - 1);
    };
    setLoadingComplete();
    triggers();
};

window.onload = pokedex;