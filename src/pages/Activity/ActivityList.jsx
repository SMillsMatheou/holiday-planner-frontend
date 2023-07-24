import { useState, useEffect } from "react";
import { useApi } from "../../hooks";
import { Button, Input, Space, Table, Form } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export default function ActivityList() {
    const { getActivityList, joinActivity } = useApi();
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description,'
        },
        {
            title: 'From',
            dataIndex: 'from_date',
            key: 'from_date',
        },
        {
            title: 'To',
            dataIndex: 'to_date',
            key: 'to_date',
        },
        {
            title: 'View',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => {
                return <Link to={`${record.id}`}><EyeOutlined /></Link>;
            }
        }
    ];
    
    const fetchData = async () => {
        const _data = await getActivityList();

        setData(_data.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleJoin = async (values) => {
        await joinActivity(values.code);
        await fetchData();
    }

    return (
        <>
            <div>
                    <Form name="basic" onFinish={handleJoin}>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: 'Please input a room code!'}]}
                        >
                            <Space.Compact block>
                                <Input placeholder="Room Code" />
                                <Button type="primary" htmlType="submit">Join</Button>
                            </Space.Compact>
                        </Form.Item>
                    </Form>
            </div>
            <Table dataSource={data} columns={columns} />
        </>
    )
}