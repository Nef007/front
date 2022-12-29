import { observer } from "mobx-react-lite";

import { useState } from "react";
import { useRootStore } from "../store";
export const Footer = observer(() => {
  const { taskStore, notification } = useRootStore();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="row">
          <div className="col col-12 d-flex justify-content-end">
            <p className="footer__copyright">
              Разработчик{" "}
              <a href="https://nikita.global/" target="_blank">
                nikita.global
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
