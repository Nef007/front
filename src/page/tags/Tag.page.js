import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { TableTags } from "../../components/TableTags";
import { ModalTagsEdit } from "./ModalTagsEdit";
import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { message } from "antd";
import { TableCustom } from "../../components/Table/Table";
import { ModalTagsCreate } from "./ModalTagsCreate";

export const TagPage = observer(() => {
  const { tagsStore } = useRootStore();
 // const [activeCreate, setActiveCreate] = useToggle(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    tagsStore.getAll();
  }, []);

  const onSelectAllRows = () => {
    setSelectedRowKeys(tagsStore.tags.map((item) => item.id));
  };

  const columns = [
    {
      title: "Теги",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Редактирование",
      width: 200,
      render: (record) => (
        <>
          <a
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#contactsEditModal"
          >
            <em className="fa fa-pencil"></em>
          </a>{" "}
          <a onClick={()=>tagsStore.delete(record.id)} className="btn btn-danger">
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
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Text input with segmented dropdown button"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Поиск
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="visually-hidden">
                            Toggle Dropdown
                          </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <a
                              className="dropdown-item"
                              href="src/page/tags/Tag.page#"
                            >
                              Фильтр 1
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="src/page/tags/Tag.page#"
                            >
                              Фильтр 2
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="src/page/tags/Tag.page#"
                            >
                              Фильтр 3
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col col-sm-6 text-end col-12 gy-2">
                      <button
                        onClick={onSelectAllRows}
                        type="button"
                        className="btn btn-sm btn-primary btn-create"
                      >
                        Выбрать все
                      </button>{" "}
                      <button className="btn btn-sm btn-danger disabled">
                        <em className="fa fa-trash"></em>
                      </button>{" "}
                      <button
                        onClick={()=>tagsStore.setActiveCreate()}
                        type="button"
                        className="btn btn-sm btn-primary btn-create"
                      >
                        Создать
                      </button>
                    </div>
                  </div>
                </div>

                <TableCustom
                  columns={columns}
                  data={tagsStore.tags}
                  loading={tagsStore.loading}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalTagsCreate active={tagsStore.activeCreate} onClose={()=>tagsStore.setActiveCreate()} />
    </main>
  );
});
