import {
  useRecordContext,
  SimpleShowLayout,
  EmailField,
  ReferenceField,
  DateField,
} from "react-admin";
import { Box } from "@mui/material";

export const CustomerShowAside = () => {
  const record = useRecordContext();
  if (!record) return <Box minWidth={200} flexShrink={0} />;
  return (
    <SimpleShowLayout sx={{ minWidth: 200, flexShrink: 0 }}>
      <EmailField source="email" />
      <ReferenceField source="product_id" reference="products" link="show" />
      <DateField source="updated_at" showTime />
    </SimpleShowLayout>
  );
};
