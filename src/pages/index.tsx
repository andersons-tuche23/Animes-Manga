/* eslint-disable @next/next/no-img-element */
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
  const [isGifLoading, setIsGifLoading] = useState<boolean>(false);

  const fetchAnimeData = async (name: string, page: number) => {
    setLoading(true);
    setSelectedAnime(null)
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
        trailerUrl: item.trailer ? item.trailer.embed_url : null,
      })); 

      setAnimeData(formattedData);
      setHasNextPage(data.pagination.has_next_page);
    } catch (error) {
      console.error(error);
      setAnimeData([]);
    } finally {
      setLoading(false);
      setTimeout(() => setIsGifLoading(false), 1000); 
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setIsGifLoading(true); 
    fetchAnimeData(animeName, 1);
  };

  const handleAnimeSelect = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAnime(null)
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
            handleSearch();
          }
        }}
      />
      {isGifLoading && (
        <Modal isOpen={isGifLoading} onClose={() => setIsGifLoading(false)}>
          <div style={{ textAlign: "center" }}>
            <img src="/goku.gif" alt="Carregando..." />
            <p>Carregando...</p>
          </div>
        </Modal>
      )}
      {loading && <LoadingMessage>Carregando...</LoadingMessage>}

      <AnimeComponent animeData={animeData} onAnimeSelect={handleAnimeSelect} />

      {animeData.length === 0 && !loading && (
        <NoResultsMessage>Nenhum anime encontrado.</NoResultsMessage>
      )}

{isModalOpen && selectedAnime && (
  <Modal
    isOpen={isModalOpen}
    onClose={handleModalClose}
    trailerUrl={selectedAnime.trailerUrl}
  />
)}

      <PaginationContainer>
        <PaginationButton
          onClick={() => {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            fetchAnimeData(animeName, newPage);
          }}
          disabled={currentPage === 1}
        >
          Página Anterior
        </PaginationButton>
        <PaginationInfo>Página {currentPage}</PaginationInfo>
        <PaginationButton
          onClick={() => {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            fetchAnimeData(animeName, newPage);
          }}
          disabled={!hasNextPage}
        >
          Próxima Página
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default Home;
