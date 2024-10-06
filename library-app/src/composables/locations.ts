import { ref } from 'vue';

interface Location {
  location_id?: string | null;
  room: string;
  shelf: string;
  bookcase: string;
  position: string;
  // otros campos que tu localización pueda tener
}

const BASE_URL = "http://localhost:3000";

export function useLocations() {
  const locations = ref<any[]>([]);
  const error = ref<string | null>(null);

  const getLocations = async (): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/locations`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Location[] = await response.json();
      locations.value = data;
    } catch (err: any) {
      error.value = err.message;
    }
  }

  const getLocation = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/locations/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Location = await response.json();
      locations.value = [data];
    } catch (err: any) {
      error.value = err.message;
    }
  }

  const addLocation = async (location: Location): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (err: any) {
      error.value = err.message;
    }
  }

  const updateLocation = async (location: Location): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/locations/${location.location_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (err: any) {
      error.value = err.message;
    }
  }

  const deleteLocation = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/locations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (err: any) {
      error.value = err.message;
    }
  }

  return {
    locations,
    error,
    getLocations,
    getLocation,
    addLocation,
    updateLocation,
    deleteLocation
  };
}

export type { Location as LocationType };
