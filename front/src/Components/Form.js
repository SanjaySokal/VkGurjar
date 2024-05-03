import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Form = () => {
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

    var date_data = getNewDate();
    const [data, setData] = useState([]);
    const [date_search, setDatesearch] = useState("");
    var [heading, setHeading] = useState(false);

    useEffect(() => {
        fetch(`https://law.sanjaysokal.com/get/${date_data}`).then(res => res.json()).then(data2 => setData(data2));
    }, [date_data])

    const getDatedData = (e) => {
        e.preventDefault();
        console.log(date_search);
        fetch(`https://law.sanjaysokal.com/get/${date_search}`).then(res => res.json()).then(data2 => { setData(data2); setHeading(true) });
    }

    return (
        <>
            <form className="home">
                <input type="date" onChange={e => setDatesearch(e.target.value)} name="date" required />
                <button onClick={getDatedData} type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>

            {heading ? <h2>Your Search Data</h2> : null}

            <table width={"100%"} border={".5"} cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Duty</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => {
                            return <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.location}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className="margin-auto"><Link className='add-today' to={'/add'}><i className="fa-solid fa-plus"></i></Link></div>
        </>
    )
}

export default Form
