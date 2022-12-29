import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { Title } from "../../components/Title";
import { PanelHeading } from "../../layout/panel-heading";
import { ButtonSecondary } from "../../components/ButtonSecondary";
import { TableContact } from "../../components/TableContact.js";
import { TableCustom } from "../../components/Table/Table";
import { useToggle } from "react-use";
import { useEffect, useState } from "react";

export const ContactPage = observer(() => {
  const { contactsStore } = useRootStore();

  const [activeCreate, setActiveCreate] = useToggle(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    contactsStore.getAll();
  }, []);

  const onSelectAllRows = () => {
    setSelectedRowKeys(contactsStore.contacts.map((item) => item.id));
  };

  const columns = [
    {
      title: "Действие",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Имя",
      dataIndex: "name",
    },
    {
      title: "Почта",
      dataIndex: "email",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
    },
    {
      title: "Теги",
      render: (record) => {
        return record.tags.map((item) => {
          return <span>{item.text}</span>;
        });
      },
    },
  ];
  return (
    <main className="main-content">
      <div className="container">
        <div className="page-content page-content_contacts">
          <Title name="База контактов" />
          <div className="contacts-table-container">
            <div className="col-md-12">
              <div className="panel panel-default panel-table">
                <PanelHeading>
                  <div className="col col-sm-6 col-12 text-sm-center gy-2">
                    <form action="src/page/contact/Contact.page#">
                      <div className="mb-3">
                        <div className="input-group input-group-sm">
                          <ButtonSecondary onClick={() => console.log("11111")}>
                            Загрузить
                          </ButtonSecondary>
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                          />
                          <ButtonSecondary>Выгрузить</ButtonSecondary>
                        </div>
                      </div>

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
                              href="src/page/contact/Contact.page#"
                            >
                              Фильтр 1
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="src/page/contact/Contact.page#"
                            >
                              Фильтр 2
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="src/page/contact/Contact.page#"
                            >
                              Фильтр 3
                            </a>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                  <div className="col col-sm-6 text-end col-12 gy-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary btn-create"
                    >
                      Выбрать все
                    </button>{" "}
                    <button
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#multipleTagsEditModal"
                    >
                      <em className="fa fa-pencil"></em>
                    </button>{" "}
                    <button className="btn btn-sm btn-danger disabled">
                      <em className="fa fa-trash"></em>
                    </button>{" "}
                    <button
                      type="button"
                      className="btn btn-sm btn-primary btn-create"
                    >
                      Создать
                    </button>
                  </div>
                </PanelHeading>

                <TableCustom
                  columns={columns}
                  contacts={contactsStore.contacts}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});
