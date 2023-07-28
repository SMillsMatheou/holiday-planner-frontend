import { useEffect, useState } from "react";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import { Alert, Calendar } from "antd";
import { useApi } from "../../hooks";
import { useParams } from "react-router-dom";

dayjs.extend(isBetween);

const getFirstAndLastDateOnPanel = (date) => {
  const firstDate = dayjs(date).startOf("month");
  const lastDate = dayjs(date).endOf("month");

  const firstDateDay = firstDate.get("day");

  return {
    firstDate: firstDate.subtract(firstDateDay, "days"),
    lastDate: lastDate.add(
      42 - Number(lastDate.format("DD")) - firstDateDay,
      "days"
    ),
  };
};

export default function ActivityCalendar() {
  // const [from, setFrom] = useState();
  // const [to, setTo] = useState();

  // const onSelect = (newValue) => {
  //     if(!from) {
  //         setFrom(newValue);
  //     } else {
  //         if(newValue.isBefore(from)) {
  //             setFrom(newValue);
  //         } else {
  //             setTo(newValue);
  //         }
  //     }
  // }

  const { id } = useParams();
  const { getActivityDates } = useApi();
  const [date, setDate] = useState(dayjs());
  const [firstDate, setFirstDate] = useState();
  const [lastDate, setLastDate] = useState();
  const [dates, setDates] = useState([]);

  const dateCellRender = (date) => {
    let availableCount = 0;
    let unavailableCount = 0;

    dates.forEach((_date) => {
      if (date.isBetween(_date.from_date, _date.to_date, "day", "[]")) {
        if (_date.type == "available") availableCount++;
        else if (_date.type === "unavailable") unavailableCount++;
      }
    });

    return (
      <>
        <div className="h-1/2 bg-green-400 text-3xl">{availableCount}</div>
        <div className="h-1/2 bg-red-400 text-3xl">{unavailableCount}</div>
      </>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const fetchData = async () => {
    const result = getFirstAndLastDateOnPanel(date);

    if (
      !result.firstDate.isSame(firstDate) &&
      !result.lastDate.isSame(lastDate)
    ) {
      const resp = await getActivityDates(id, {
        from_date: result.firstDate.format("YYYY-MM-DD"),
        to_date: result.lastDate.format("YYYY-MM-DD"),
      });

      setDates(resp);
      setFirstDate(result.firstDate);
      setLastDate(result.lastDate);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  console.log(dates);

  return (
    <>
      {/* <Alert message={`From: ${from?.format('DD-MM-YYYY')} To: ${to?.format('DD-MM-YYYY')}`} /> */}
      <Calendar value={date} onChange={setDate} cellRender={cellRender} />
    </>
  );
}
