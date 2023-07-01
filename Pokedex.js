const Pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {

  const promises= [];
  for(let i=1;i <= 150;i++){                   
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  fetch(url)
  promises.push(fetch(url).then((res) => res.json()));
}

   Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
        name : data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(' , ')
    }));
    displayPokemon(pokemon);
  });  /* OR this to work */ /* .then(data =>{console.log(data);const pokemon = {};console.log(pokemon);}) */
 
  const displayPokemon = (pokemon) => {

     const pokemonHTMLString = pokemon.map(pokeman =>
       `<li class="card">
         <img id="card-image" src="${pokeman.image}"/>
         <h2 id="card-title">${pokeman.id}.${pokeman.name}</h2>
         <p id="card-subtitle">Type: ${pokeman.type} </p>
       </li>`
     ).join("")
     Pokedex.innerHTML = pokemonHTMLString ;
  };

};
fetchPokemon();