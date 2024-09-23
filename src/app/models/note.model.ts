export interface Note {
    id: string; // Único identificador para cada nota
    title: string;
    content: string;
    isFavorite?: boolean; // Campo opcional para marcar como favorita
  }