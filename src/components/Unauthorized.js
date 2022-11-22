import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1); // Back to previous page

    return (
        <section>
            <h1>Unauthorized</h1>
            <div><br /></div>
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized;