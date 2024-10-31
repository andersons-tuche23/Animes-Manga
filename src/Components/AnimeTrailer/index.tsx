import React from "react";

interface TrailerComponentProps {
  trailerUrl: string | null; 
}

const TrailerComponent: React.FC<TrailerComponentProps> = ({ trailerUrl }) => {
  if (!trailerUrl) {
    return null; 
  }

  return (
    <div>
      <h2>Trailer</h2>
      <iframe
        width="560"
        height="315"
        src={trailerUrl}
        title="Trailer"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default TrailerComponent;
