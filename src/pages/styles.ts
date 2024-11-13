import styled from 'styled-components';



export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export const LoadingMessage = styled.p`
  font-size: 18px;
  color: #555;
`;

export const NoResultsMessage = styled.p`
  font-size: 18px;
  color: #ff0000;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
`;

export const PaginationButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const PaginationInfo = styled.span`
  font-size: 18px;
  color: #333;
`;
