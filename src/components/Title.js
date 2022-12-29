import { observer } from "mobx-react-lite";

import { useRootStore } from "../store";
export const Title = ({ name }) => {
  const { taskStore, notification } = useRootStore();

  return <h2 className="page-title page-title_contacts">{name}</h2>;
};
