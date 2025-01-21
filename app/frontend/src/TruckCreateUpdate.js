import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TrucksService from './TrucksService';

const trucksService = new TrucksService();

const TruckCreateUpdate = () => {
    const { pk } = useParams(); // Получаем параметр pk из маршрута
    const truckName = useRef();
    const truckMainImage = useRef();
    const truckPrice = useRef();
    const truckDescription = useRef();

    useEffect(() => {
        if (pk) {
            trucksService.getTruck(pk).then((c) => {
                truckName.current.value = c.truck_name;
                truckMainImage.current.value = null;
                truckPrice.current.value = c.truck_price;
                truckDescription.current.value = c.truck_description;
            }).catch((error) => {
                console.error("Error fetching truck data:", error);
            });
        }
    }, [pk]);

    const handleCreate = () => {
        const formData = new FormData();
        formData.append('truck_name', truckName.current.value);
        formData.append('truck_price', truckPrice.current.value);
        formData.append('truck_description', truckDescription.current.value);
        formData.append('truck_main_image', truckMainImage.current.files[0]);
        trucksService.createTruck(formData).then(() => {
            alert("Truck created!");
        }).catch((error) => {
            console.error("Error creating truck:", error);
            alert("There was an error! Please re-check form.");
        });
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('pk', pk);
        formData.append('truck_name', truckName.current.value);
        formData.append('truck_main_image', truckMainImage.current.files[0]);
        formData.append('truck_price', truckPrice.current.value);
        formData.append('truck_description', truckDescription.current.value);
        trucksService.updateTruck(formData).then(() => {
            alert("Truck updated!");
        }).catch((error) => {
            console.error("Error updating truck:", error);
            alert("There was an error! Please re-check form.");
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы
        if (pk) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-text">Truck name</span>
                    <input className="form-control" id="truckName" type="text" ref={truckName} required/>
                </div>
                <div className="input-group">
                    <span className="input-group-text">Truck main image</span>
                    <input className="form-control" id="truckMainImage" type="file" ref={truckMainImage} accept="image/*"/>
                </div>
                <div className="input-group">
                    <span className="input-group-text">Truck price</span>
                    <input className="form-control" id="truckPrice" type="number" step="0.01" ref={truckPrice} required/>
                    <span className="input-group-text">BLR</span>
                </div>
                <div className="input-group">
                    <label className="input-group-text">Truck description:</label>
                    <textarea className="form-control" id="truckDescription" ref={truckDescription}></textarea>
                </div>
                <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
        </form>
    );
};

export default TruckCreateUpdate;