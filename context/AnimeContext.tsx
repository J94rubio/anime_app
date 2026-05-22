// // // import React, {
// // //   createContext,
// // //   useContext,
// // //   useState,
// // //   ReactNode,
// // // } from "react";

// // // import { AnimeDetail } from "@/services/animeApi";

// // // interface AnimeContextProps {

// // //   saintSeiyaCharacter: AnimeDetail | null;
// // //   hunterCharacter: AnimeDetail | null;
// // //   onePieceCharacter: AnimeDetail | null;

// // //   setSaintSeiyaCharacter: (
// // //     character: AnimeDetail | null
// // //   ) => void;

// // //   setHunterCharacter: (
// // //     character: AnimeDetail | null
// // //   ) => void;

// // //   setOnePieceCharacter: (
// // //     character: AnimeDetail | null
// // //   ) => void;
// // // }

// // // const AnimeContext =
// // //   createContext<AnimeContextProps>(
// // //     {} as AnimeContextProps
// // //   );

// // // interface Props {
// // //   children: ReactNode;
// // // }

// // // export function AnimeProvider({
// // //   children,
// // // }: Props) {

// // //   const [
// // //     saintSeiyaCharacter,
// // //     setSaintSeiyaCharacter,
// // //   ] = useState<AnimeDetail | null>(null);

// // //   const [
// // //     hunterCharacter,
// // //     setHunterCharacter,
// // //   ] = useState<AnimeDetail | null>(null);

// // //   const [
// // //     onePieceCharacter,
// // //     setOnePieceCharacter,
// // //   ] = useState<AnimeDetail | null>(null);

// // //   return (
// // //     <AnimeContext.Provider
// // //       value={{
// // //         saintSeiyaCharacter,
// // //         hunterCharacter,
// // //         onePieceCharacter,

// // //         setSaintSeiyaCharacter,
// // //         setHunterCharacter,
// // //         setOnePieceCharacter,
// // //       }}
// // //     >
// // //       {children}
// // //     </AnimeContext.Provider>
// // //   );
// // // }

// // // export function useAnime() {
// // //   return useContext(AnimeContext);
// // // }

// // import React, {
// //   createContext,
// //   ReactNode,
// //   useContext,
// //   useEffect,
// //   useState,
// // } from "react";

// // import { Anime, AnimeDetail, getAnimes } from "@/services/animeApi";

// // interface AnimeContextProps {
// //   animes: Anime[];

// //   selectedAnime: Anime | null;

// //   charactersByAnime: Record<number, AnimeDetail | null>;

// //   setSelectedAnime: (anime: Anime | null) => void;

// //   setCharacterForAnime: (
// //     animeId: number,
// //     character: AnimeDetail | null,
// //   ) => void;

// //   refreshAnimes: () => Promise<void>;
// // }

// // const AnimeContext = createContext({} as AnimeContextProps);

// // interface Props {
// //   children: ReactNode;
// // }

// // export function AnimeProvider({ children }: Props) {
// //   const [animes, setAnimes] = useState<Anime[]>([]);

// //   const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

// //   const [charactersByAnime, setCharactersByAnime] = useState<
// //     Record<number, AnimeDetail | null>
// //   >({});

// //   async function refreshAnimes() {
// //     try {
// //       const data = await getAnimes();

// //       setAnimes(data);

// //       if (data.length > 0 && !selectedAnime) {
// //         setSelectedAnime(data[0]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching animes:", error);
// //     }
// //   }

// //   function setCharacterForAnime(
// //     animeId: number,
// //     character: AnimeDetail | null,
// //   ) {
// //     setCharactersByAnime((prev) => ({
// //       ...prev,
// //       [animeId]: character,
// //     }));
// //   }

// //   useEffect(() => {
// //     refreshAnimes();
// //   }, []);

// //   return (
// //     <AnimeContext.Provider
// //       value={{
// //         animes,

// //         selectedAnime,

// //         charactersByAnime,

// //         setSelectedAnime,

// //         setCharacterForAnime,

// //         refreshAnimes,
// //       }}
// //     >
// //       {children}
// //     </AnimeContext.Provider>
// //   );
// // }

// // export function useAnime() {
// //   return useContext(AnimeContext);
// // }

// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import { AnimeDetail } from "@/services/animeApi";

// /* =========================
//    TIPOS
// ========================= */

// export interface Anime {
//   id: number;
//   name: string;
// }

// /* =========================
//    CONTEXT TYPE
// ========================= */

// interface AnimeContextProps {
//   /* LISTA DE ANIMES */
//   animes: Anime[];
//   setAnimes: (animes: Anime[]) => void;
//   loadingAnimes: boolean;
//   refreshAnimes: () => Promise<void>;

//   /* PERSONAJES (RESUMEN) */
//   saintSeiyaCharacter: AnimeDetail | null;
//   hunterCharacter: AnimeDetail | null;
//   onePieceCharacter: AnimeDetail | null;

//   setSaintSeiyaCharacter: (character: AnimeDetail | null) => void;
//   setHunterCharacter: (character: AnimeDetail | null) => void;
//   setOnePieceCharacter: (character: AnimeDetail | null) => void;
// }

