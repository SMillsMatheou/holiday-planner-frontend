import { Form, Space, DatePicker, Select, Button } from "antd";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const { RangePicker } = DatePicker;

export default function AddDates() {
  const { id } = useParams();
  const { addActivityDates, getUsersActivityDates } = useApi();

  const [dates, setDates] = useState([]);

  const handleSubmit = async (values) => {
    let data = {
      from_date: values.dateRange[0].format("YYYY-MM-DD"),
      to_date: values.dateRange[1].format("YYYY-MM-DD"),
      type: values.type,
    };

    await addActivityDates(id, data);
  };

  const fetchData = async () => {
    const results = await getUsersActivityDates(id);

    setDates(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cellRender = (current, info) => {
    if (info.type !== "date") return info.originNode;
    const style = {};

    for (let i = 0; i < dates.length; i++) {
      if (
        current.isBetween(dates[i].from_date, dates[i].to_date, "day", "[]")
      ) {
        if (dates[i].type === "available") {
          style.border = "1px solid green";
        } else if (dates[i].type === "unavailable") {
          style.border = "1px solid red";
        }
        style.borderRadius = "50%";
        break;
      }
    }

    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
  };

  const validateNoOverlap = (_, value) => {
    if (value) {
      for (let i = 0; i < dates.length; i++) {
        if (
          value[0].isSameOrBefore(dayjs(dates[i].to_date), "day") &&
          value[1].isSameOrAfter(dayjs(dates[i].from_date), "day")
        ) {
          return Promise.reject(
            "Please enter a range that doesn't overlap with your existing dates"
          );
        }
      }
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form name="basic" onFinish={handleSubmit}>
        <Space.Compact block>
          <Form.Item
            name="dateRange"
            rules={[
              { required: true, message: "Please enter a date range" },
              { validator: validateNoOverlap },
            ]}
          >
            <RangePicker cellRender={cellRender} />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[{ required: true, message: "Please enter a type" }]}
          >
            <Select
              style={{ width: 120 }}
              options={[
                { value: "available", label: "Available" },
                { value: "unavailable", label: "Unavailble" },
              ]}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Space.Compact>
      </Form>
    </>
  );
}
