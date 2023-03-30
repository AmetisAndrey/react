import Search from '../search/Search'
import React from 'react';
import style from './Layout.module.scss'
import Burger from "../burger/Burger";
import {Outlet} from 'react-router-dom'

const Layout = ({center = true}) => {
    return (
        <div className={`${style.container} ${center ? style.center:''}`}>
            <div className={style.wrapLayout}>
                <Burger />
                
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;