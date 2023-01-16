import { dataProvider } from "./dataProvider/dataProvider";

export const authProvider = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
  getIdentity: async () => {
    const agents = await dataProvider.getList("agents", {
      pagination: { page: 1, perPage: 1 },
      sort: { field: "id", order: "ASC" },
      filter: { isUser: true },
    });
    return {
      id: agents.data[0].id,
      fullName: agents.data[0].firstName + " " + agents.data[0].lastName,
      avatar: agents.data[0].avatar,
      email: agents.data[0].email,
    };
  },
};
