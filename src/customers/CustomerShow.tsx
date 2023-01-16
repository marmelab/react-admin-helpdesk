import {
  FunctionField,
  ReferenceManyField,
  Show,
  TextField,
  Datagrid,
  ReferenceOneField,
} from "react-admin";
import { Box } from "@mui/material";

import { Customer } from "../types";
import { CustomerAvatar } from "./CustomerAvatar";
import { CustomerShowAside } from "./CustomerShowAside";
import { StatusField } from "../tickets/StatusField";
import { DateField } from "../tickets/DateField";
import { SubjectField } from "../tickets/SubjectField";
import { FromField } from "../tickets/FromField";

export const CustomerShow = () => (
  <Show aside={<CustomerShowAside />}>
    <Box m={2} display="flex" gap={2} alignItems="center">
      <CustomerAvatar />
      <FunctionField
        label="name"
        render={(record: Customer) => `${record.firstName} ${record.lastName}`}
        variant="h5"
      />
    </Box>
    <ReferenceManyField
      label="Tickets"
      reference="tickets"
      target="customer_id"
      sort={{ field: "updated_at", order: "DESC" }}
    >
      <Datagrid bulkActionButtons={false} rowClick="show">
        <DateField label="Date" source="updated_at" />
        <SubjectField />
        <FromField />
        <StatusField />
      </Datagrid>
    </ReferenceManyField>
  </Show>
);
