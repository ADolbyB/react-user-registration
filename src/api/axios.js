import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3500" // Dev Backend will be here (another VS Code Instance)
});