// API Service para consultar datos de personajes de animes
// Usando API Flask local en http://127.0.0.1:5000

export interface Character {
  id: number;
  name: string;
  anime_id: number;
  birth_date: string;
  main_power: string;
  origin: string;
  anime: string;
  techniques?: string[];
  images?: string[];
  extra_data?: string[];
}

export interface AnimeDetail {
  nombre: string;
  poder: string;
  imagenes: string[];
  score: number;
  year: number;
  id?: number;
  anime?: string;
  anime_id?: number;
  techniques?: string[];
  ciudad?: string;
  birth_date?: string;
  extra_data?: string[];
}

// // const API_BASE_URL = "http://127.0.0.1:5000";
const API_BASE_URL = "https://anime-api-3upj.onrender.com";

export async function searchAnime(query: string): Promise<AnimeDetail[]> {
  try {
    const url = `${API_BASE_URL}/characters`;
    console.log("🔍 Fetching characters from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("📊 Response status:", response.status);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const characters: Character[] = await response.json();
    console.log("✅ Characters received:", characters.length);

    if (!characters || characters.length === 0) {
      console.log("⚠️ No characters found in response");
      return [];
    }

    // Filtrar por nombre
    const filteredCharacters = characters.filter((character) => {
      const name = (character.name || "").toLowerCase();
      const searchLower = query.toLowerCase();
      return name.includes(searchLower);
    });

    console.log("🎯 Filtered results:", filteredCharacters.length);

    // Obtener detalles de cada personaje (técnicas, imágenes)
    const detailedCharacters = await Promise.all(
      filteredCharacters.slice(0, 5).map(async (char) => {
        try {
          const detailResponse = await fetch(
            `${API_BASE_URL}/characters/${char.id}`,
          );
          if (detailResponse.ok) {
            const detailedChar: Character = await detailResponse.json();
            return {
              nombre: detailedChar.name,
              poder: detailedChar.main_power,
              ciudad: detailedChar.origin,
              imagenes: detailedChar.images || [],
              birth_date: detailedChar.birth_date || "",
              id: detailedChar.id,
              anime_id: detailedChar.anime_id,
              anime: detailedChar.anime,
              techniques: detailedChar.techniques || [],
              extra_data: detailedChar.extra_data || [],
            };
          }
        } catch (error) {
          console.error(
            `Error fetching details for character ${char.id}:`,
            error,
          );
        }

        // Fallback si no se puede obtener detalles
        return {
          nombre: char.name,
          poder: `${char.main_power} • ${char.anime}`,
          imagenes: [],
          score: 0,
          year: 0,
          id: char.id,
          anime: char.anime,
          anime_id: char.anime_id,
        };
      }),
    );

    return detailedCharacters.filter((char) => char !== null);
  } catch (error) {
    console.error("❌ Error fetching characters:", error);
    throw error;
  }
}

export async function getCharacterDetails(
  characterId: number,
): Promise<Character> {
  try {
    const url = `${API_BASE_URL}/characters/${characterId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
}

export async function createAnime(name: string) {
  const res = await fetch("http://127.0.0.1:5000/anime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Error creando anime");
  }

  return await res.json();
}

export async function createCharacter(payload: {
  name: string;
  birth_date: string;
  main_power: string;
  origin: string;
  anime_id: number;
  techniques: string[];
}) {
  const response = await fetch(`${API_BASE_URL}/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error creating character");
  }

  return data;
}

export interface Anime {
  id: number;
  name: string;
}

export async function getAnimes(): Promise<Anime[]> {
  const response = await fetch(`${API_BASE_URL}/anime`);

  if (!response.ok) {
    throw new Error("Error fetching animes");
  }

  return response.json();
}

/* =========================
   AGREGAR IMAGEN A PERSONAJE
========================= */

export async function addCharacterImage(characterId: number, imageUrl: string) {
  const response = await fetch(
    `${API_BASE_URL}/characters/${characterId}/images`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: imageUrl, // ← era image_url
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error agregando imagen");
  }

  return data;
}
