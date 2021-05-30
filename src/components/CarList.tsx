import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function CarList() {

    const [carList, setCarList] = useState([]);

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

    return (
        <Grid container direction="column">
            {carList.map((car: any) => (
                <Grid item>
                    <Paper elevation={3} variant="outlined" style={{width: "80%", margin: "auto"}}>
                        <Typography>{car.code}</Typography>
                        <Typography>{car.brand}</Typography>
                        <Typography>{car.model}</Typography>
                        <Typography>{car.numberChairs}</Typography>
                        <Typography>{car.automatic}</Typography>
                        <Typography>{car.nrBigLuggage}</Typography>
                        <Typography>{car.nrSmallLuggage}</Typography>
                        <Typography>{car.location}</Typography>
                        <Typography>{car.pricePerDay}</Typography>
                        <Typography>{car.available}</Typography>
                        <Button>Reserve car</Button>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}