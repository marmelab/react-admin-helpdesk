import { withLifecycleCallbacks } from "react-admin";
import fakeRestProvider from "ra-data-fakerest";
import { addSearchMethod } from "@react-admin/ra-search";
import {
  addRealTimeMethodsInLocalBrowser,
  addLocksMethodsBasedOnALockResource,
} from "@react-admin/ra-realtime";
import dataGenerator from "data-generator-helpdesk";

import { simulateRealtime } from "./simulateRealtime";

const baseDataProvider = fakeRestProvider(dataGenerator(), true);

const dataProviderWithSearch = addSearchMethod(baseDataProvider, {
  tickets: {
    label: "subject",
    redirect: "show",
  },
  customers: {
    label: (record: any) => `${record.firstName} ${record.lastName}`,
    redirect: "show",
  },
  products: { label: "model", redirect: "show" },
});

const dataProviderWithRealtime = addLocksMethodsBasedOnALockResource(
  addRealTimeMethodsInLocalBrowser(dataProviderWithSearch),
  "locks",
  true
);

export const dataProvider = withLifecycleCallbacks(dataProviderWithRealtime, [
  {
    resource: "tickets",
    afterSave: async (ticket, dataProvider) => {
      // update the related customer
      await dataProvider.update("customers", {
        id: ticket.customer_id,
        data: { updated_at: ticket.updated_at },
        previousData: {},
      });
      return ticket;
    },
    beforeDelete: async (params, dataProvider) => {
      // delete the related messages
      const messages = await dataProvider.getList("messages", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
        filter: { ticket_id: params.id },
      });
      await dataProvider.deleteMany("messages", {
        ids: messages.data.map((m) => m.id),
      });

      return params;
    },
    beforeDeleteMany: async (params, dataProvider) => {
      // delete the related messages
      const messages = await dataProvider.getList("messages", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
        filter: { ticket_id: params.ids },
      });
      await dataProvider.deleteMany("messages", {
        ids: messages.data.map((m) => m.id),
      });

      return params;
    },
  },
]);

simulateRealtime(dataProvider);
