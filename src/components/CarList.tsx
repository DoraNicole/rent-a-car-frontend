import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function CarList() {

    const [carList, setCarList] = useState([{pickUpDate: "", returnDate: "", location: ""}]);
    const [selectedCar, setSelectedCar] = useState({brand: "", model: "", code: "", pricePerDay: 0, location: ""});
    const [order, setOrder] = useState({});
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");
    const [carLocation, setCarLocation] = useState("");

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const minDate1 = formatDate(today);
    const minDate2 = formatDate(tomorrow);

    function formatDate(d: any) {
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    useEffect(() => {
        fetch('http://localhost:8080/rent-a-car/cars', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
        .then(async data => setCarList(await data.json()))
    });

    const handleCarClick = (car : any) => 
    {
        setSelectedCar(car);
    }

    const handleReserveCar = (car: any) =>
    {
        console.log(car);
        setDate1("");
        setDate2("");
        setCarLocation("");
        setSelectedCar({brand: "", model: "", code: "", pricePerDay: 0, location: ""});
        setOrder({
            carId: car.id,
            pickUpDate: date1, 
            returnDate: date2, 
            price: (new Date(date2).getTime()-new Date(date1).getTime())/(1000*3600*24) * (selectedCar.pricePerDay),
            location: selectedCar.location
        })
        postOrder(order);
    }

    async function postOrder(order: any) {
        return fetch('http://localhost:8080/rent-a-car/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(data=>data.text())
        async function postOrder(order: any) {
            return fetch('http://localhost:8080/rent-a-car/addOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then(data=>data.text())
            .then(text=>{
                if(text === "Saved") {
                    alert("Car is reserved");
                } else {
                    alert("There has been an error! Retry reserving!");
                }
                console.log(text)
            })
        }
    }

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography style={{width: "80%", margin: "auto", fontWeight: "bold"}}>Preferinte</Typography>
            </Grid>
            <br/>
            <Grid item>
                <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                    <Typography>Data preluare masina : </Typography>
                    <TextField InputProps={{inputProps: {min: minDate1}}} onChange={(e)=>setDate1(e.target.value)} value={date1} type="date"/>
                </Paper>
            </Grid>
            <Grid item>
                <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                    <Typography>Data returnare masina : </Typography>
                    <TextField InputProps={{inputProps: {min: minDate2}}} onChange={(e)=>setDate2(e.target.value)} value={date2} type="date" />
                </Paper>
            </Grid>
            <Grid item>
                <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                    <Typography>Locatie masina : </Typography>
                    <Select value={carLocation} onChange={(e)=>setCarLocation(e.target.value as string)}>
                        {carList.filter((car : any)=>car.location).map((item) =>(
                            <MenuItem value={item.location}>{item.location}</MenuItem>
                        ))}
                    </Select>
                </Paper>
            </Grid>
            <br/>
            <Grid item>
                <Typography style={{width: "80%", margin: "auto", fontWeight: "bold"}}>Selectie</Typography>
            </Grid>
            <br/>
            <Grid item>
                <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                    <Typography>Masina selectata : {selectedCar.brand}-{selectedCar.model}-{selectedCar.code}</Typography>
                    <Typography>Numar zile : {(new Date(date2).getTime()-new Date(date1).getTime())/(1000*3600*24)}</Typography>
                    <Typography>Pret total (RON) : {(new Date(date2).getTime()-new Date(date1).getTime())/(1000*3600*24) * (selectedCar.pricePerDay)}</Typography>
                    <Typography>Locatie masina : {selectedCar.location}</Typography>
                    <Button disabled={!date1 || !date2 || !(selectedCar?.code) || !carLocation} variant="contained" color="primary" onClick={()=>{handleReserveCar(selectedCar)}}>Reserve car</Button>
                </Paper>
            </Grid>
            <Grid item>
                <Typography style={{width: "80%", margin: "auto", fontWeight: "bold"}}>Lista masini disponibile</Typography>
            </Grid>
            {carList.filter((car : any) => (car.location === carLocation) && (car.available)).length === 0 && 
                <Grid item>
                    <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                        <Typography>Nicio masina nu este disponibila</Typography>
                    </Paper>
                </Grid>
            }
            {carList.filter((car : any) => (car.location === carLocation) && (car.available)).map((car: any) => (
                <Grid item>
                    <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                        <Typography>Marca : {car.brand}</Typography>
                        <Typography>Model : {car.model}</Typography>
                        <Typography>Numar inmatriculare : {car.code}</Typography>
                        <Typography>Numar locuri : {car.numberChairs}</Typography>
                        <Typography>Transmisie : {car.automatic ? "automata" : "manuala"}</Typography>
                        <Typography>Numar locuri bagaje mari : {car.nrBigLuggage}</Typography>
                        <Typography>Numar locuri bagaje mici : {car.nrSmallLuggage}</Typography>
                        <Typography>Locatie masina : {car.location}</Typography>
                        <Typography>Pret pe zi (RON) : {car.pricePerDay}</Typography>
                        <Typography>Disponibila : {car.available ? "da" : "nu"}</Typography>
                        <Button variant="contained" color="primary" onClick={()=>{handleCarClick(car)}}>Select car</Button>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}