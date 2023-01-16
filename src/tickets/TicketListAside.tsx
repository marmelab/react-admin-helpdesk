import { Count, useStore } from "react-admin";
import { Box, MenuList, MenuItem, ListItemText } from "@mui/material";
import isEqual from "lodash/isEqual";

import { ticketStatusFilters } from "./TicketList";

export const TicketListAside = () => {
  const [statusFilter, setStatusFilter] = useStore<any>(
    "resources.tickets.list.statusFilter",
    ticketStatusFilters.All
  );
  return (
    <Box width={200} mr={1} mt={7} flexShrink={0} order={-1}>
      <MenuList>
        {Object.keys(ticketStatusFilters).map((key) => (
          <MenuItem
            key={key}
            onClick={() => setStatusFilter(ticketStatusFilters[key])}
            selected={isEqual(statusFilter, ticketStatusFilters[key])}
          >
            <ListItemText>{key}</ListItemText>
            <Count filter={ticketStatusFilters[key]} color="text.disabled" />
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};
