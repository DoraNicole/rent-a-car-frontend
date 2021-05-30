import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function CarList() {

    const [carList, setCarList] = useState([]);
    const [selectedCar, setSelectedCar] = useState({brand: "", model: "", code: "", pricePerDay: 0});
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");

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

    return (
        <Grid container direction="column">
            <Grid item>
                <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                    <Typography>Data preluare masina : </Typography>
                    <TextField InputProps={{inputProps: {min: minDate1}}} onChange={(e)=>setDate1(e.target.value)} type="date"/>
                </Paper>
            </Grid>
            <Grid item>
                <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                    <Typography>Data returnare masina : </Typography>
                    <TextField InputProps={{inputProps: {min: minDate2}}} onChange={(e)=>setDate2(e.target.value)} type="date" />
                </Paper>
            </Grid>
            <Grid item>
                <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                    <Typography>Masina selectata : {selectedCar.brand}-{selectedCar.model}-{selectedCar.code}</Typography>
                    <Typography>Numar zile : {(new Date(date2).getTime()-new Date(date1).getTime())/(1000*3600*24)}</Typography>
                    <Typography>Pret total (RON) : {(new Date(date2).getTime()-new Date(date1).getTime())/(1000*3600*24) * (selectedCar.pricePerDay)}</Typography>
                    <Button variant="contained" color="primary" onClick={()=>{alert("Car is reserved")}}>Reserve car</Button>
                </Paper>
            </Grid>
            {carList.map((car: any) => (
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