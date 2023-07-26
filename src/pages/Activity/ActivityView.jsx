import { useParams } from "react-router-dom"
import ActivityCalendar from "../../components/Calendar/ActivityCalendar";
import { Col, Row } from "antd";
import { AddDates } from "../../components";

export default function ActivityView() {
    const { id } = useParams();

    return (
        <>
            <Row>
                <AddDates />
            </Row>
            <Row>
                <Col>
                    <ActivityCalendar />
                </Col>
            </Row>
        </>
    )
}