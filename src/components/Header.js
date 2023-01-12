import { observer } from "mobx-react-lite";

import { useState } from "react";
import { useRootStore } from "../store";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../api";
export const Header = observer(() => {
  const { taskStore, notification } = useRootStore();

  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="logo">
          <a href="http://ruzalgc8.beget.tech/" className="logo__img">
            Contacts base
          </a>
        </h1>
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <span className="menu-button"></span>
        </label>
        <nav className="main-nav">
          <ul>
            <li>
              <NavLink
                to="contacts"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Контакты
              </NavLink>
            </li>
            <li>
              <NavLink
                to="tags"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Теги
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});
