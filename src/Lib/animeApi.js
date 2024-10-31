// // src/lib/animeApi.js

// const fetchAnimeData = async (animeName) => {
//     try {
//         const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`); // Substitua pela sua URL da API
//         if (!response.ok) {
//             throw new Error('Erro ao buscar dados do anime');
//         }
//         const { data } = await response.json(); // Aqui assumimos que a resposta JSON contém uma chave "data"
// console.log(data, 'data');

//         // Para cada anime, extraia os dados relevantes
//         return data.map(anime => ({
//             title: anime.title,
//             synopsis: anime.synopsis,
//             imageUrl: anime.image_url,
//             episodes: anime.episodes,
//             genres: anime.genres.map(genre => genre.name).join(', '),
//         }));
//     } catch (error) {
//         console.error('Erro:', error);
//         return []; // Retorna um array vazio em caso de erro
//     }
// };

// export default fetchAnimeData;
