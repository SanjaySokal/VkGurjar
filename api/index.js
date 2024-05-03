const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.listen(4000);

const connection = mysql.createConnection({
    host: "localhost",
    user: "sokalit1_user",
    database: "sokalit1_proxy",
    dateStrings: true,
    password: "Sanjay@8295"
})

app.get("/", (req, resp) => {
    resp.send("Danger Here! You may hacked!");
})

app.post("/login", (req, resp) => {
    connection.query(`SELECT * FROM user WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, (err, result) => {
        if (err) {
            resp.send("Something Went Wrong...");
        } else {
            if (result.length > 0) {
                resp.send("success");
            } else {
                resp.send("Something Went Wrong...");
            }
        }
    })
})

app.post("/add-location-today", (req, resp) => {
    connection.query(`SELECT * FROM location WHERE date = "${req.body.date}" AND email = "${req.body.email}";`, (err, result) => {
        if (!err) {
            if (result.length > 0) {
                resp.send({ exist: "already exist" });
            } else {
                connection.query(`INSERT INTO location (location, email, date) VALUES ('${req.body.location}','${req.body.email}','${req.body.date}')`, (error, data) => {
                    if (!error) {
                        resp.send({ exist: "success" });
                    }
                })
            }
        } else {
            resp.send(err);
        }
    })
})

app.get("/get/:date_data", (req, resp) => {
    connection.query(`SELECT location.id, location.date, location.location, location.email, user.name, user.email date FROM location INNER JOIN user ON user.email = location.email WHERE location.date = "${req.params.date_data}"`, (err, result) => {
        if (!err) {
            resp.send(result);
        } else {
            console.log("failed to find");
        }
    })
})