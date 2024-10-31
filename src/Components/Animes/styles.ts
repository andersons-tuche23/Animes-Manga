// styles.ts
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap; /* Permite que os cards quebrem para a próxima linha */
    justify-content: center; /* Centraliza os cards no contêiner */
    padding: 20px;
    background-color: #eaeaea; /* Cor de fundo mais suave */
    min-height: 100vh; /* Preenche a altura mínima da tela */
`;

export const AnimeCard = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0; /* Borda mais suave */
    border-radius: 12px; /* Bordas arredondadas mais suaves */
    padding: 20px;
    margin: 15px; /* Margem para espaçar os cards */
    width: 100%; /* Ajuste a largura conforme necessário */
    max-width: 250px; /* Aumenta a largura máxima do card */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra mais suave */
    transition: transform 0.3s, box-shadow 0.3s; /* Transição mais suave */

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Efeito de sombra ao passar o mouse */
    }
`;

export const Title = styled.h2`
    font-size: 20px; /* Tamanho da fonte maior para o título */
    color: #222; /* Cor do título mais escura */
    margin-bottom: 10px; /* Espaçamento abaixo do título */
    text-align: center; /* Centraliza o título */
    font-family: 'Arial', sans-serif; /* Altera a fonte para algo mais elegante */
`;

export const AnimeImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px; /* Bordas arredondadas para a imagem */
    margin-bottom: 10px; /* Espaçamento abaixo da imagem */
    border: 1px solid #f1f1f1; /* Borda sutil em torno da imagem */
`;

export const Synopsis = styled.p`
    font-size: 14px;
    color: #555; /* Cor da sinopse um pouco mais escura */
    line-height: 1.5; /* Melhora o espaçamento entre linhas */
    margin-bottom: 8px; /* Espaçamento abaixo da sinopse */
`;

export const Episodes = styled.p`
    font-size: 14px;
    color: #333; /* Cor do número de episódios */
    font-weight: bold; /* Aumenta a negrito */
    margin-bottom: 5px; /* Espaçamento abaixo */
`;

export const Genres = styled.p`
    font-size: 12px;
    color: #999; /* Cor dos gêneros */
    font-style: italic; /* Estilo em itálico para diferenciar */
`;
