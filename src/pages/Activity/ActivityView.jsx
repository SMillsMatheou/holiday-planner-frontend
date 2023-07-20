import { useParams } from "react-router-dom"

export default function ActivityView() {
    const { id } = useParams();

    return (
        <div className="text-2xl">VIEW FOR {id}</div>
    )
}