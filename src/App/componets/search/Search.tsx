import SearchIcon from '@mui/icons-material/Search';
import React, {useState, useEffect} from 'react';
import {Collapse, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import style  from './Search.module.scss';

interface Iwether{
    main: {temp:number, temp_min:number, temp_max:number, feels_like:number, humidity:number, pressure:number};
    wind: {speed:number, deg: number, gust:number};
    name:string;
    weather: any;
    icon: string;
}

type TSearch = {
    load: (load:boolean) => void
    // update: (update:[city:{}, weather:{}, geo:{}]) => void
    update: (update:Iwether[]) => void
}

const Search = ({load, update}:TSearch) => {
    const [active, setActive] = useState<boolean>(false)
    const [info, setInfo] = useState<string>('Japanese')
    const [start, setStart] = useState<boolean>(false)
    const apikey:string = '56ad8939c15cef75aea8a4a2c84e6fa4'


    useEffect(() =>{
     async function showCity  () {
           let respons = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${info}&limit=1&appid=${apikey}`)
           let city = await respons.json()
            let respons2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&units=metric&lang=ru&appid=${apikey}`)
            let weather = await  respons2.json()
            let respons3 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city[0].lat}&longitude=${city[0].lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,windspeed_10m_max&current_weather=true&timezone=auto&past_days=3`)
            let geo = await respons3.json()
             load(true)
            return update([city, weather, geo])
     }
     load(false)
     setStart(false)
        showCity()
    },[start])
    function handlerMenu () {
        setActive((e) => !e)
    }
    function getWeather (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStart(true)
    }
    return (
        <form className={style.form} onSubmit={getWeather}>
            <div className={style.wrap}>
                <SearchIcon className={style.search} onClick={handlerMenu}/>
                <Collapse orientation="horizontal" collapsedSize={0} in={active}>
                    <div style={{display: "flex"}}>
                        <TextField id="standart-basic" variant="standard" label="поиск" className={style.input} onChange={(e) =>{
                            setInfo(e.target.value)
                        }}/>
                        <Button type="submit" variant="contained" className={style.button}><SearchIcon /></Button>
                    </div>
                </Collapse>

            </div>
        </form>
    );
};
export default Search;