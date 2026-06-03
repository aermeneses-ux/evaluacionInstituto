import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Ajusta la URL según tu entorno:
// - iOS Simulator → http://localhost:3000
// - Android Emulator → http://10.0.2.2:3000
// - Dispositivo físico → http://<IP-de-tu-PC>:3000
const API_URL = "http://localhost:3000/tickets";

export interface Ticket {
  id?: string;
  nombre: string;
  asunto: string;
  importancia: "baja" | "media" | "alta";
  fecha: string; // formato dd/mm/aaaa
  descripcion: string;
  tipo: "fisico" | "virtual"; 
  factura: "true" | "false";  
}

interface TicketContextType {
  tickets: Ticket[];
  cargarTickets: () => Promise<void>;
  crearTicket: (ticket: Omit<Ticket, "id">) => Promise<void>;
  editarTicket: (ticket: Ticket) => Promise<void>;
  eliminarTicket: (id: string) => Promise<void>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const cargarTickets = async () => {
    try {
      const res = await axios.get(API_URL);
      setTickets(res.data);
    } catch (error) {
      console.error("Error cargando tickets:", error);
    }
  };

  const crearTicket = async (ticket: Omit<Ticket, "id">) => {
    try {
      const res = await axios.post(API_URL, ticket);
      setTickets([...tickets, res.data]);
    } catch (error) {
      console.error("Error creando ticket:", error);
    }
  };

  const editarTicket = async (ticket: Ticket) => {
    try {
      const res = await axios.put(`${API_URL}/${ticket.id}`, ticket);
      setTickets(tickets.map(t => t.id === ticket.id ? res.data : t));
    } catch (error) {
      console.error("Error editando ticket:", error);
    }
  };

  const eliminarTicket = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTickets(tickets.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error eliminando ticket:", error);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  return (
    <TicketContext.Provider value={{ tickets, cargarTickets, crearTicket, editarTicket, eliminarTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets debe usarse dentro de TicketProvider");
  }
  return context;
};