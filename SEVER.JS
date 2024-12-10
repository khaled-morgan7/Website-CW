const port = 888
server.use(express.json()) //bdl using body parser 

// for users
// no need for '' if int
server.post('/user/register', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    // const isADMIN = req.body.isADMIN
    const query=`INSERT INTO USER (NAME,EMAIL,PASSWORD,ISADMIN) VALUES ('${name}','${email}','${password}',0)`
    // console.log(query)
    db.run(query, (err) => {
        if (err){
            console.log(err.message)
            return res.status(401).send(err)}
        else
            return res.status(200).send(`registration successfull`)
    }
    )})

// text must be in a '' like email and if passowrd wanted to be a text
// login for admin
server.post('/user/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    db.get(`SELECT * FROM USER WHERE EMAIL= '${email}'  
        AND PASSWORD = '${password}' `, (err, row) => {
        if (err || !row)
            return res.status(401).send(`Wrong email or password`)
        else
            return res.status(200).send(`login successfull`)
    })
})
