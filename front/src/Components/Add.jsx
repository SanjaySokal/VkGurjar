import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();

    function getNewDate() {
        const date = new Date();
        var day = date.getDate();
        var month = (date.getMonth() + 1);
        var year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        var new_date = year + "-" + month + "-" + day;
        return new_date;
    }

    var date_data = "";
    var js = { loggedin: "", email: "" };
    var login = "";
    var a = document.cookie.split(';')
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split("=");
        for (var x = 0; x < b.length; x++) {
            var c = b[x].replace(" ", "");
            if (c === "login") {
                js = { loggedin: c, email: b[x + 1] };
            }
        }
    }
    login = js.loggedin;
    date_data = getNewDate();
    if (login !== "login") {
        navigate("/", { replace: true });
    }

    const [isOrNot, setisOrNot] = useState(false);
    const [val, setVal] = useState("");
    const addLocation = (e) => {
        e.preventDefault();
        fetch("https://law.sanjaysokal.com/add-location-today", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ location: val, email: js.email, date: date_data })
        })
            .then(res => res.json())
            .then(data2 => {
                console.log(data2);
                if (data2.exist === "already exist") {
                    setisOrNot(true);
                } else if (data2.exist === "success") {
                    alert("Added Successfully!")
                    setVal("");
                }
            })
            .catch(err => { console.log(err) })
    }
    return (
        <section>
            <div className="container">
                {isOrNot ? <h2>Come Tomorrow</h2> : <form onSubmit={addLocation} className="home"><input type="text" onChange={e => setVal(e.target.value)} value={val} name="date" placeholder='Where is your duty...' required /><button type='submit'><i className="fa-solid fa-plus"></i></button></form>}
            </div>
        </section>
    )
}

export default Add
