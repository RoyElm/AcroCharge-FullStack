import axios from 'axios';
import { Globals } from '../GlobalServices/Globals';

const httpClient = axios.create({
    baseURL: Globals.baseApiUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpClient;