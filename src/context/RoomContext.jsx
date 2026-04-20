import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { backendUrl } from "../App";

export const RoomContext = createContext();

export const RoomContextProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]); // ✅ empty initial
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotelRoom = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/hotel/list`);

      console.log(response.data); // 🔍 check structure

      if (response.data) {
        setRooms(response.data.hotels || response.data.rooms || response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHotelRoom();
  }, []);

  return (
    <RoomContext.Provider value={{ rooms, loading, error, fetchHotelRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
