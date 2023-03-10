import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { Title } from "../../components/Title";
import { PanelHeading } from "../../layout/panel-heading";

import { TableCustom } from "../../components/Table/Table";
import { useEffect,  useState } from "react";
import { ModalContact } from "./ModalContact";

import { useToggle } from "react-use";
import Tagify from "../../components/CustomSelect/Tagify";
import { Button } from "react-bootstrap";
import { ModalTagsEdit } from "./ModalTagsEdit";
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
    contactsStore.setPagination(pagination)
    await contactsStore.get();
    setSelectedRowKeys([])
    setTagsForm({
      contacts: [],
      tags: [],
    })
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
    await contactsStore.downloadExport();
  };

  const onSaveContact = async (e) => {
    e.preventDefault();
    await contactsStore.saveContact({ ...form, tags });
    setActiveModalCreate(false);
    setActiveModalEdit(false);
  };
  const onSaveContactEdit = async (e) => {
    e.preventDefault();
    contactsStore.saveContactFormModal({ ...form, tags });
    setActiveModalCreate(false);
    setActiveModalEdit(false);
  };
  const onSaveTags = async (e) => {
    e.preventDefault();
    if (!tagsForm.contacts.length) {
      return setAlert("???????????????? ????????????????");
    }
    if (!tagsForm.tags.length) {
      return setAlert("?????????????? ????????");
    }


    try {
      for (let item of contactsStore.contacts) {
        if (tagsForm.contacts.includes(item.id)) {
          await contactsStore.saveContactFormModalMass({
            ...item,
            tags: [...item.tags, ...tagsForm.tags],
          });
        }
      }

    } catch (e) {
      notification.setInfo("error", e.message);
    }

    setActiveTagsEdit();
  };

  const onSearch = async (e) => {
    e.preventDefault();
   await contactsStore.onSearch(valueSearch);

  };
  const onDeleteContact = () => {
    contactsStore.deleteArray(selectedRowKeys);
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "????????????????",
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
    //  sorter: (a, b) => a.id - b.id,
    },
    {
      title: "??????",
      dataIndex: "firstname",
    //  sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: "??????????",
      dataIndex: "email",
    },
    {
      title: "??????????????",
      dataIndex: "phone",
      // render: (text) =>
      //   text &&
        // new phoneNumberFormatter(text).format({
        //   type: "international",
        //   separator: " ",
        // }).string,
    },
    {
      title: "????????",
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
              id={record.id}
              onChange={(value) =>{
                if(contactsStore.activeTogifi===record.id)
                  contactsStore.saveContactForm({ ...record, tags: value })
              }


              }
               onRemove={(value) =>
                contactsStore.saveContactForm({ ...record, tags: value })
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
          <Title name="???????? ??????????????????" />
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
                            ??????????????????
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
                            ??????????????????
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
                          ??????????
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
                      ?????????????? ??????
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
                      ??????????????
                    </button>
                  </div>
                </PanelHeading>
                <TableCustom
                  onTableChange={onTableChange}
                  pagination={contactsStore.pagination}
                  columns={columns}
                  loading={contactsStore.loading}
                  data={contactsStore.contacts}
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
        title="???????????????? ????????????????"
      />
      <ModalContact
        active={activeModalEdit}
        onClose={setActiveModalEdit}
        form={form}
        setForm={setForm}
        tags={tags}
        setTags={setTags}
        onSubmit={onSaveContactEdit}
        title="???????????????????????????? ????????????????"
      />
      <ModalTagsEdit
        active={activeTagsEdit}
        onClose={setActiveTagsEdit}
        form={tagsForm}
        setForm={setTagsForm}
        onSubmit={onSaveTags}
        title="???????????????? ???????????????????? ??????????"
        alertText={alert}
        setAlert={setAlert}
      />
    </main>
  );
});
