import { useRef } from "react";
import {
  useGetIdentity,
  useGetRecordId,
  useCreate,
  useDelete,
} from "react-admin";
import { useAsyncEffect } from "@react-admin/ra-realtime";


export const useAddReaderToTicket = () => {
  const { data: identity, isLoading: isGetIdentityLoading } = useGetIdentity();
  const id = useGetRecordId();
  const read = useRef<any>();

  const [create] = useCreate();
  const [deleteRead] = useDelete();

  useAsyncEffect(
    async () => {
      if (isGetIdentityLoading) return;
      if (!identity) {
        throw new Error(
          "The AuthProvider must have a getIdentity function for locks to work or you must provide the identity option"
        );
      }
      create(
        "ticketReads",
        {
          data: {
            ticketId: id,
            userId: identity.id,
            date: new Date(),
          },
        },
        {
          onSuccess: (data) => {
            read.current = data;
          },
        }
      );
    },
    async () => {
      if (read.current) {
        deleteRead("ticketReads", { id: read.current.id });
      }
    },
    [id, identity, isGetIdentityLoading]
  );
};
