import React, { useEffect, useState } from 'react';
import TrucksService from './TrucksService';

const trucksService = new TrucksService();

const TracksList = () => {
    const [trucks, setTrucks] = useState([]);
    const [nextPageURL, setNextPageURL] = useState('');

    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const result = await trucksService.getTrucks();
                setTrucks(result.data);
                setNextPageURL(result.nextlink);
            } catch (error) {
                console.error("Error fetching trucks:", error);
            }
        };

        fetchTrucks();
    }, []);

    const handleDelete = async (pk) => {
        try {
            await trucksService.deleteTruck({ pk });
            setTrucks((prevTrucks) => prevTrucks.filter((truck) => truck.pk !== pk));
        } catch (error) {
            console.error("Error deleting truck:", error);
        }
    };

    const nextPage = async () => {
        if (!nextPageURL) return;

        try {
            const result = await trucksService.getTruckByURL(nextPageURL);
            setTrucks(result.data);
            setNextPageURL(result.nextlink);
        } catch (error) {
            console.error("Error fetching next page of trucks:", error);
        }
    };

    return (
        <div className="trucks--list">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Truck name</th>
                        <th>Truck main image</th>
                        <th>Truck description</th>
                        <th>Truck price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trucks.map((c) => (
                        <tr key={c.pk}>
                            <td>{c.pk}</td>
                            <td>{c.truck_name}</td>
                            <td><img src={c.truck_main_image} alt={c.truck_name} style={{ width: '50px' }} /></td>
                            <td>{c.truck_description}</td>
                            <td>{c.truck_price}</td>
                            <td>
                                <button onClick={() => handleDelete(c.pk)}>Delete</button>
                                <a href={`/truck/${c.pk}`}>Update</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {nextPageURL && <button className="btn btn-primary" onClick={nextPage}>Next</button>}
        </div>
    );
};

export default TracksList;