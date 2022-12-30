import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import "./style.css";
import {useState} from "react";
import {Colors} from "../../components/Colors";

export const ModalTagsCreate = observer(({ active, onClose, onOK }) => {
  const { tagsStore } = useRootStore();
  const [colorHex, setColorHex] = useState('#FF6900' );

  const [form, setForm] = useState({color: '#FF6900', text: ''});

  const onChangeColor = (color) => {
    setForm({...form, color: color.hex });
  };


  const onSaveTage = ()=>{
    if(form.text){
      tagsStore.create(form)
      tagsStore.setActiveCreate()
    }

  }

  return (
    <div
      className={`modal fade ${active ? "show" : ""}`}
      id="tagsEditModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Создание тега
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
                <label htmlFor="recipient-tag" className="col-form-label">
                  Тег:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient-tag"
                  value={form.text}
                  onChange={(e)=> setForm({...form, text: e.target.value })}
                />
                <label htmlFor="recipient-tag" className="col-form-label">
                  Цвет:
                </label>
                <Colors
                    color={ form.color }
                    onChangeComplete={onChangeColor}
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
            <button onClick={onSaveTage} type="button" className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
