import { useState } from "react";
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import { Alert, Calendar } from "antd";

dayjs.extend(isBetween);

export default function ActivityCalendar() {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();

    const onSelect = (newValue) => {
        if(!from) {
            setFrom(newValue);
        } else {
            if(newValue.isBefore(from)) {
                setFrom(newValue);
            } else {
                setTo(newValue);
            }
        }
    }

    const dateCellRender = (date) => {
        if(date.isSame(from) || date.isSame(to) || dayjs(date).isBetween(from, to, 'day')) {
            return <>
                <div className="h-1/2 bg-green-400 text-3xl"></div>
                <div className="h-1/2 bg-red-400 text-3xl"></div>
            </>
        }
    }

    const cellRender = (current, info) => {
        if(info.type === 'date') return dateCellRender(current);
        return info.originNode;
    }

    return <>
        <Alert message={`From: ${from?.format('DD-MM-YYYY')} To: ${to?.format('DD-MM-YYYY')}`} />
        <Calendar onSelect={onSelect} cellRender={cellRender} />
    </>

}