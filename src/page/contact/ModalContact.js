import { Button, Modal } from "react-bootstrap";
import Tagify from "../../components/CustomSelect/Tagify";

import PhoneInput from "react-phone-input-2";
export const ModalContact = ({
  active,
  form,
  setForm,
  onClose,
  onSubmit,
  title,
  tags,
  setTags,
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
            <label htmlFor="recipient-name" className="col-form-label">
              Имя:
            </label>
            <input
              autoComplete="disabled"
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
              autoComplete="disabled"
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
            <input   autoComplete="disabled" type="tel" name="phone"  onChange={onChange} className="form-control" id="recipient-phone"/>
            {/*<PhoneInput*/}
            {/*  inputProps={{*/}
            {/*    className: "form-control",*/}
            {/*    name: "phone",*/}
            {/*  }}*/}
            {/*  country={"ru"}*/}
            {/*  value={form.phone}*/}
            {/*  onChange={(data) =>*/}
            {/*    onChange({*/}
            {/*      target: {*/}
            {/*        value: data,*/}
            {/*        name: "phone",*/}
            {/*      },*/}
            {/*    })*/}
            {/*  }*/}
            {/*/>*/}
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-phone" className="col-form-label">
              Теги:
            </label>
            <Tagify defaultValue={tags} onChange={setTags} />
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
