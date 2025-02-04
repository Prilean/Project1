const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const db_connection = require('./db_connection.js');
const student_model = require('./student_schema.js');

/*
{
    "student_id" : 1,
    "name" : "Joe Mama",
    "email_id" : "joe.mama@gmail.com",
    "password" : "12345"
}
*/

app.post('/register', (req, res) => {
    const student = new student_model({
        student_id: req.body.student_id,
        name: req.body.name,
        email_id: req.body.email_id,
        password: req.body.password,
    });

    student.save().then(
        insert_data => {
            res.status(200).send('Successfully Registered The Student!');
        }
    ).catch(err => {
        res.status(500).send('Internal Server Error! Unable to register student.');
    })
})


app.post('/login', (req, res) => {
    const student = {
        email_id: req.body.email_id,
        password: req.body.password
    };

    student_model.find({"email_id": student.email_id}).then(
        student_data => {
            if (student_data[0].password == student.password){
                res.send("Successful Login!");
            }
            else {
                return res.send("Incorrect email or password!");
            }
        }
    ).catch(err => {
        return res.status(504).send({message: "Error retrieving student!"})
    })
});

app.get('/search/:id', (req, res) => {

    student_model.find({"student_id": parseInt(req.params.id)}).then(
        student_data => {
            if (student_data.length > 0){
                res.send(student_data);
            }
            else {
                return res.send("Cannot find student!");
            }
        }
    ).catch(err => {
        return res.status(504).send({message: "Error retrieving student!"})
    })
});

app.put('/update/:id', (req, res) => {
    student_model.findOneAndUpdate({"student_id": parseInt(req.params.id)},
        {
            $set: {
                "name" : req.body.name,
                "email_id" : req.body.email_id,
                "password" : req.body.password
            }
        }, {new: true}).then(
        student_data => {
            if (student_data != null){
                res.send("Successful Updated!");
            }
            else {
                return res.send("Cannot find student!");
            }
        }
    ).catch(err => {
        return res.status(504).send({message: "Error retrieving student!"})
    })
});

app.delete('/delete/:id', (req, res) => {
    student_model.findOneAndDelete({"student_id": parseInt(req.params.id)}).then(
        student_data => {
            if (student_data != null){
                res.send("Successful Deleted!");
            }
            else {
                return res.send("Cannot find student!");
            }
        }
    ).catch(err => {
        return res.status(504).send({message: "Error retrieving student!"})
    })
});


app.listen(80, () => console.log("Server Started on port: 80"));