// /* =========================
//    CONTEXT
// ========================= */

// const AnimeContext = createContext<AnimeContextProps>({} as AnimeContextProps);

// /* =========================
//    PROVIDER
// ========================= */

// interface Props {
//   children: ReactNode;
// }

// export function AnimeProvider({ children }: Props) {
//   /* ===== ANIMES STATE ===== */
//   const [animes, setAnimes] = useState<Anime[]>([]);
//   const [loadingAnimes, setLoadingAnimes] = useState(false);

//   /* ===== PERSONAJES STATE ===== */
//   const [saintSeiyaCharacter, setSaintSeiyaCharacter] =
//     useState<AnimeDetail | null>(null);

//   const [hunterCharacter, setHunterCharacter] = useState<AnimeDetail | null>(
//     null,
//   );

//   const [onePieceCharacter, setOnePieceCharacter] =
//     useState<AnimeDetail | null>(null);

//   /* =========================
//      FETCH ANIMES
//   ========================= */

//   const refreshAnimes = async () => {
//     try {
//       setLoadingAnimes(true);

//       const res = await fetch("http://127.0.0.1:5000/anime");

//       const data = await res.json();

//       setAnimes(data);
//     } catch (error) {
//       console.error("Error cargando animes:", error);
//     } finally {
//       setLoadingAnimes(false);
//     }
//   };

//   /* =========================
//      INIT LOAD
//   ========================= */

//   useEffect(() => {
//     refreshAnimes();
//   }, []);

//   /* =========================
//      PROVIDER VALUE
//   ========================= */

//   return (
//     <AnimeContext.Provider
//       value={{
//         /* ANIMES */
//         animes,
//         setAnimes,
//         loadingAnimes,
//         refreshAnimes,

//         /* PERSONAJES */
//         saintSeiyaCharacter,
//         hunterCharacter,
//         onePieceCharacter,

//         setSaintSeiyaCharacter,
//         setHunterCharacter,
//         setOnePieceCharacter,
//       }}
//     >
//       {children}
//     </AnimeContext.Provider>
//   );
// }

// /* =========================
//    HOOK
// ========================= */

// export function useAnime() {
//   return useContext(AnimeContext);
// }

// import { AnimeDetail } from "@/services/animeApi";
// import React, { createContext, ReactNode, useContext, useState } from "react";

// /* =========================
//    TYPES
// ========================= */

// interface Anime {
//   id: number;
//   name: string;
// }

// interface AnimeContextProps {
//   animes: Anime[];

//   charactersByAnime: Record<number, AnimeDetail | null>;

//   setCharacterForAnime: (
//     animeId: number,
//     character: AnimeDetail | null,
//   ) => void;

//   addAnime: (anime: Anime) => void;
// }

// /* =========================
//    CONTEXT
// ========================= */

// const AnimeContext = createContext<AnimeContextProps>({} as AnimeContextProps);

// /* =========================
//    PROVIDER
// ========================= */

// export function AnimeProvider({ children }: { children: ReactNode }) {
//   /* ANIMES BASE + DINÁMICOS */
//   const [animes, setAnimes] = useState<Anime[]>([
//     { id: 1, name: "Saint Seiya" },
//     { id: 2, name: "Hunter x Hunter" },
//     { id: 3, name: "One Piece" },
//   ]);

//   /* PERSONAJES POR ANIME */
//   const [charactersByAnime, setCharactersByAnime] = useState<
//     Record<number, AnimeDetail | null>
//   >({});

//   /* =========================
//      GUARDAR PERSONAJE POR ANIME
//   ========================= */

//   const setCharacterForAnime = (
//     animeId: number,
//     character: AnimeDetail | null,
//   ) => {
//     setCharactersByAnime((prev) => ({
//       ...prev,
//       [animeId]: character,
//     }));
//   };

//   /* =========================
//      AGREGAR ANIME DINÁMICO
//   ========================= */

//   const addAnime = (anime: Anime) => {
//     setAnimes((prev) => {
//       const exists = prev.some((a) => Number(a.id) === Number(anime.id));
//       if (exists) return prev;

//       return [...prev, anime];
//     });
//   };

//   /* =========================
//      CONTEXT VALUE
//   ========================= */

//   return (
//     <AnimeContext.Provider
//       value={{
//         animes,
//         charactersByAnime,
//         setCharacterForAnime,
//         addAnime,
//       }}
//     >
//       {children}
//     </AnimeContext.Provider>
//   );
// }

// /* =========================
//    HOOK
// ========================= */

// export function useAnime() {
//   return useContext(AnimeContext);
// }

import { AnimeDetail } from "@/services/animeApi";

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

      const res = await fetch("http://127.0.0.1:5000/anime");

      const data = await res.json();

      if (!Array.isArray(data)) return;

      setAnimes((prev) => {
        const merged = [...prev];

        data.forEach((anime: Anime) => {
          const exists = merged.some((a) => Number(a.id) === Number(anime.id));

          if (!exists) {
            merged.push({
              id: Number(anime.id),
              name: anime.name,
            });
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
