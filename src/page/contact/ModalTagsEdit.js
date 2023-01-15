import { Button, Modal } from "react-bootstrap";

import Tagify from "../../components/CustomSelect/Tagify";
export const ModalTagsEdit = ({
  active,
  onClose,
  form,
  onSubmit,
  title,
  setForm,
  alertText = "",
  setAlert,
}) => {
  const onChange = (e) => {
    setAlert("");
    setForm({ ...form, tags: e });
  };

  return (
    <Modal show={active} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <Tagify
              defaultValue={form.tags}
              onChange={onChange}
             // onRemove={onChange}
            />
          </div>
          <div className="mb-3">Выбрано контактов: {form.contacts.length}</div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ color: "red", float: "left", marginRight: "auto" }}>
            {alertText}
          </div>
          <Button variant="secondary" onClick={onClose}>
            Закрыть
          </Button>
          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
