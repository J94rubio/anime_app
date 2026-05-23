import { AnimeDetail, getAnimes } from "@/services/animeApi"; // ← agrega getAnimes

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================
   TYPES
========================= */

interface Anime {
  id: number;
  name: string;
}

interface AnimeContextProps {
  animes: Anime[];

  loadingAnimes: boolean;

  refreshAnimes: () => Promise<void>;

  charactersByAnime: Record<number, AnimeDetail | null>;

  setCharacterForAnime: (
    animeId: number,
    character: AnimeDetail | null,
  ) => void;

  addAnime: (anime: Anime) => void;
}

/* =========================
   CONTEXT
========================= */

const AnimeContext = createContext<AnimeContextProps>({} as AnimeContextProps);

/* =========================
   PROVIDER
========================= */

export function AnimeProvider({ children }: { children: ReactNode }) {
  /* =========================
     ANIMES
  ========================= */

  const [animes, setAnimes] = useState<Anime[]>([
    { id: 1, name: "Saint Seiya" },
    { id: 2, name: "Hunter x Hunter" },
    { id: 3, name: "One Piece" },
  ]);

  const [loadingAnimes, setLoadingAnimes] = useState(false);

  /* =========================
     PERSONAJES POR ANIME
  ========================= */

  const [charactersByAnime, setCharactersByAnime] = useState<
    Record<number, AnimeDetail | null>
  >({});

  /* =========================
     FETCH ANIMES BACKEND
  ========================= */

  const refreshAnimes = async () => {
    try {
      setLoadingAnimes(true);
      const data = await getAnimes(); // ← usa el servicio
      if (!Array.isArray(data)) return;
      setAnimes((prev) => {
        const merged = [...prev];
        data.forEach((anime: Anime) => {
          const exists = merged.some((a) => Number(a.id) === Number(anime.id));
          if (!exists) {
            merged.push({ id: Number(anime.id), name: anime.name });
          }
        });
        return merged;
      });
    } catch (error) {
      console.error("Error cargando animes:", error);
    } finally {
      setLoadingAnimes(false);
    }
  };

  /* =========================
     INIT LOAD
  ========================= */

  useEffect(() => {
    refreshAnimes();
  }, []);

  /* =========================
     GUARDAR PERSONAJE
  ========================= */

  const setCharacterForAnime = (
    animeId: number,
    character: AnimeDetail | null,
  ) => {
    setCharactersByAnime((prev) => ({
      ...prev,
      [animeId]: character,
    }));
  };

  /* =========================
     AGREGAR ANIME
  ========================= */

  const addAnime = (anime: Anime) => {
    setAnimes((prev) => {
      const exists = prev.some((a) => Number(a.id) === Number(anime.id));

      if (exists) return prev;

      return [
        ...prev,
        {
          id: Number(anime.id),
          name: anime.name,
        },
      ];
    });
  };

  /* =========================
     CONTEXT VALUE
  ========================= */

  return (
    <AnimeContext.Provider
      value={{
        animes,
        loadingAnimes,
        refreshAnimes,

        charactersByAnime,
        setCharacterForAnime,

        addAnime,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
}

/* =========================
   HOOK
========================= */

export function useAnime() {
  return useContext(AnimeContext);
}
