import { Button, Modal } from "react-bootstrap";

export const ModalTags = ({
  active,
  onClose,
  form,
  onSubmit,
  title,
  setForm,
}) => {
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Modal show={active} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="recipient-tag" className="col-form-label">
              Тег:
            </label>
            <input
              autoComplete="disabled"
              required
              name="text"
              type="text"
              className="form-control required"
              id="recipient-tag"
              value={form.text}
              onChange={onChange}
            />
            <label htmlFor="recipient-tag" className="col-form-label">
              Цвет:
            </label>
            {/*<Colors color={form.color} onChangeComplete={onChangeColor} />*/}
            <input
              onChange={onChange}
              type="color"
              name="color"
              className="form-control form-control-color"
              id="exampleColorInput"
              value={form.color}
              title="Выберите цыет"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
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
