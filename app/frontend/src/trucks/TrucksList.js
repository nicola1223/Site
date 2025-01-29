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
                        <th>Название</th>
                        <th>Главное изображение</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {trucks.map((c) => (
                        <tr key={c.pk}>
                            <td>{c.pk}</td>
                            <td>{c.truck_name}</td>
                            <td><img src={c.truck_main_image} alt={c.truck_name} style={{ width: '20vw' }} /></td>
                            <td>{c.truck_description}</td>
                            <td>{c.truck_price}</td>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
                                    <button onClick={() => handleDelete(c.pk)}>Удалить</button>
                                    <a href={`/truck/${c.pk}`}>Обновить</a>
                                </div>
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