import { useGetIdentity, useGetRecordId } from "react-admin";
import { useGetListLive } from "@react-admin/ra-realtime";

export const useGetTicketReadsForRecord = () => {
  const id = useGetRecordId();
  const { data: identity } = useGetIdentity();
  const { data: ticketReads } = useGetListLive(
    "ticketReads",
    {
      filter: { ticketId: id, userId_neq: identity?.id },
      sort: { field: "date", order: "DESC" },
      pagination: { page: 1, perPage: 100 },
    },
    { enabled: !!identity }
  );

  return ticketReads;
};
