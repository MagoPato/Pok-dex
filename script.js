
        const generationSelect = document.getElementById('generation');
        const pokemonList = document.getElementById('pokemon-list');

        generationSelect.addEventListener('change', (event) => {
            const generation = event.target.value;
            fetchPokemonByGeneration(generation);
        });

        async function fetchPokemonByGeneration(generation) {
            pokemonList.innerHTML = ''; // Limpiar la lista anterior

            const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`);
            const data = await response.json();

            // Obtener los Pokémon de la generación seleccionada
            const pokemon = data.pokemon_species;

            // Ordenar Pokémon por número de Pokédex
            const sortedPokemon = pokemon.sort((a, b) => a.url.split('/')[6] - b.url.split('/')[6]);

            sortedPokemon.forEach(async (poke) => {
                const pokemonData = await fetch(poke.url);
                const pokemonDetails = await pokemonData.json();
                const pokeId = pokemonDetails.id;
                const pokeName = pokemonDetails.name;

                // Verificar si el sprite está disponible
                const pokeImage = pokemonDetails.sprites.front_default || 'https://via.placeholder.com/150'; // Imagen de respaldo si no hay sprite

                // Crear tarjeta de Pokémon
                const card = document.createElement('div');
                card.classList.add('pokemon-card');
                card.innerHTML = `
                    <img src="${pokeImage}" alt="${pokeName}">
                    <h3>${pokeId}: ${pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}</h3>
                `;

                pokemonList.appendChild(card);
            });
        }

        // Cargar Pokémon de la primera generación al inicio
        fetchPokemonByGeneration(1);