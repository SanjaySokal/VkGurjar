import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [user, setuser] = useState(false);

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
        if (login === "login") {
            setuser(true);
        }
    }, [login])

    function delete_cookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.reload();
    }

    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="nav-links">
                            <Link to={'/'}><i className="fa-solid fa-house"></i></Link>
                            {user ? <Link onClick={() => delete_cookie("login")} to={'/login'}><i className="fa-solid fa-arrow-right-from-bracket"></i></Link> : <Link to={'/login'}><i className="fa-solid fa-user"></i></Link>}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
