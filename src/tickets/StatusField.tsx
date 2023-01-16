import { useRecordContext } from "react-admin";
import { Chip } from "@mui/material";

export const StatusField = (_props: { label?: string }) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Chip
      label={record.status}
      size="small"
      color={
        record.status === "open"
          ? "primary"
          : record.status === "pending"
          ? "secondary"
          : "default"
      }
    />
  );
};
