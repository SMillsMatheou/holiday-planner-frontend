import { useParams } from "react-router";
import { useApi } from "../../hooks";
import { useEffect, useState } from "react";
import { Collapse, List, Typography } from "antd";

export default function ActivityParticipantList() {
  const { id } = useParams();
  const { getActivityParticipants } = useApi();
  const [participants, setParticipants] = useState([]);

  const fetchData = async () => {
    const results = await getActivityParticipants(id);
    console.log(results);
    setParticipants(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Collapse
        items={[
          {
            key: "1",
            label: "Participants",
            children: (
              <List
                dataSource={participants}
                renderItem={(item) => {
                  console.log(item);
                  return (
                    <List.Item>
                      <Typography.Text>{item}</Typography.Text>
                    </List.Item>
                  );
                }}
              />
            ),
          },
        ]}
      />
    </>
  );
}
