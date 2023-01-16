import {
  Datagrid,
  List,
  ReferenceManyCount,
  SearchInput,
  TextField,
} from "react-admin";

export const ProductList = () => (
  <List filters={[<SearchInput source="q" alwaysOn />]}>
    <Datagrid rowClick="show">
      <TextField source="model" />
      <ReferenceManyCount
        label="Customers"
        reference="customers"
        target="product_id"
      />
      <ReferenceManyCount
        label="Tickets"
        reference="tickets"
        target="product_id"
      />
    </Datagrid>
  </List>
);
