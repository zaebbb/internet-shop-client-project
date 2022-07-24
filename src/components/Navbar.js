import React, {useContext} from 'react';
import {Context} from "../index";
import Nav from "react-bootstrap/cjs/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom"

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: '#ffffff', textDecoration: 'none'}} to={SHOP_ROUTE}>ZAEB DEVICE</NavLink>

                    {user.isAuth ?
                        <Nav className="ml" style={{color: 'ccc'}}>
                            <Button onClick={() => history.push(ADMIN_ROUTE)} variant={"outline-light"}>Админ Панель</Button>
                            <Button onClick={() => logOut()}  style={{"margin-left": "15px"}} variant={"outline-light"}>Выйти</Button>
                        </Nav>
                        :
                        <Nav className="ml" style={{color: 'ccc'}}>
                            <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизоваться</Button>
                        </Nav>
                    }
            </Container>
        </Navbar>
    );
});

export default NavBar;
