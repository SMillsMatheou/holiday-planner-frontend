import { useParams } from "react-router-dom"
import { Col, Row } from "antd";
import { AddDates, ActivityCalendar, ActivityParticipantList, ActivityDatesList } from "../../components";

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
            <Row>
                <Col span={8}>
                    <ActivityDatesList />
                </Col>
                <Col span={2}>
                    <ActivityParticipantList />
                </Col>
            </Row>
        </>
    )
}