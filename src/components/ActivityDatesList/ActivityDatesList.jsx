import { useParams } from "react-router";
import { useApi } from "../../hooks";
import { useEffect, useState } from "react";
import { Button, Collapse, List, Popconfirm, Table, Typography } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";

export default function ActivityDatesList() {
  const { id } = useParams();
  const { getUsersActivityDates, deleteDate } = useApi();
  const [dates, setDates] = useState([]);

  const fetchData = async () => {
    const results = await getUsersActivityDates(id);

    setDates(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (dateId) => {
    console.log(dateId);
    await deleteDate(dateId);

    fetchData();
  };

  const types = {
    available: "Available",
    unavailable: "Unavailable",
  };

  return (
    <>
      <Collapse
        items={[
          {
            key: "1",
            label: "My Dates",
            children: (
              <Table
                dataSource={dates}
                columns={[
                  {
                    dataIndex: "type",
                    key: "type",
                    title: "",
                    flex: 1,
                    render: (_, record) => (
                      <Typography.Text>{types[record.type]}</Typography.Text>
                    ),
                  },
                  {
                    dataIndex: "date",
                    key: "date",
                    title: "",
                    render: (_, record) => (
                      <Typography.Text>
                        {dayjs(record.from_date).format("DD-MM-YYYY")} to{" "}
                        {dayjs(record.to_date).format("DD-MM-YYYY")}
                      </Typography.Text>
                    ),
                  },
                  {
                    dataIndex: "delete",
                    key: "delete",
                    title: "",
                    render: (_, record) => (
                      <Popconfirm
                        title="Delete dates"
                        description="Are you sure you want to delete these dates?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="link">
                          <DeleteOutlined />
                        </Button>
                      </Popconfirm>
                    ),
                  },
                ]}
                showHeader={false}
                pagination={false}
                rowKey={(record) => record.id}
              />
            ),
          },
        ]}
      />
      {/* <Collapse items={[{
                key: '1',
                label: 'My Dates',
                children: <List
                    dataSource={dates}
                    renderItem={(item) => {
                        return <List.Item>
                            <Typography.Text>
                                {dayjs(item.from_date).format('DD-MM-YYYY')} to {dayjs(item.to_date).format('DD-MM-YYYY')}
                            </Typography.Text>
                            <Button type="link" onClick={handleDelete}>
                                <DeleteOutlined />
                            </Button>
                        </List.Item>
                    }}
                />
            }]} /> */}
    </>
  );
}
