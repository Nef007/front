import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { SelectCustom } from "../../components/CustomSelect/SelectCustom";
import { useEffect, useState } from "react";

export const ModalContact = observer(({ active, onClose }) => {
  const { contactsStore, tagsStore } = useRootStore();
  console.log(contactsStore.contactActive);
  const [form, setForm] = useState(contactsStore.contactActive);

  useEffect(() => {
    setForm(contactsStore.contactActive);
  }, [contactsStore.contactActive]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeSelect = (data) => {
    let tags = data.map((item) => ({ id: item.value, text: item.label }));
    setForm({
      ...form,
      tags,
    });
  };

  const onSave = async () => {
    await contactsStore.saveContact(form);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`modal modal-backdrop fade ${active ? "show" : ""}  `}
        id="contactsEditModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div onClick={(e) => e.stopPropagation()} className="modal-dialog">
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
                    value={form.firstname}
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
                    value={form.email}
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
                    value={form.phone}
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
                  <SelectCustom
                    defaultValue={form.tags.map((item) => ({
                      value: item.id,
                      label: item.text,
                    }))}
                    onChange={onChangeSelect}
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
              <button
                onClick={onSave}
                type="button"
                className="btn btn-primary"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
