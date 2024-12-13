const port = 888
server.use(express.json()) //bdl using body parser 
const express = require('express')
const db_access = require('./bd.js')
const db = db_access.db
const server = express()
const port = 3000
server.use(express.json()) // bdl using body parser 

// const isADMIN = req.body.isADMIN
// const query = `INSERT INTO USER (NAME, EMAIL, PASS, ISADMIN) VALUES ('${name}', '${email}', '${password}', 0)`
// for users
// no need for '' if int
server.post('/user/register', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    // const isADMIN = req.body.isADMIN
    const query=`INSERT INTO USER (NAME,EMAIL,PASSWORD,ISADMIN) VALUES ('${name}','${email}','${password}',0)`
    const pass = req.body.pass
     const query = `INSERT INTO USER (NAME, EMAIL, PASS, ISADMIN) VALUES ('${name}', '${email}', '${pass}', 0)` 

    // console.log(query)
    db.run(query, (err) => {
        if (err){
        if (err) {
            console.log(err.message)
            return res.status(401).send(err)}
        else
            return res.status(200).send(`registration successfull`)
    }
    )})
            return res.status(401).send(err)
        } else
            return res.status(200).send(`registration successful`)
    })
})

// text must be in a '' like email and if passowrd wanted to be a text
// text must be in a '' like email and if password wanted to be a text
// login for admin
server.post('/user/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    db.get(`SELECT * FROM USER WHERE EMAIL= '${email}'  
        AND PASSWORD = '${password}' `, (err, row) => {
    const pass = req.body.pass
    db.get(`SELECT * FROM USER WHERE EMAIL= '${email}' AND PASS = '${pass}'`, (err, row) => {

    //db.get(`SELECT * FROM USER WHERE EMAIL= '${email}' AND PASS = '${pass}'`, (err, row) => {
        if (err || !row)
            return res.status(401).send(`Wrong email or password`)
            return res.status(401).send(`Wrong email or pass`)
        else
            return res.status(200).send(`login successfull`)
            return res.status(200).send(`login successful`)
    })
})

server.get('/users', (req, res) => {
    const query = `SELECT * FROM USER`;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving users');
        } else {
            return res.json(rows);
        }
    });
});

server.get('/user/email', (req, res) => {
    const email = req.query.email;  // Email passed as a query parameter
    const query = `SELECT * FROM USER WHERE EMAIL = '${email}'`;
    db.get(query, (err, row) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else if (!row){
            return res.send(`this id ${req.params.email} is not found) `)} 
        
        else 
        {
            return res.send(row)
}})})
    
server.put('/user/profile', (req, res) => {
    const userID = req.body.userID;
    const name = req.body.name;
    const email = req.body.email;
    const query = `UPDATE USER SET NAME = '${name}', EMAIL = '${email}' WHERE ID = ${userID}`;
    db.run(query, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error updating profile');
        } else {
            return res.send('Profile updated successfully');
        }
    });
});

server.delete('/tickets/:id', (req, res) => {
    const query = `DELETE FROM TICKET WHERE ID = ${req.params.id}`;
    db.run(query, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error deleting ticket');
        } else {
            return res.send('Ticket deleted successfully');
        }
    });
});

server.post(`/ticket/add`, (req, res) => {
    const origin = req.body.origin
    const destination = req.body.destination
    const date = req.body.date
    const quantity = parseInt(req.body.quantity, 10)
    const price = parseInt(req.body.price, 10)
    let query = `INSERT INTO TICKET (ORIGIN, DESTINATION, DATE, QUANTITY, PRICE) VALUES ('${origin}', '${destination}', '${date}', ${quantity}, ${price})`
    db.run(query, (err) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            return res.send(`Ticket added successfully`)
        }
    })
})
    })
})
