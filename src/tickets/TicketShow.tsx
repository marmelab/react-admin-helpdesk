import {
  Show,
  TextField,
  ReferenceManyField,
  DateField,
  ReferenceField,
  SimpleShowLayout,
  useRecordContext,
} from "react-admin";
import { Box } from "@mui/material";

import { MessageList } from "./MessageList";
import { StatusField } from "./StatusField";
import { useAddReaderToTicket } from "./useAddReaderToTicket";
import { ActivityDetail } from "./ActivityDetail";

export const TicketShow = () => {
  useAddReaderToTicket();
  return (
    <Show aside={<ShowAside />}>
      <SimpleShowLayout>
        <TextField source="subject" label="" variant="h5" sx={{ ml: "72px" }} />
        <ReferenceManyField
          label={false}
          reference="messages"
          target="ticket_id"
          sort={{ field: "timestamp", order: "ASC" }}
        >
          <MessageList />
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};

const ShowAside = () => {
  const record = useRecordContext();
  if (!record) return <Box minWidth={200} flexShrink={0} />;
  return (
    <SimpleShowLayout sx={{ minWidth: 200, flexShrink: 0 }}>
      <StatusField label="Status" />
      <DateField source="updated_at" showTime />
      <ReferenceField source="customer_id" reference="customers" link="show" />
      <ReferenceField source="product_id" reference="products" link="show" />
      <ActivityDetail />
    </SimpleShowLayout>
  );
};
