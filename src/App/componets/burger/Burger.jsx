import React, {useState} from 'react';
import Button from '@mui/material/Button'
import {Menu, MenuItem} from "@mui/material";
import style from './Burger.module.scss'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {Link} from 'react-router-dom';
import Weekly from '../../page/weekly/Weekly';
const Burger = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
  const handClick = (e) =>{
        setAnchorEl(e.currentTarget)

    }
    const handClose = () =>{
        setAnchorEl(null)
    }



    return (
        <div className={style['burger_cont']}>
             <Button onClick={handClick} id="basic-button">
                 {!open ? <MenuIcon className={style['burger_icon']}/>: <CloseIcon className={style['burger_icon']}/>}
             </Button>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handClose} className={style.menu}>
                <MenuItem onClick={handClose}><Link to={"/"}>Main</Link></MenuItem>
                <MenuItem onClick={handClose}><Link to={"/Weather"}>Weather</Link></MenuItem>
                <MenuItem onClick={handClose}><Link to={"/Weekly"}>Weekly</Link></MenuItem>
            </Menu>

        </div>
    );
};

export default Burger;