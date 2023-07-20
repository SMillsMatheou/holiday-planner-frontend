import { useState, useEffect } from "react";
import { useApi } from "../../hooks";
import { Table } from "antd";

export default function ActivityList() {
    const { getActivityList } = useApi();
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
    ];
    

    useEffect(() => {
        const fetchData = async () => {
            const _data = await getActivityList();
            console.log(_data);
    
            setData(_data.data);
        }
        fetchData();
    }, [])

    return (
        <Table dataSource={data} columns={columns} />
    )
}