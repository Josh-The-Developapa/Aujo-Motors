import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '../../components/Card/Card';
import './Home.css'
import { useLocation } from 'react-router-dom';


function Home() {
    const [cars, setCars] = useState();
    const location = useLocation()

    const [isLoading, setIsLoading] = useState();
    if (location.search === "?success=true") {
        alert('Payment successful, thank you for your cooperation')
        location.search = '';
    }

    useEffect(() => {
        async function fetchCars(url) {
            setIsLoading(true);
            const res = await fetch(url)

            const data = await res.json();

            setCars(data.cars.reverse());

            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        fetchCars('http://localhost:5000/cars');


    }, [])
    return (
        <div>
            <Header />
            <div className="oc">
                {isLoading ? <CircularProgress color="success" style={{ position: 'absolute', top: "50%", left: "50%" }} /> : cars ? cars.map((car) => {
                    return (
                        <Card>
                            <div className="hC">
                                <h2>{car.name}</h2>
                            </div>
                            <img src={`http://localhost:5000/uploads/${ car.photo }`} alt='car-pic'></img>
                            <form action={`http://localhost:5000/v1/buy-car/${ car._id }`} method="POST">
                                <button className="btno" type="submit" style={{ padding: "18px" }}>Buy car</button>
                            </form>
                        </Card>
                    )
                }) : ""}
            </div>
        </div>
    )

}

export default Home