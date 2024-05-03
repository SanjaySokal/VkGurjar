import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    var login = "";
    var a = document.cookie.split(';')
    var js = { loggedin: "" };
    a.map(data => {
        var val_a;
        var a = data.split("=")[0].replace(" ", "");
        if (a === "login") {
            val_a = a;
            js = { loggedin: val_a }
        }
        return js;
    })
    login = js.loggedin;

    useEffect(() => {
        document.title = "Login - Sanjay Sokal"
        if (login === "login") {
            navigate("/", { replace: true });
        }
    })
    const [data, setdata] = useState({
        email: "",
        password: ""
    })

    function setVal(e) {
        var name = e.target.name;
        var val = e.target.value;
        setdata({ ...data, [name]: val });
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const LoginAction = (e) => {
        e.preventDefault();

        console.log(data);

        fetch("https://law.sanjaysokal.com/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then(data2 => {
                if (data2 === "success") {
                    setCookie("login", data.email, 15);
                    console.log("success");
                    window.location.reload();
                }
            })
            .catch(err => { console.log(err) })
    }

    return (
        <section>
            <div className="container">
                <form onSubmit={LoginAction} className="home login">
                    <input type="email" value={data.email} onChange={setVal} name="email" placeholder='Email' required />
                    <input type="password" value={data.password} onChange={setVal} name="password" placeholder='Password' required />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </section>
    )
}

export default Login
