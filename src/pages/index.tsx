// src/pages/Home.tsx

import React, { useState } from "react";
import {
  Container,
  SearchInput,
  LoadingMessage,
  NoResultsMessage,
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
} from "./styles"; 
import AnimeComponent from "../Components/Animes";
import TrailerComponent from "../Components/AnimeTrailer";

export interface Genre {
  mal_id: number;
  name: string;
  type?: string;
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

interface ApiResponse {
  data: {
    title: string;
    synopsis: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    episodes: number;
    trailer: {
      youtube_id: string;
      url: string | null;
      embed_url: string | null;
    };
    genres: {
      mal_id: number;
      name: string;
      type?: string;
      url?: string;
    }[];
  }[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

const Home: React.FC = () => {
  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [animeName, setAnimeName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const limit = 10;
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const fetchAnimeData = async (name: string, page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${name}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar dados dos animes");
      }
      const data: ApiResponse = await response.json();

      const formattedData: Anime[] = data.data.map((item) => ({
        title: item.title,
        synopsis: item.synopsis,
        imageUrl: item.images.jpg.image_url,
        episodes: item.episodes.toString(),
        genres: item.genres.map((genre) => ({
          mal_id: genre.mal_id,
          name: genre.name,
          type: genre.type,
          url: genre.url,
        })),
        trailerUrl: item.trailer.embed_url,
      }));

      setAnimeData(formattedData);
      setHasNextPage(data.pagination.has_next_page);
    } catch (error) {
      console.error(error);
      setAnimeData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      fetchAnimeData(animeName, 1);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchAnimeData(animeName, nextPage);
  };

  const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage > 0) {
      setCurrentPage(prevPage);
      fetchAnimeData(animeName, prevPage);
    }
  };

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Pesquise pelo nome do anime"
        value={animeName}
        onChange={(e) => setAnimeName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {loading && <LoadingMessage>Carregando...</LoadingMessage>}

      <AnimeComponent animeData={animeData} onAnimeSelect={setSelectedAnime} />

      {animeData.length === 0 && !loading && (
        <NoResultsMessage>Nenhum anime encontrado.</NoResultsMessage>
      )}

      <TrailerComponent
        trailerUrl={selectedAnime ? selectedAnime.trailerUrl : null}
      />

      <PaginationContainer>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Página Anterior
        </PaginationButton>
        <PaginationInfo>Página {currentPage}</PaginationInfo>
        <PaginationButton onClick={handleNextPage} disabled={!hasNextPage}>
          Próxima Página
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default Home;
