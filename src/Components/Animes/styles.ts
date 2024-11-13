import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    padding: 20px;
    /* background-color: #eaeaea;  */
    min-height: 100vh; 
`;

export const AnimeCard = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0; 
    border-radius: 12px; 
    padding: 20px;
    margin: 15px; 
    width: 100%; 
    max-width: 250px; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s; 
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
`;

export const Title = styled.h2`
    font-size: 20px; 
    color: #222; 
    margin-bottom: 10px; 
    text-align: center; 
    font-family: 'Arial', sans-serif; 
`;

export const AnimeImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px; 
    margin-bottom: 10px; 
    border: 1px solid #f1f1f1; 
`;

export const Synopsis = styled.p`
    font-size: 14px;
    color: #555; 
    line-height: 1.5; 
    margin-bottom: 8px; 
`;

export const Episodes = styled.p`
    font-size: 14px;
    color: #333; 
    font-weight: bold; 
    margin-bottom: 5px; 
`;

export const Genres = styled.p`
    font-size: 12px;
    color: #999; 
    font-style: italic; 
`;
