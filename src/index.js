import { createRoot } from "react-dom/client";
import React from "react";
import { rootStore, RootStoreProvider } from "./store";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import ru_RU from "antd/lib/locale-provider/ru_RU";
import { App } from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <RootStoreProvider store={rootStore}>
    <BrowserRouter>
      <ConfigProvider locale={ru_RU}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </RootStoreProvider>
);
