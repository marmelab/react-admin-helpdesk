import {
  Datagrid,
  DateField,
  EmailField,
  ReferenceField,
  ReferenceManyCount,
  ReferenceManyField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from "react-admin";

import { CustomerAvatar } from "../customers/CustomerAvatar";
import { StatusField } from "../tickets/StatusField";
import { DateField as TicketDateField } from "../tickets/DateField";
import { SubjectField } from "../tickets/SubjectField";
import { FromField } from "../tickets/FromField";

export const ProductShow = () => (
  <Show>
    <TextField source="model" variant="h5" component="div" m={2} />
    <TabbedShowLayout
      sx={{
        "& .RaTabbedShowLayout-content": {
          p: 0,
        },
      }}
    >
      <Tab
        label="Customers"
        count={<ReferenceManyCount reference="customers" target="product_id" />}
      >
        <ReferenceManyField
          label={false}
          reference="customers"
          target="product_id"
        >
          <Datagrid rowClick="show">
            <CustomerAvatar size="small" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source="email" />
            <ReferenceManyCount
              label="Tickets"
              reference="tickets"
              target="customer_id"
            />
            <DateField label="Latest message" source="updated_at" showTime />
            <TextField source="phone" />
            <TextField source="city" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab
        label="Tickets"
        count={<ReferenceManyCount reference="tickets" target="product_id" />}
      >
        <ReferenceManyField
          label={false}
          reference="tickets"
          target="product_id"
        >
          <Datagrid rowClick="show">
            <ReferenceField source="customer_id" reference="customers" label="">
              <CustomerAvatar size="small" />
            </ReferenceField>
            <ReferenceField source="customer_id" reference="customers" />
            <TicketDateField label="Date" source="updated_at" />
            <SubjectField />
            <FromField />
            <StatusField />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
