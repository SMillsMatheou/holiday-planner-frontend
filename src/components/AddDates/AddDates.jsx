import { Form, Space, DatePicker, Select, Button } from "antd";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks";

const { RangePicker } = DatePicker;

export default function AddDates() {
  const { id } = useParams();
  const { addActivityDates } = useApi();

  const handleSubmit = async (values) => {
    let data = {
      from_date: values.dateRange[0].format("YYYY-MM-DD"),
      to_date: values.dateRange[1].format("YYYY-MM-DD"),
      type: values.type,
    };

    await addActivityDates(id, data);
  };

  return (
    <>
      <Form name="basic" onFinish={handleSubmit}>
        <Space.Compact block>
          <Form.Item
            name="dateRange"
            rules={[{ required: true, message: "Please enter a date range" }]}
          >
            <RangePicker />
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
