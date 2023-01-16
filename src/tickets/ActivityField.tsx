import { useRecordContext, useGetOne } from "react-admin";
import { useLocksContext } from "@react-admin/ra-realtime";
import { Tooltip, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";

import { useTicketReadsContext } from "./TicketReadsContext";

export const ActivityField = () => {
  const record = useRecordContext();

  const locks = useLocksContext();
  const lock = locks.find((lock) => lock.recordId === record?.id);

  const reads = useTicketReadsContext();
  const read = reads.find((read) => read.ticketId === record?.id);

  if (!record) return <PlaceHolder />;
  if (lock) return <LockedIcon identity={lock.identity} />;
  if (read) return <ReadIcon identity={read.userId} />;
  return <PlaceHolder />;
};

ActivityField.defaultProps = {
  label: "",
  source: "lock",
};

const LockedIcon = ({ identity }: { identity?: string }) => {
  const { data: agent, isLoading } = useGetOne("agents", { id: identity });

  if (isLoading) return <PlaceHolder />;
  if (!agent) return <PlaceHolder />;

  return (
    <Tooltip title={`Locked by ${agent.firstName} ${agent.lastName}`}>
      <LockIcon fontSize="small" color="action" />
    </Tooltip>
  );
};

const ReadIcon = ({ identity }: { identity?: string }) => {
  const { data: agent, isLoading } = useGetOne("agents", { id: identity });

  if (isLoading) return <PlaceHolder />;
  if (!agent) return <PlaceHolder />;

  return (
    <Tooltip title={`Read by ${agent.firstName} ${agent.lastName}`}>
      <VisibilityIcon fontSize="small" color="action" />
    </Tooltip>
  );
};

const PlaceHolder = () => <Box width={20} />;
