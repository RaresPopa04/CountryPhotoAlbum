import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/countryPage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faX} from '@fortawesome/free-solid-svg-icons';

const CountryPage = () => {
    const { country } = useParams();
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selected, setSelected] = useState([]);
    const [error, setError] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bigPhoto, setBigPhoto] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e)=>{


        setError("");
        const files = e.target.files;

        setSelected((prevSelected) => [...prevSelected, ...Array.from(files)]);
        const images = [];
        for(let i=0; i<files.length; i++){
            const file = files[i];
            const reader = new FileReader();
            reader.onloadend = ()=>{
                images.push(reader.result);
                setSelectedImages((prevImages) => [...prevImages, reader.result]);
            }
            reader.readAsDataURL(file);
        }

    }

    const getImages = ()=>{ 
        const images = [];
        for(let i=0; i<localStorage.length; i++){
            
                const key = localStorage.key(i);
                if(key.startsWith(country)){
                    images.push(localStorage.getItem(key));
                }
        }
        setImages(images);
    }

    const handleSubmit = (e)=>{
            e.preventDefault();

            if(selected.length === 0){
                setError("Nu au fost selectate poze");
                return;
            }
            selected.forEach((file, index)=>{
                const reader = new FileReader();
                reader.onloadend = ()=>{
                    const base64String = reader.result;
                    const id = new Date().getTime();
                    const key = `${country}-${id}`;
                    localStorage.setItem(key, base64String);
                }
                reader.readAsDataURL(file);
            })
            setSelectedImages([]);
            setSelected([]);
            getImages();
    }

    const handleDelete = (e)=>{
        const image = e.target.previousSibling.src;
        const key = Object.keys(localStorage).find(key=>localStorage.getItem(key) === image);
        localStorage.removeItem(key);
        getImages();
    }

    const goBack = ()=>{
        navigate("/");
    }

    const movePhotos = (direction)=>{
        if(direction === 1){
            setCurrentIndex((currentIndex+1)%images.length);
        }
        else{
            setCurrentIndex((currentIndex-1+images.length)%images.length);
        }

    }

    const closeBigPhoto = ()=>{
        setBigPhoto(false);
    }
        

        

    React.useEffect(()=>{
        getImages();
    },[images])
    return (
        <div>
            <div  onClick = {goBack} className="backBtn">
                <FontAwesomeIcon icon={faArrowLeft} className="faIcon"/>
            </div>
            <h1 className="countryTitle">{country}</h1>
            <div className="errorContainer">
                <h2>{error}</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="fileUploadContainer">
                    <div className="selectedImages">
                        
                        {
                            selectedImages.map((file, index)=>{
                                return (
                                <div key = {file.id} className="imgContainer">
                                    <img key={file.id} src={file} />
                                </div>
                            )
                            })
                        }
                    </div>
                    <div className="fileUploadLabel">Ia să vedem</div>
                    <input className = "fileUploadInput" type="file" onChange={handleFileChange} multiple/>
                </div>
                <button className= "submitBtn"  type="submit">Salvează</button>
            </form>
            {bigPhoto && 
            <div className="viewBigPhotos">
                <FontAwesomeIcon icon = {faX} onClick={closeBigPhoto} className="faClose faIcon"/>
                <FontAwesomeIcon icon={faArrowLeft} onClick={()=>movePhotos(-1)} className="faNextPhoto faIcon"/>
                <img src={images[currentIndex]} alt="country"/>
                <FontAwesomeIcon icon={faArrowRight} onClick={()=>movePhotos(1)} className="faNextPhoto faIcon"/>
            </div>
            }
            <div class = "gallery">
                {
                    images.map((image, index)=>{
                        return (
                            <div class = "galleryElement" key={image.id}>
                                <img src={image} alt="country" onClick={()=>{setBigPhoto(true); setCurrentIndex(index)}}/>
                                <button className = "deleteBtn" onClick={handleDelete}>X</button>
                            </div>
                            
                    )
                    })
                }
                
            </div>
        </div>

    );
   };

export default CountryPage;