import { useGetIdentity } from "react-admin";
import { useGetListLive } from "@react-admin/ra-realtime";

const emptyArray: any[] = [];

export const useGetAllTicketReads = () => {
  const { data: identity } = useGetIdentity();
  const { data: ticketReads } = useGetListLive(
    "ticketReads",
    {
      filter: { userId_neq: identity?.id },
      sort: { field: "date", order: "DESC" },
      pagination: { page: 1, perPage: 100 },
    },
    { enabled: !!identity }
  );

  return ticketReads;
};
