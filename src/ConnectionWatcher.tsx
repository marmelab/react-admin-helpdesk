import { useSubscribe } from "@react-admin/ra-realtime";
import { useNotify, useDataProvider } from "react-admin";

export const ConnectionWatcher = () => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  useSubscribe("connectedUsers", (event) => {
    if (event.type === "connected") {
      dataProvider
        .getOne("agents", { id: event.payload.agentId })
        .then(({ data }) => {
          notify(`Agent ${data.firstName} ${data.lastName} just logged in`, {
            type: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        });
    }
    if (event.type === "disconnected") {
      dataProvider
        .getOne("agents", { id: event.payload.agentId })
        .then(({ data }) => {
          notify(`Agent ${data.firstName} ${data.lastName} just logged out`, {
            type: "success",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        });
    }
  });
  return null;
};
