import Person2Icon from "@mui/icons-material/Person2";
import { CustomerList } from "./CustomerList";
import { CustomerShow } from "./CustomerShow";

export default {
  list: CustomerList,
  show: CustomerShow,
  icon: Person2Icon,
  recordRepresentation: (record: any) =>
    `${record.firstName} ${record.lastName}`,
};
