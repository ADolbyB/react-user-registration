import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout();
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Home</h1>
            <div><br /></div>
            <p>You are logged in!</p>
            <div><br /></div>
            <Link to="/editor">Go to the Editor page</Link>
            <div><br /></div>
            <Link to="/admin">Go to the Admin page</Link>
            <div><br /></div>
            <Link to="/lounge">Go to the Lounge</Link>
            <div><br /></div>
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home;