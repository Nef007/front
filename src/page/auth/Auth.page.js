import { observer } from "mobx-react-lite";
import "./signin.css";
import { useRootStore } from "../../store";
import { useState } from "react";
export const AuthPage = observer(() => {
  const { authStore } = useRootStore();

  const [password, setPassword] = useState("");

  const onAuth = () => {
    authStore.auth(password);
  };

  return (
    <div className="box">
      <main className="form-signin text-center">
        <form>
          <h1 className="h3 mb-3 fw-normal">Авторизация</h1>

          <div className="form-floating">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Пароль</label>
          </div>
          <button
            onClick={onAuth}
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Войти
          </button>
        </form>
      </main>
    </div>
  );
});
