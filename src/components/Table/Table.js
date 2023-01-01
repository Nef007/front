import { Table } from "antd";
import "./style.css";

export const TableCustom = ({
  data,
  columns,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      loading={loading}
      bordered
      rowSelection={rowSelection}
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.id}
    />
  );
};
