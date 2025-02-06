import axios from "../api/axios";

export default class TrucksService{
    getTrucks() {
        const url = `/trucks/`;
        return axios.get(url).then(response => response.data);
    }
    getTruckByURL(link) {
        const url = `${link}`;
        return axios.get(url).then(response => response.data);
    }
    getTruck(pk) {
        const url = `/trucks/${pk}/`;
        return axios.get(url).then(response => response.data);
    }
    deleteTruck(truck) {
        const url = `/trucks/${truck.pk}/`;
        return axios.delete(url);
    }
    createTruck(truck) {
        const url = `/trucks/`;
        return axios.post(url, truck);
    }
    updateTruck(truck) {
        const url = `/trucks/${truck.get('pk')}/`;
        return axios.put(url, truck);
    }
}
