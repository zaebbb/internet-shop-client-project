import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import Row from "react-bootstrap/Row";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)

    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin){
                data = await login(email, password)
            } else{
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e){
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54, flexDirection: 'column'}}>
            <Card style={{width: '600px', padding: '30px 55px'}}>
                <h2 className="mb-4">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex justify-content-start" style={{flexDirection: 'column'}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Почта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите вашу почту"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите ваш пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Row className="d-flex align-items-center" style={{paddingLeft: "10px"}}>
                        <Button variant="outline-dark" className="w-auto" onClick={click}>
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>
                        <div className="w-auto">{isLogin ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'} <NavLink
                            to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>{isLogin ? "Зарегистрируйтесь" : "Авторизируйтесь"}</NavLink></div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
