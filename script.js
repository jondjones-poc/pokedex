const container = document.getElementById('poke-container');
const item_count = 100;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E5E0D4',
    normal: '#F5F5F5'
}

const pokemonTypes = Object.keys(colors);

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const card = await createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const element = document.createElement('div');
    element.classList.add('pokemon');

    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const pokeType = pokemon.types.map(type => type.type.name)[0];
    const cardColor = colors[pokeType];

    element.style.backgroundColor = cardColor;

    const html = ` 
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${pokeType}</span></small>
        </div>
    `;

    element.innerHTML = html;
    container.appendChild(element);

}
const fetchData = async () => {
    for (let id = 1; id <= item_count; id++) {
        await getPokemon(id);
    }
}

fetchData();