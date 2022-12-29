import { Table } from "antd";
import { useState } from "react";
import { TableCustom } from "./Table/Table";

export const TableContact = ({ contacts }) => {
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

  return <TableCustom data={contacts} columns={columns} />;
};
