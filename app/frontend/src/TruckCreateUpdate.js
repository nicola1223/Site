import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrucksService from './TrucksService';

const trucksService = new TrucksService();

const TruckCreateUpdate = () => {
    const { pk } = useParams(); // Получаем параметр pk из маршрута
    const truckName = useRef();
    const truckMainImage = useRef();
    const truckPrice = useRef();
    const truckDescription = useRef();

    const navigate = useNavigate();

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
        navigate('/');
    };

    const FileUpload = () => {
        const [fileName, setFileName] = React.useState('Выберите изображение');
    
        const handleFileChange = (event) => {
            if (event.target.files.length > 0) {
                setFileName(event.target.files[0].name);
            } else {
                setFileName('Выберите изображение');
            }
        };
    
        return (
            <div>
                <label className="custom-file-upload form-control">
                    {fileName}
                    <input
                        className="form-control"
                        id="truckMainImage"
                        type="file"
                        ref={truckMainImage}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                <style jsx="true">{`
                    .custom-file-upload {
                        display: inline-block;
                        padding: 6px 12px;
                        cursor: pointer;
                        border: 1px solid #ccc;
                        background-color: #f8f8f8;
                    }
                    input[type="file"] {
                        display: none; /* Скрываем стандартный input */
                    }
                `}</style>
            </div>
        );
    };

    return (
        <div className="create-update-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className="form-control" id="truckName" type="text" ref={truckName} placeholder="Название" required/>  
                    {/* <input className="form-control" id="truckMainImage" type="file"  accept="image/*"/> */}
                    <FileUpload/>
                    <div className="input-group">
                        <input className="form-control" id="truckPrice" type="number" step="0.01" ref={truckPrice} placeholder="Цена" required/>
                        <span className="input-group-text">BLR</span>
                    </div>
                    <div className="input-group">
                        <textarea className="form-control" id="truckDescription" ref={truckDescription} placeholder="Описание"></textarea>
                    </div>
                    <div className="submit">
                        <input className="btn btn-primary" type="submit" value="Добавить" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TruckCreateUpdate;