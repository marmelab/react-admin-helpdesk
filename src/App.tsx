import { Admin, Resource, RefreshIconButton } from "react-admin";
import { ContainerLayout } from "@react-admin/ra-navigation";
import { ReactQueryDevtools } from "react-query/devtools";
import { Search } from "@react-admin/ra-search";
import { Box } from "@mui/material";
import KitchenIcon from "@mui/icons-material/Kitchen";

import tickets from "./tickets";
import customers from "./customers";
import products from "./products";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { ConnectionWatcher } from "./ConnectionWatcher";

const MyLayout = (props: any) => (
  <>
    <ContainerLayout
      {...props}
      maxWidth="xl"
      toolbar={
        <Box display="flex" gap={1} mr={1}>
          <Search />
          <RefreshIconButton />
        </Box>
      }
    />
    <ReactQueryDevtools initialIsOpen={false} />
    <ConnectionWatcher />
  </>
);

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    title={
      <Box display="flex" gap={1} alignItems="center">
        <KitchenIcon /> Acme Refrigerator HelpDesk
      </Box>
    }
    layout={MyLayout}
  >
    <Resource name="tickets" {...tickets} />
    <Resource name="customers" {...customers} />
    <Resource name="products" {...products} />
    <Resource
      name="agents"
      recordRepresentation={(record) =>
        `${record.firstName} ${record.lastName}`
      }
    />
  </Admin>
);

export default App;
