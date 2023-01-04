import "./assets/css/normalize.css";
//import "./assets/js/bootstrap/bootstrap.bundle.min";

import "react-phone-input-2/lib/style.css";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
import { ScrollButton } from "./components/ScrollButton";
import { Toast, ToastContainer } from "react-bootstrap";

export const App = observer(() => {
  const { notification, tagsStore, contactsStore } = useRootStore();
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
      {/*<ToastContainer position="top-end" className="p-3">*/}
      {/*  <Toast>*/}
      {/*    <Toast.Header>*/}
      {/*      <strong className="me-auto">Bootstrap</strong>*/}
      {/*    </Toast.Header>*/}
      {/*    <Toast.Body>See? Just like this.</Toast.Body>*/}
      {/*  </Toast>*/}
      {/*  <Toast>*/}
      {/*    <Toast.Header>*/}
      {/*      <strong className="me-auto">Bootstrap</strong>*/}
      {/*      <small className="text-muted">2 seconds ago</small>*/}
      {/*    </Toast.Header>*/}
      {/*    <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>*/}
      {/*  </Toast>*/}
      {/*</ToastContainer>*/}
      <Header />
      <Routes>
        <Route path="/tags" element={<TagPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/*" element={<Navigate replace to="/contacts" />} />
      </Routes>
      <ScrollButton />
    </>
  );
});
