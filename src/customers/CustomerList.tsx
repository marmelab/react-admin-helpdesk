import {
  Datagrid,
  DateField,
  EmailField,
  List,
  ReferenceField,
  ReferenceManyCount,
  SearchInput,
  TextField,
} from "react-admin";
import { CustomerAvatar } from "./CustomerAvatar";

export const CustomerList = () => (
  <List
    sort={{ field: "lastName", order: "ASC" }}
    filters={[<SearchInput source="q" alwaysOn />]}
    perPage={25}
  >
    <Datagrid rowClick="show">
      <CustomerAvatar size="small" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <ReferenceField source="product_id" reference="products" link="show" />
      <ReferenceManyCount
        label="Tickets"
        reference="tickets"
        target="customer_id"
      />
      <DateField label="Latest message" source="updated_at" showTime />
      <TextField source="phone" />
      <TextField source="city" />
    </Datagrid>
  </List>
);
