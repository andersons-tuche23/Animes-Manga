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
import Modal from "../Components/Modal"; 
import { Anime, ApiResponse } from "./types";

const Home: React.FC = () => {
  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [animeName, setAnimeName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const limit = 10;
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        genres: item.genres,
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

  const handleAnimeSelect = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true); 
  };

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Pesquise pelo nome do anime"
        value={animeName}
        onChange={(e) => setAnimeName(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setCurrentPage(1);
            fetchAnimeData(animeName, 1);
          }
        }}
      />
      {loading && <LoadingMessage>Carregando...</LoadingMessage>}

      <AnimeComponent
        animeData={animeData}
        onAnimeSelect={handleAnimeSelect} 
      />

      {animeData.length === 0 && !loading && (
        <NoResultsMessage>Nenhum anime encontrado.</NoResultsMessage>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        trailerUrl={selectedAnime ? selectedAnime.trailerUrl : null}
      />

      <PaginationContainer>
        <PaginationButton
          onClick={() => setCurrentPage((page) => page - 1)}
          disabled={currentPage === 1}
        >
          Página Anterior
        </PaginationButton>
        <PaginationInfo>Página {currentPage}</PaginationInfo>
        <PaginationButton
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={!hasNextPage}
        >
          Próxima Página
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default Home;
