import { Table } from "antd";
import "./style.css";

export const TableCustom = ({
  data,
  columns,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
  pagination,
  onTableChange,
}) => {
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      onChange={onTableChange}
      pagination={pagination}
      scroll={{ x: 990 }}
      loading={loading}
      bordered
      rowSelection={rowSelection}
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.id}
    />
  );
};
