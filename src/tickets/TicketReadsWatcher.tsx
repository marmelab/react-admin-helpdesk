import * as React from "react";

import { useGetAllTicketReads } from "./useGetAllTicketReads";
import { TicketReadsContext } from "./TicketReadsContext";

const emptyArray: any[] = [];

export const TicketReadsWatcher = ({ children }: AnyChildProps) => (
  <TicketReadsContext.Provider value={useGetAllTicketReads() || emptyArray}>
    {children}
  </TicketReadsContext.Provider>
);

interface AnyChildProps {
  children: React.ReactNode;
}
