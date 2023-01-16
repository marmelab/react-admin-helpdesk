import { createContext, useContext } from "react";

export const TicketReadsContext = createContext<any[]>([]);

export const useTicketReadsContext = () => useContext(TicketReadsContext);
