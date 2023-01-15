import "./assets/css/normalize.css";
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
import { AuthPage } from "./page/auth/Auth.page";
import { Loader } from "./components/Loader/Loader";

export const App = observer(() => {
  const { notification, authStore } = useRootStore();
  const { info } = notification;

  useEffect(() => {
    authStore.initializedApp();
  }, []);

  useEffect(() => {
    if (info.message) {
      if (info.status === "success") message.success(info.message);
      if (info.status === "error") message.error(info.message);
      if (info.status === "info") message.info(info.message);
    }
  }, [info]);

  if (!authStore.initialized) {
    return <Loader />;
  }

  return authStore.isAuth ? (
    <>
      <Header />
      <Routes>
        <Route path="/tags" element={<TagPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/*" element={<Navigate replace to="/contacts" />} />
      </Routes>
      <Footer />
      <ScrollButton />
    </>
  ) : (
    <AuthPage />
  );
});
