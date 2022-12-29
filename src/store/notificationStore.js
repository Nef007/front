import { makeAutoObservable } from "mobx";

export const notification = makeAutoObservable({
  info: {},
  setInfo(status, message) {
    this.info = {
      status,
      message,
    };
  },
});
