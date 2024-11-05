// src/types.ts
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
  
  // Interface ApiResponse se já foi definida anteriormente
  export interface ApiResponse {
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
      genres: Genre[];
    }[];
    pagination: {
      last_visible_page: number;
      has_next_page: boolean;
    };
  }
  