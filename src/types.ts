import { RaRecord } from "react-admin";

export interface Ticket extends RaRecord {
  id: number;
  customer_id: number;
  subject: string;
  status: string;
  updated_at: string;
}

export interface Message extends RaRecord {
  id: number;
  author: "customer" | "agent";
  message: string;
  ticket_id: number;
  email: string;
  customer_id: number;
  agent_id: number;
  timestamp: string;
}

export interface Customer extends RaRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  update_at?: string;
}
