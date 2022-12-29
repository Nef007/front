import { Table } from "antd";
import { useState } from "react";
import { TableCustom } from "./Table/Table";

export const TableTags = ({ tags, loading }) => {
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
          <a className="btn btn-danger">
            <em className="fa fa-trash"></em>
          </a>
        </>
      ),
    },
  ];
  return <TableCustom data={tags} columns={columns} loading={loading} />;
};
