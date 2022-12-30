import "./assets/css/normalize.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/main.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRootStore } from "./store";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TagPage } from "./page/tags/Tag.page";
import { ContactPage } from "./page/contact/Contact.page";
import { message } from "antd";
import {ScrollButton} from "./components/ScrollButton";


export const App = observer(() => {
  const { notification, tagsStore } = useRootStore();
  const { info } = notification;

  useEffect(() => {
    if (info.message) {
      if (info.status === "success") message.success(info.message);
      if (info.status === "error") message.error(info.message);
      if (info.status === "info") message.info(info.message);
    }
  }, [info]);


  return (
    <>
      <Header />
      <Routes>
        <Route path="/tags" element={<TagPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/*" element={<Navigate replace to="/contacts" />} />
      </Routes>
      <ScrollButton/>
        {tagsStore.activeCreate && <div className={`modal-backdrop fade show`}></div>}
      {/*<Footer />*/}
    </>
  );
});
