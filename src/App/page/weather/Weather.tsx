import React, {FC, useEffect, useState} from 'react';
import Search from '../../componets/search/Search';
import style from './Weather.module.scss';
import weatherIcon from '../../../Images/weather.png';
import vlag from '../../../Images/vlag.png';
import windy from '../../../Images/wind.png';
import dav from '../../../Images/dav.png';

interface Iwether{
    main: {temp:number, temp_min:number, temp_max:number, feels_like:number, humidity:number, pressure:number};
    wind: {speed:number, deg: number, gust:number};
    name:string;
    weather: any;
    icon: string;
}

const  Weather:FC = () => {
    const [update, setUpdate] = useState<Iwether[]>([])
    const [load, setLoad] = useState<boolean>(false)
    let info = 'Japanese'
    const [start, setStart] = useState<boolean>(false)
    const apikey = '56ad8939c15cef75aea8a4a2c84e6fa4'


    useEffect(() =>{
     async function showCity  () {
           let respons = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${info}&limit=1&appid=${apikey}`)
           let city = await respons.json()
            let respons2 = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&units=metric&lang=ru&appid=${apikey}`)
            let weather = await  respons2.json()
             setLoad(true)
            return setUpdate([city, weather])
     }
     setLoad(false)
     setStart(false)
        showCity()
    },[start])
    console.log(update)
    return (
            <>
                <Search load={setLoad} update={setUpdate}/>
                <h1 className={style.title}>Посмотреть погоду</h1>
                <p className={style.text}>погода на сегодня</p>
                {load ? <div>
                        <div className={style.SliderCon}>
                            <div className={style.SliderTitle}>
                                <h3>{update[1].name}</h3>
                                <img src={`http://openweathermap.org/img/wn/${update[1].weather[0].icon}@2x.png`} alt=""/>
                            </div>
                            <div className={style.SliderWrap}>
                                <h3>Температура</h3>
                                <div className={style.SliderText}>
                                    <p>текущая: {update[1].main.temp}</p>
                                    <p>ощущается как: {update[1].main.feels_like}</p>
                                    <p>минимальная: {update[1].main.temp_min}</p>
                                    <p>максимальная: {update[1].main.temp_max}</p>
                                </div>
                                <div className={style.SliderImg}>
                                    <img src={weatherIcon} alt="" className={style.ImgSvg}/>
                                </div>
                            </div>
                            <div className={style.SliderWrap}>
                                <h3>влажность</h3>
                                <div className={style.SliderText}>
                                    <p>{update[1].main.humidity}%</p>
                                </div>
                                <div className={style.SliderImg}>
                                    <img src={vlag} alt="" className={style.ImgSvg} />
                                </div>
                            </div>
                            <div className={style.SliderWrap}>
                                <h3>Ветер</h3>
                                <div className={style.SliderText}>
                                    <p>скорость ветра: {update[1].wind.speed} м/c</p>
                                    <p>Направление: {update[1].wind.deg}°</p>
                                    <p>Порыв ветра: {update[1].wind.gust ? update[1].wind.gust:
                                        0} м/с</p>
                                </div>
                                <div className={style.SliderImg}>
                                    <img src={windy} alt=""  className={style.ImgSvg}/>
                                </div>
                            </div>
                            <div className={style.SliderWrap}>
                                <h3>Давление</h3>
                                <div className={style.SliderText}>
                                    <p>Давление: {update[1].main.pressure} рт.ст</p>
                                </div>
                                <div className={style.SliderImg}>
                                    <img src={dav} alt="" className={style.ImgSvg} />
                                </div>
                            </div>
                        </div>
                    </div>:
                    <div>Загрузка</div>
                }
            </>
    );
};
export default Weather;
