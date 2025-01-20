import axios from "axios";
const API_URL = 'http://localhost:8000';

export default class TrucksService{
    constructor(){}

    getTrucks() {
        const url = `${API_URL}/api/trucks/`;
        return axios.get(url).then(response => response.data);
    }
    getTruckByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getTruck(pk) {
        const url = `${API_URL}/api/trucks/${pk}/`;
        return axios.get(url).then(response => response.data);
    }
    deleteTruck(truck) {
        const url = `${API_URL}/api/trucks/${truck.pk}/`;
        return axios.delete(url);
    }
    createTruck(truck) {
        const url = `${API_URL}/api/trucks/`;
        return axios.post(url, truck);
    }
    updateTruck(truck) {
        const url = `${API_URL}/api/trucks/${truck.pk}/`;
        return axios.put(url, truck);
    }
}
