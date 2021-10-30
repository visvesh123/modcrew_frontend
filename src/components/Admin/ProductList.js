import React from "react";
import { Table, Button, Tag, Space } from "antd";

const columns = [
  {
    title: "Item Name",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Stock Value",
    dataIndex: "value",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (tags) => {
        let color;
        (tags < 20)?color = 'red':color = 'green'
      return <Tag color={"red"} key={tags}> Best Selling</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
       
      <a href = "/">Invite </a>
      </Space>
    ),
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    category: 32,
    quantity: `London, Park Lane no. ${i}`,
    value: "Val",
  });
}

class ProductList extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          {/* <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button> */}
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default ProductList;
