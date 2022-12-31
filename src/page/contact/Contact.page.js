import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { Title } from "../../components/Title";
import { PanelHeading } from "../../layout/panel-heading";
import { ButtonSecondary } from "../../components/ButtonSecondary";
import { TableContact } from "../../components/TableContact.js";
import { TableCustom } from "../../components/Table/Table";
import { useToggle } from "react-use";
import { useEffect, useState } from "react";
import { ModalContact } from "./ModalContact";

export const ContactPage = observer(() => {
  const { contactsStore } = useRootStore();

  const [activeCreate, setActiveCreate] = useToggle(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [file, setFile] = useState();
  // const [form, setForm] = useState({
  //   firstname: "",
  //   email: "",
  //   phone: "",
  //   tags: [],
  // });

  useEffect(() => {
    contactsStore.getAll();
  }, []);

  const onSelectAllRows = () => {
    setSelectedRowKeys(contactsStore.contacts.map((item) => item.id));
  };

  const onChangeInput = (e) => {
    setFile(e.target.files[0]);
  };

  const onUploadFile = async (e) => {
    if (file) {
      await contactsStore.uploadFile(file);
    }
  };
  const onDownloadFile = async (e) => {
    e.preventDefault();
    window.location.href =
      "http://2a5d-188-162-195-211.ngrok.io/contacts/export";
  };

  // const onChangeModalCreateContact = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const columns = [
    {
      title: "Действие",
      render: (record) => (
        <>
          <a
            onClick={() => contactsStore.onEditContact(record.id)}
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#contactsEditModal"
          >
            <em className="fa fa-pencil"></em>
          </a>{" "}
          <a className="btn btn-danger">
            <em className="fa fa-trash"></em>
          </a>
        </>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Имя",
      dataIndex: "firstname",
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
                          <ButtonSecondary onClick={onUploadFile}>
                            Загрузить
                          </ButtonSecondary>
                          <input
                            onChange={(e) => onChangeInput(e)}
                            type="file"
                            className="form-control"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                          />
                          <ButtonSecondary onClick={onDownloadFile}>
                            Выгрузить
                          </ButtonSecondary>
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
                      onClick={() => contactsStore.setActiveModalCreate()}
                      type="button"
                      className="btn btn-sm btn-primary btn-create"
                    >
                      Создать
                    </button>
                  </div>
                </PanelHeading>
                <TableCustom
                  columns={columns}
                  loading={contactsStore.loading}
                  data={contactsStore.contacts}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalContact
        active={contactsStore.activeModalCreate}
        onClose={() => contactsStore.setActiveModalCreate()}
        onChange={(e) => contactsStore.setForm(e)}
        form={contactsStore.formContact}
        onOk={() => contactsStore.create()}
      />
      <ModalContact
        active={contactsStore.activeModalEdit}
        onClose={() => contactsStore.setActiveModalEdit()}
      />
    </main>
  );
});
