import {
  Datagrid,
  List,
  ReferenceField,
  ReferenceInput,
  useStore,
} from "react-admin";

import { CustomerAvatar } from "../customers/CustomerAvatar";
import { TicketListAside } from "./TicketListAside";
import { StatusField } from "./StatusField";
import { WithLocks } from "@react-admin/ra-realtime";
import { DateField } from "./DateField";
import { SubjectField } from "./SubjectField";
import { FromField } from "./FromField";
import { ActivityField } from "./ActivityField";
import { TicketReadsWatcher } from "./TicketReadsWatcher";

export const ticketStatusFilters = {
  All: {},
  Open: { status: "open" },
  Pending: { status: "pending" },
  Closed: { status: "closed" },
} as { [key: string]: any };

const filters = [
  <ReferenceInput source="customer_id" reference="customers" alwaysOn />,
  <ReferenceInput source="product_id" reference="products" alwaysOn />,
];

export const TicketList = () => {
  const [statusFilter] = useStore(
    "resources.tickets.list.statusFilter",
    ticketStatusFilters.All
  );
  return (
    <TicketReadsWatcher>
      <WithLocks>
        <List
          sort={{ field: "updated_at", order: "DESC" }}
          perPage={25}
          filter={statusFilter}
          filters={filters}
          aside={<TicketListAside />}
        >
          <Datagrid
            rowClick="show"
            sx={{
              "& .column-lock": {
                padding: "6px 0",
                "& svg": { verticalAlign: "middle" },
              },
            }}
          >
            <ActivityField />
            <ReferenceField source="customer_id" reference="customers" label="">
              <CustomerAvatar size="small" />
            </ReferenceField>
            <ReferenceField source="customer_id" reference="customers" />
            <DateField source="updated_at" label="Date" textAlign="right" />
            <SubjectField />
            <FromField />
            <StatusField />
          </Datagrid>
        </List>
      </WithLocks>
    </TicketReadsWatcher>
  );
};
