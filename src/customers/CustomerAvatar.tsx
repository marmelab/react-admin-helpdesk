import { useRecordContext } from "react-admin";
import { Avatar } from "@mui/material";

export const CustomerAvatar = ({
  size = "normal",
}: {
  size?: "small" | "normal";
}) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Avatar
      src={record.avatar}
      sx={size === "small" ? { width: 24, height: 24 } : {}}
    />
  );
};
