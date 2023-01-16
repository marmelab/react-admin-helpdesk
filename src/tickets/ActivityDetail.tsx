import { ReferenceField, useGetIdentity } from "react-admin";
import { useGetLockLive } from "@react-admin/ra-realtime";
import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";

import { useGetTicketReadsForRecord } from "./useGetTicketReadsForRecord";

export const ActivityDetail = () => {
  const { data: lock } = useGetLockLive("tickets");
  const ticketReads = useGetTicketReadsForRecord();
  const { identity } = useGetIdentity();

  return (
    <>
      {lock && (
        <Box display="flex" gap={1}>
          <LockIcon
            fontSize="small"
            color={identity?.id === lock.identity ? "action" : "warning"}
          />
          <Typography variant="body2">
            <ReferenceField
              record={lock}
              source="identity"
              reference="agents"
            />
          </Typography>
        </Box>
      )}
      {ticketReads
        ?.filter((tickerRead) => tickerRead.userId !== lock?.identity)
        .map((ticketRead) => (
          <Box key={ticketRead.id} display="flex" gap={1}>
            <VisibilityIcon fontSize="small" color="action" />
            <Typography variant="body2">
              <ReferenceField
                record={ticketRead}
                source="userId"
                reference="agents"
              />
            </Typography>
          </Box>
        ))}
    </>
  );
};
ActivityDetail.defaultProps = {
  label: "Activity",
};
