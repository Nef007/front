import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { Title } from "../../components/Title";
import { PanelHeading } from "../../layout/panel-heading";

import { TableCustom } from "../../components/Table/Table";
import { useEffect, useRef, useState } from "react";
import { ModalContact } from "./ModalContact";
import { SelectCustom } from "../../components/CustomSelect/SelectCustom";
import { useToggle } from "react-use";
import Tagify from "../../components/CustomSelect/Tagify";
import { Button } from "react-bootstrap";
import { ModalTagsEdit } from "./ModalTagsEdit";
import { BASE_URL, contactAPI } from "../../api";
import download from "downloadjs";
import { notification } from "../../store/notificationStore";
const phoneNumberFormatter = require("phone-number-formats");

export const ContactPage = observer(() => {
  const { contactsStore, tagsStore } = useRootStore();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [file, setFile] = useState();
  const [activeTagsEdit, setActiveTagsEdit] = useToggle(false);
  const [activeModalEdit, setActiveModalEdit] = useToggle(false);
  const [activeModalCreate, setActiveModalCreate] = useToggle(false);

  const [tagsForm, setTagsForm] = useState({
    contacts: [],
    tags: [],
  });
  const [alert, setAlert] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
    tags: [],
  });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    tagsStore.get().then(() => contactsStore.get());
  }, []);
  useEffect(() => {}, [contactsStore.idLoadingSelect]);

  const onTableChange = async (pagination, filters, sorter) => {
    // console.log(555555, pagination);
    await contactsStore.get(pagination);
  };

  const onSelectAllRows = () => {
    let arrId = contactsStore.contacts.map((item) => item.id);
    setTagsForm({ ...tagsForm, contacts: arrId });
    setSelectedRowKeys(arrId);
  };

  const onEdit = (record) => {
    setForm(record);
    setTags(record.tags);
    setActiveModalEdit();
  };
  const onCreate = () => {
    setForm({
      firstname: "",
      email: "",
      phone: "",
    });
    setTags([]);
    setActiveModalCreate();
  };

  const setRowKey = (data) => {
    setTagsForm({ ...tagsForm, contacts: data });
    setSelectedRowKeys(data);
  };

  const onChangeInput = (e) => {
    setFile(e.target.files[0]);
  };

  const onUploadFile = async (e) => {
    e.preventDefault();
    if (file) {
      await contactsStore.uploadFile(file);
    }
  };
  const onDownloadFile = async (e) => {
    // e.preventDefault();
    await contactsStore.downloadExport();
    //  console.log("44444", data.data);

    //  window.location.href = `${BASE_URL}/contacts/export`;
  };

  const onSaveContact = async (e) => {
    e.preventDefault();
    await contactsStore.saveContact({ ...form, tags });
    setActiveModalCreate(false);
    setActiveModalEdit(false);
  };
  const onSaveTags = async (e) => {
    e.preventDefault();
    if (!tagsForm.contacts.length) {
      return setAlert("Выберите контакты");
    }
    if (!tagsForm.tags.length) {
      return setAlert("Введите теги");
    }
    //  console.log({ ...tagsForm });

    try {
      for (let item of contactsStore.filtered) {
        if (tagsForm.contacts.includes(item.id)) {
          await contactsStore.saveContact({
            ...item,
            tags: [...item.tags, ...tagsForm.tags],
          });
        }
      }

      window.location.reload();
    } catch (e) {
      notification.setInfo("error", e.message);
    }
    // await contactsStore.addManyTags({ ...tagsForm });
    setActiveTagsEdit();
  };

  const onSearch = (e) => {
    e.preventDefault();
    contactsStore.onSearch(valueSearch);
  };
  const onDeleteContact = () => {
    contactsStore.deleteArray(selectedRowKeys);
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "Действие",
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
            onClick={() => contactsStore.delete(record.id)}
            className="btn btn-danger"
          >
            <em className="fa fa-trash"></em>
          </a>
        </>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Имя",
      dataIndex: "firstname",
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: "Почта",
      dataIndex: "email",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      render: (text) =>
        text &&
        new phoneNumberFormatter(text).format({
          type: "international",
          separator: " ",
        }).string,
    },
    {
      title: "Теги",
      // filters: tagsStore.tags.map((item) => ({
      //   text: item.text,
      //   value: item.text,
      // })),
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value, record) =>
      //   record.tags.some((item) => item.text.includes(value)),
      render: (record) => {
        return (
          record && (
            <Tagify
              defaultValue={record.tags}
              // loading={contactsStore.idLoadingSelect === record.id}
              onAdd={(value) =>
                contactsStore.saveContact({ ...record, tags: value })
              }
              onRemove={(value) =>
                contactsStore.saveContact({ ...record, tags: value })
              }
            />
          )
        );
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
                    <form>
                      <div className="mb-3">
                        <div className="input-group input-group-sm">
                          <Button
                            variant="btn btn-outline-secondary"
                            onClick={onUploadFile}
                            type="submit"
                          >
                            Загрузить
                          </Button>
                          <input
                            required
                            onChange={(e) => onChangeInput(e)}
                            type="file"
                            className="form-control"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                          />
                          <Button
                            variant="btn btn-outline-secondary"
                            onClick={onDownloadFile}
                          >
                            Выгрузить
                          </Button>
                          {/*</form>*/}
                        </div>
                      </div>
                    </form>
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
                      onClick={setActiveTagsEdit}
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#multipleTagsEditModal"
                    >
                      <em className="fa fa-pencil"></em>
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
                    >
                      Создать
                    </button>
                  </div>
                </PanelHeading>
                <TableCustom
                  onTableChange={onTableChange}
                  pagination={contactsStore.pagination}
                  columns={columns}
                  loading={contactsStore.loading}
                  data={contactsStore.filtered}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setRowKey}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalContact
        active={activeModalCreate}
        onClose={setActiveModalCreate}
        form={form}
        setForm={setForm}
        tags={tags}
        setTags={setTags}
        onSubmit={onSaveContact}
        title="Создание контакта"
      />
      <ModalContact
        active={activeModalEdit}
        onClose={setActiveModalEdit}
        form={form}
        setForm={setForm}
        tags={tags}
        setTags={setTags}
        onSubmit={onSaveContact}
        title="Редактирование контакта"
      />
      <ModalTagsEdit
        active={activeTagsEdit}
        onClose={setActiveTagsEdit}
        form={tagsForm}
        setForm={setTagsForm}
        onSubmit={onSaveTags}
        title="Массовое добавление тегов"
        alertText={alert}
        setAlert={setAlert}
      />
    </main>
  );
});
