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
        let color , desc;
        (tags < 40)?color = 'red':color = 'green';
        (tags < 40)?desc = 'Low Stock':desc = 'Available';
      return <Tag color={color} key={tags}> {desc}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => {
        let desc;
        (record.status < 40)?desc = 'Re Order':desc = 'Edit Stock';
        return <Space> <a href="/"> {desc}</a></Space>
    }
  },
];


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

  const arr =  this.props.item
    const data = [];
for (let i = 0; i < this.props.item.length; i++) {
    let r = Math.floor(Math.random() * 150)
  data.push({
    key: i,
    name: arr[i].title,
    category: arr[i].category[1],
    quantity: r,
    value: 20 * arr[i].sellingPrice + "/-",
    status : r
  });
}


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
