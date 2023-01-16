import { DataProvider } from "react-admin";
import { faker } from "@faker-js/faker/locale/en";

export const simulateRealtime = async (dataProvider: DataProvider) => {
  await wait(3);
  dataProvider.publish("connectedUsers", {
    type: "connected",
    payload: { agentId: 1 },
  });
  await wait(3);
  simulateActivity(dataProvider);
  await wait(15);
  simulateActivity(dataProvider);
  await wait(15);
  dataProvider.publish("connectedUsers", {
    type: "disconnected",
    payload: { agentId: 1 },
  });
};

// add a read then a lock then unlock
const simulateActivity = async (dataProvider: DataProvider) => {
  const { data: agents } = await dataProvider.getList("agents", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: { isUser: false },
  });

  const agent = faker.helpers.arrayElement(agents);
  const { data: openTickets } = await dataProvider.getList("tickets", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "id", order: "ASC" },
    filter: { status_neq: "closed" },
  });

  const ticket = faker.helpers.arrayElement(openTickets);
  // put a new read
  const { data: ticketRead } = await dataProvider.create("ticketReads", {
    data: {
      ticketId: ticket.id,
      userId: agent.id,
      data: new Date(),
    },
  });
  await dataProvider.publish("resource/ticketReads", {
    topic: `resource/ticketReads`,
    type: "created",
    payload: { ids: [ticketRead.id] },
    date: Date.now(),
  });

  // wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    // put a lock
    const { lock } = await dataProvider.lock("tickets", {
      resource: "tickets",
      id: ticket.id,
      identity: agent.id,
    });

    // wait 7 seconds
    await new Promise((resolve) => setTimeout(resolve, 7000));

    // remove the lock
    await dataProvider.unlock("tickets", {
      resource: "tickets",
      id: ticket.id,
      identity: agent.id,
    });
  } catch (e) {
    // content was locked by another user
    // wait 7 seconds
    await new Promise((resolve) => setTimeout(resolve, 7000));
  }

  // wait 3 second
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // remove the read
  await dataProvider.delete("ticketReads", {
    id: ticketRead.id,
    previousData: ticketRead,
  });
  await dataProvider.publish("resource/ticketReads", {
    topic: `resource/ticketReads`,
    type: "deleted",
    payload: { ids: [ticketRead.id] },
    date: Date.now(),
  });
};

const wait = async (s: number) => {
  await new Promise((resolve) => setTimeout(resolve, s * 1000));
};
