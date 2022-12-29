// import { makeAutoObservable } from "mobx";
// import { userAPI } from "../api";
//
// import { currentUserStore } from "./currentUserStore";
//
// export const usersStore = makeAutoObservable({
//   users: [],
//   loading: false,
//   pagination: {
//     current: 1,
//     pageSize: 10,
//     total: 0,
//   },
//   async getAll(
//     params = {
//       pagination: {
//         current: 1,
//         pageSize: 10,
//       },
//     }
//   ) {
//     this.setLoading();
//     try {
//       const data = await userAPI.all(params, localStorage.getItem("userData"));
//       this.users = data.docs;
//       this.pagination = {
//         ...params.pagination,
//         total: data.total,
//       };
//       this.setLoading();
//     } catch (e) {
//       notification.setInfo("error", e.message);
//       this.setLoading();
//       if (e.message === "Не действительный токкен") {
//         currentUserStore.logout();
//       }
//     }
//   },
//
//   setLoading() {
//     this.loading = !this.loading;
//   },
// });
