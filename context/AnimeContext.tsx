import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { AnimeDetail } from "@/services/animeApi";

interface AnimeContextProps {

  saintSeiyaCharacter: AnimeDetail | null;
  hunterCharacter: AnimeDetail | null;
  onePieceCharacter: AnimeDetail | null;

  setSaintSeiyaCharacter: (
    character: AnimeDetail | null
  ) => void;

  setHunterCharacter: (
    character: AnimeDetail | null
  ) => void;

  setOnePieceCharacter: (
    character: AnimeDetail | null
  ) => void;
}

const AnimeContext =
  createContext<AnimeContextProps>(
    {} as AnimeContextProps
  );

interface Props {
  children: ReactNode;
}

export function AnimeProvider({
  children,
}: Props) {

  const [
    saintSeiyaCharacter,
    setSaintSeiyaCharacter,
  ] = useState<AnimeDetail | null>(null);

  const [
    hunterCharacter,
    setHunterCharacter,
  ] = useState<AnimeDetail | null>(null);

  const [
    onePieceCharacter,
    setOnePieceCharacter,
  ] = useState<AnimeDetail | null>(null);

  return (
    <AnimeContext.Provider
      value={{
        saintSeiyaCharacter,
        hunterCharacter,
        onePieceCharacter,

        setSaintSeiyaCharacter,
        setHunterCharacter,
        setOnePieceCharacter,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
}

export function useAnime() {
  return useContext(AnimeContext);
}