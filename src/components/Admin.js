import { Link } from "react-router-dom"
import Users from "./Users";

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <div><br /></div>
            <Users />
            <div><br /></div>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin;