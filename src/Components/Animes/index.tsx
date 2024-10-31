// src/Components/AnimeComponent.tsx

import React from 'react';
import { Container, AnimeCard, Title, AnimeImage, Synopsis, Episodes, Genres } from './styles'; 
export interface Genre {
    mal_id: number;
    type?: string; 
    name: string;
    url?: string; 
}

export interface Anime {
    title: string;
    synopsis: string;
    imageUrl: string; 
    episodes: string;
    genres: Genre[]; 
    trailerUrl: string | null; 
}

interface AnimeComponentProps {
    animeData: Anime[]; 
    onAnimeSelect: (anime: Anime) => void; 
}

const AnimeComponent: React.FC<AnimeComponentProps> = ({ animeData, onAnimeSelect }) => {
    
    return (
        <Container>
            {animeData.length === 0 ? (
                <p>Nenhum anime encontrado.</p>
            ) : (
                animeData.map((anime, index) => (
                    <AnimeCard key={index} onClick={() => onAnimeSelect(anime)}> 
                        <Title>{anime.title}</Title>
                        <AnimeImage src={anime.imageUrl} alt={anime.title} />
                        <Synopsis><strong>Sinopse:</strong> {anime.synopsis}</Synopsis>
                        <Episodes><strong>Número de episódios:</strong> {anime.episodes}</Episodes>
                        <Genres><strong>Gêneros:</strong> {anime.genres.map(genre => genre.name).join(', ')}</Genres>
                    </AnimeCard>
                ))
            )}
        </Container>
    );
};

export default AnimeComponent;