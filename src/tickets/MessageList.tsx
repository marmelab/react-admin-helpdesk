import { Fragment } from "react";
import { useListContext, ReferenceField } from "react-admin";
import { useFormContext } from "react-hook-form";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";

import { NewMessageForm } from "./NewMessageForm";
import { CustomerAvatar } from "../customers/CustomerAvatar";

export const MessageList = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) return null;
  return (
    <List sx={{ width: "100%", pt: 0 }}>
      {data.map((message) => (
        <Fragment key={message.id}>
          <ListItem
            alignItems="flex-start"
            sx={
              message.author === "agent" ? { backgroundColor: "#ffffef" } : {}
            }
          >
            <ListItemAvatar>
              {message.author === "agent" ? (
                <ReferenceField
                  record={message}
                  source="agent_id"
                  reference="agents"
                  label=""
                >
                  <CustomerAvatar />
                </ReferenceField>
              ) : (
                <ReferenceField
                  record={message}
                  source="customer_id"
                  reference="customers"
                  label=""
                >
                  <CustomerAvatar />
                </ReferenceField>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={message.message}
              secondary={
                <>
                  {message.author === "agent" ? (
                    <ReferenceField
                      record={message}
                      source="agent_id"
                      reference="agents"
                      label=""
                    />
                  ) : (
                    <ReferenceField
                      record={message}
                      source="customer_id"
                      reference="customers"
                      label=""
                    />
                  )}
                  &nbsp;&lt;{message.email}&gt;
                </>
              }
              sx={{
                flexDirection: "column-reverse",
                display: "flex",
                gap: 0.5,
                "& .MuiListItemText-primary": {
                  whiteSpace: "pre-line",
                },
                "& .MuiListItemText-secondary span": {
                  fontWeight: "bold",
                },
              }}
            />
            <ListItemIcon sx={{ fontSize: "14px" }}>
              {new Date(message.timestamp).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </ListItemIcon>
          </ListItem>
          <Divider component="li" />
        </Fragment>
      ))}
      <NewMessageForm />
    </List>
  );
};
