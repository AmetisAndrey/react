import { Scrollbars } from 'react-custom-scrollbars-2';
import React, {useEffect, useState} from 'react';
import Style from './Weekly.module.scss'
import Search from '../../componets/search/Search'
import Skeleton from '@mui/material/Skeleton';
const Weekly = () => {
    const [load, setLoad] = useState(false)
    const [update, setUpdate] = useState([])
    const dateMassive = []
    const Sunrise = []
    const Sunset = []
    const objectDay = {
        Mon:'Понедельник',
        Tue:'Вторник',
        Wed:'Среда',
        Thu:'Четверг',
        Fri:'Пятница',
        Sat:'Суббота',
        Sun:'Воскресенье'
    }
    const objectMonth = {
        Jun: 'Январь',
        Feb: 'Февраль',
        Mar: 'Март',
        Apr: 'Апрель',
        May: 'Май',
        Jun: 'Июнь',
        Jul: 'Июль',
        Aug: 'Август',
        Sep: 'Сентябрь',
        Oct: 'Октябрь',
        Nov: 'Ноябрь',
        Dec: 'Декабрь'
    }
function getData (path)  {
        return (path.map((items, index) => <td key={index}>{items}</td>)) }
    if (load) {
        function date_format() {
            update[2].daily.time.map((item, index) => {
                const time = new Date(item).toUTCString().replace(/,/gi, '').split(' ')
                console.log(time)
                dateMassive.push(time)
            })
            update[2].daily.sunrise.map((item) => {
                const sunrise= new Date(item).toString().split(' ')
                Sunrise.push(sunrise)
            })
            update[2].daily.sunset.map((item) =>{
                const sunset = new Date(item).toString().split(' ')
                Sunset.push(sunset)
            })

        }
        date_format()
        console.log(Sunrise, Sunset)
    }
    return (
        <div className={Style.container}>
            {load && < h1>Погода в {update[0][0].name} на 7 дней</h1>}
            <Search load={setLoad} update={setUpdate} />

            <div className={Style.tableCon}>
                {load ? <Scrollbars style={{height: 660}}
                        renderThumbHorizontal={props => <div {...props} className={Style.thumbHorizontal}/>}
                        renderTrackVertical={props => <div {...props} className={Style.thumbVertical}/>}
                        renderTrackHorizontal={props => <div {...props} className={Style.TrackH}/>}
                        renderThumbVertical={props => <div {...props} className={Style.Vertical}/>}>
                <table className={Style.table}>
                    <thead>
                        <tr className={Style.tableName}>
                            <th className={Style.tableDate}>Даты</th>
                            {dateMassive.map((items, index) =>{
                                return <th className={Style.tableDate} key={index}>{objectDay[items[0]]} <br/> {items[1]} {objectMonth[items[2]]} <br/> {items[3]}
                                </th>
                            })}
                        </tr>
                    </thead>
                   <tbody>
                    <tr className={Style.tableHead}>
                        <td>Температура</td>
                        <td colSpan="10">{update[2].current_weather.temperature}</td>
                    </tr>
                    <tr className={Style.tableHead}>
                        <td >Максимальная температура</td>
                            {getData(update[2].daily.temperature_2m_max)}
                    </tr>
                    <tr className={Style.tableHead}>
                        <td>Минимальная температура</td>
                        {getData(update[2].daily.temperature_2m_min)}
                    </tr>
                    <tr className={Style.tableHead}>
                        <td>Скорость ветра</td>
                        {getData(update[2].daily.windspeed_10m_max)}
                    </tr>
                    <tr className={Style.tableHead}>
                        <td>Рассвет</td>
                        {Sunrise.map((item, index) => {
                            return <td key={index}>{item[4]}</td>
                        })}
                       </tr>
                    <tr className={Style.tableHead}>
                        <td>Закат</td>
                        {Sunset.map((item, index) =>{
                             return <td key={index}>{item[4]}</td>
                    })}
                    </tr>
                    <tr className={Style.tableHead}>
                        <td>Снег</td>

                        {getData(update[2].daily.precipitation_sum)}
                    </tr>
                    <tr className={Style.tableHead}>
                        <td>Дождь</td>
                        {getData(update[2].daily.rain_sum)}
                    </tr>
                   </tbody>
                </table>
                    </Scrollbars>:
                    <Skeleton animation="wave"  height={800} width={700}/>
                }
            </div>
        </div>
    );
};

export default Weekly;