import { useRef } from "react";
import {
  Form,
  required,
  SelectInput,
  TextInput,
  useCreate,
  useGetIdentity,
  useListContext,
  useRecordContext,
  useUpdate,
} from "react-admin";
import { useLockOnCall, useGetLockLive } from "@react-admin/ra-realtime";
import { useFormContext } from "react-hook-form";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";

export const NewMessageForm = () => {
  const { data: lock } = useGetLockLive("tickets");
  const [doLock] = useLockOnCall({ resource: "tickets" });

  const { refetch } = useListContext();
  const record = useRecordContext();
  const [create, { isLoading: isCreating }] = useCreate();
  const [update] = useUpdate();
  const resetForm = useRef<any>();
  const { identity } = useGetIdentity();

  const isFormDisabled = lock && lock.identity !== identity?.id;

  const handleSubmit = (values: any) => {
    const { status, ...message } = values;
    const timestamp: string = new Date().toISOString();
    create(
      "messages",
      {
        data: {
          id: uuidv4(),
          ...message,
          ticket_id: record.id,
          author: "agent",
          email: identity?.email,
          agent_id: identity?.id,
          timestamp,
        },
      },
      {
        onSuccess: () => {
          update("tickets", {
            id: record.id,
            data: { status, updated_at: timestamp },
          });
          resetForm.current && resetForm.current();
          refetch();
        },
      }
    );
  };

  return (
    <ListItem alignItems="flex-start" sx={{ backgroundColor: "#ffffef" }}>
      <ListItemAvatar>
        <Avatar src={identity?.avatar} />
      </ListItemAvatar>
      <ListItemText
        sx={{
          width: "100%",
          flexDirection: "column-reverse",
          display: "flex",
          gap: 0.5,
          "& .MuiListItemText-primary": {
            whiteSpace: "pre-line",
          },
          "& .MuiListItemText-secondary": {},
        }}
        secondary={`${identity?.fullName} <${identity?.email}>`}
      >
        <Form
          onSubmit={handleSubmit}
          record={{
            status: "pending",
          }}
        >
          <SetFormContext resetForm={resetForm} />
          <TextInput
            source="message"
            multiline
            fullWidth
            minRows={3}
            helperText={false}
            validate={required()}
            onFocus={() => {
              doLock();
            }}
            disabled={isFormDisabled}
          />
          <SelectInput
            source="status"
            choices={[
              { id: "open", name: "Open" },
              { id: "pending", name: "Pending" },
              { id: "closed", name: "Closed" },
            ]}
            validate={required()}
            disabled={isFormDisabled}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 2 }}
            disabled={isCreating || isFormDisabled}
          >
            Submit
          </Button>
        </Form>
      </ListItemText>
    </ListItem>
  );
};

const SetFormContext = ({ resetForm }: any) => {
  const form = useFormContext();
  resetForm.current = form.reset;
  return null;
};
