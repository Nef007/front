import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";

export const ModalContact = observer(({ active, onClose, onChange, onOk }) => {
  const { contactsStore } = useRootStore();

  return (
    <div
      className={`modal fade ${active ? "show" : ""}`}
      id="contactsEditModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {contactsStore.activeModalCreate
                ? "Создание контакта"
                : "Редактирование контакта"}
            </h1>
            <button
              onClick={onClose}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Имя:
                </label>
                <input
                  onChange={onChange}
                  type="text"
                  name="firstname"
                  className="form-control"
                  id="recipient-name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-email" className="col-form-label">
                  Почта:
                </label>
                <input
                  onChange={onChange}
                  type="email"
                  name="email"
                  className="form-control"
                  id="recipient-email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-phone" className="col-form-label">
                  Телефон:
                </label>
                <input
                  onChange={onChange}
                  name="phone"
                  type="tel"
                  className="form-control"
                  id="recipient-phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-phone" className="col-form-label">
                  Теги:
                </label>
                <input
                  onChange={onChange}
                  className="tags"
                  name="tags-edit"
                  value='[{"value":"point"}, {"value":"soft"}]'
                  pattern="^[A-Za-z_✲ ]{1,15}$"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={onClose}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
            <button onClick={onOk} type="button" className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
