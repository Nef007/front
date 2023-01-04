import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { useEffect, useState } from "react";
import { TableCustom } from "../../components/Table/Table";
import { ModalTags } from "./ModalTags";
import { useToggle } from "react-use";

export const TagPage = observer(() => {
  const { tagsStore } = useRootStore();
  // const [activeCreate, setActiveCreate] = useToggle(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [activeModalEdit, setActiveModalEdit] = useToggle(false);
  const [activeModalCreate, setActiveModalCreate] = useToggle(false);
  const [form, setForm] = useState({
    text: "",
    color: "#454545",
  });

  const [valueSearch, setValueSearch] = useState("");

  const onEdit = (record) => {
    setForm(record);
    setActiveModalEdit();
  };
  const onCreate = () => {
    setForm({
      firstname: "",
      email: "",
      phone: "",
      tags: [],
    });
    setActiveModalCreate();
  };

  const onSaveTage = (e) => {
    e.preventDefault();
    if (form.text) {
      tagsStore.save(form);
      setActiveModalCreate(false);
      setActiveModalEdit(false);
    }
  };

  useEffect(() => {
    tagsStore.getAll();
  }, []);

  const onSelectAllRows = () => {
    setSelectedRowKeys(tagsStore.tags.map((item) => item.id));
  };

  const onSearch = (e) => {
    e.preventDefault();
    tagsStore.onSearch(valueSearch);
  };

  const onDeleteContact = () => {
    tagsStore.delete(selectedRowKeys);
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "Теги",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Цвет",
      dataIndex: "color",
      key: "color",
      render: (text) => (
        <div
          style={{
            width: 60,
            height: 30,
            backgroundColor: text,
            borderRadius: "0.5rem",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Редактирование",
      width: 200,
      render: (record) => (
        <>
          <a
            onClick={() => onEdit(record)}
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#contactsEditModal"
          >
            <em className="fa fa-pencil"></em>
          </a>{" "}
          <a
            onClick={() => tagsStore.delete([record.id])}
            className="btn btn-danger"
          >
            <em className="fa fa-trash"></em>
          </a>
        </>
      ),
    },
  ];

  return (
    <main className="main-content">
      <div className="container">
        <div className="page-content page-content_contacts">
          <h2 className="page-title page-title_contacts">Теги</h2>
          <div className="contacts-table-container">
            <div className="col-md-12">
              <div className="panel panel-default panel-table">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col col-sm-6 col-12 text-sm-center gy-2">
                      <form>
                        <div className="input-group input-group-sm">
                          <input
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                            type="text"
                            className="form-control"
                            aria-label="Text input with segmented dropdown button"
                          />
                          <button
                            onClick={onSearch}
                            type="submit"
                            className="btn btn-outline-secondary"
                          >
                            Поиск
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col col-sm-6 text-end col-12 gy-2">
                      <button
                        onClick={onSelectAllRows}
                        type="button"
                        className="btn btn-sm btn-primary btn-create"
                      >
                        Выбрать все
                      </button>{" "}
                      <button
                        onClick={onDeleteContact}
                        className={`btn btn-sm btn-danger ${
                          selectedRowKeys.length ? "" : "disabled"
                        } `}
                      >
                        <em className="fa fa-trash"></em>
                      </button>{" "}
                      <button
                        onClick={onCreate}
                        type="button"
                        className="btn btn-sm btn-primary btn-create"
                        data-bs-toggle="modal"
                        data-bs-target="#tagsEditModal"
                      >
                        Создать
                      </button>
                    </div>
                  </div>
                </div>

                <TableCustom
                  columns={columns}
                  data={tagsStore.filtered}
                  loading={tagsStore.loading}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalTags
        active={activeModalCreate}
        onClose={setActiveModalCreate}
        form={form}
        setForm={setForm}
        onSubmit={onSaveTage}
        title="Создание тега"
      />
      <ModalTags
        active={activeModalEdit}
        onClose={setActiveModalEdit}
        form={form}
        setForm={setForm}
        onSubmit={onSaveTage}
        title="Редактирование тега"
      />
    </main>
  );
});
