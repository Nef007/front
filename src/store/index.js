import React, { createContext, useContext } from "react";
import { contactsStore } from "./contactsStore";
import { notification } from "./notificationStore";
import { tagsStore } from "./tagsStore";
import { authStore } from "./authStore";

export const rootStore = {
  contactsStore,
  notification,
  tagsStore,
  authStore,
};

export const RootStoreContext = createContext({ rootStore });

export const useRootStore = () => useContext(RootStoreContext);

export const RootStoreProvider = ({ store, children }) => {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};
