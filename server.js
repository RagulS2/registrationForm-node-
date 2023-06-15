const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const nodemailer = require('nodemailer');   
const transporter = nodemailer.createTransport({  
    host:
'sandbox.smtp.mailtrap.io',
port:2525,
    auth: {
  
      user: "cf545a0212817b",
  
      pass: "31010cf9cc40a7"
  
    }
});
// import latest cors version
app=express();
app.use(express.json())
app.listen(3000, () => {
    console.log("I'm Waiting")
})



const cors=require("cors")
app.use(cors())
app.use(cors({
    origin:'http://localhost:4200'
}))

const mysql=require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'rahul',
    password: 'Ragul@0209',
    database: 'Student'
});

connection.connect();
console.log("connected");

// getall ------------------------------------------------------
app.get('/allStudent',(req,res)=>{
    connection.query(`select id,Name,Degree,College,Location from studentDetails where isActive=1;`,function(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            res.json(results)
        }
    });
})
// getByid--------------------------------------------------------
app.get('/getById/:id', (req, res) => {

    connection.query(`SELECT id,Name,Degree,College,Location from studentDetails where id =?;`,[req.params.id], function (error, results) {
        if (error) {
            console.log(error);
        }
        console.log('The solution is: ', results);
        res.json(results)
    });
})

// insert----------------------------------------------------------
app.post('/insert', (req, res) => {
    console.log(req.body)
    connection.query('insert into studentDetails (Name,Degree,College,Location,isActive) values (?,?,?,?,?)', [req.body.Name, req.body.Degree, req.body.College,req.body.Location,1], function (error, results) {
        if (error) {
            console.log("error", error)
        }
        console.log("created sucessfully");

        console.log(results)
        res.json(results)
    });
})

// edit----------------------------------------------------------------------------
app.put('/update', (req, res) => {
    connection.query('update studentDetails set Name=?,Degree=?,College=?,Location=? where id=?', [req.body.Name,req.body.Degree,req.body.College,req.body.Location,req.body.id], function (error, results) {
        if (error) {
            console.log("error", error)
        }   
        console.log("update sucessfully");
        console.log(results)
        res.json(results)

    });
})

// delete------------------------------------------------------------------------->
app.put('/delete', (req, res) => {
    connection.query('update studentDetails set isActive=? where id=?', [0,req.body.id], function (error, results) {
        if (error) {
            console.log("error", error)
        }
        console.log("deleted sucessfully");

        console.log(results)
        res.json(results)

    });
})



// staffGetall---------------------------------------------------
app.get('/allStaff',(req,res)=>{
    connection.query(`select id,Name,position,salary from staffDetails where isActive=1;`,function(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            res.json(results)
        }
    });
})


// getbyId-------------------------------------------------------

app.get('/getId/:id', (req, res) => {

    connection.query(`SELECT id,Name,position,salary from staffDetails where id =?;`,[req.params.id], function (error, results) {
        if (error) {
            console.log(error);
        }
        console.log('The solution is: ', results);
        res.json(results)
    });
})

// insert----------------------------------------------------------
app.post('/add', (req, res) => {
    console.log(req.body)
    connection.query('insert into staffDetails (Name,position,salary,isActive) values (?,?,?,?)', [req.body.Name, req.body.position, req.body.salary,1], function (error, results) {
        if (error) {
            console.log("error", error)
        }
        console.log("created sucessfully");

        console.log(results)
        res.json(results)
    });
})

// edit----------------------------------------------------------------------------
app.put('/updatestaff', (req, res) => {
    connection.query('update staffDetails set Name=?,position=?,salary=? where id=?', [req.body.Name,req.body.position,req.body.salary,req.body.id], function (error, results) {
        if (error) {
            console.log("error", error)
        }   
        console.log("update sucessfully");
        console.log(results)
        res.json(results)

    });
})

// delete------------------------------------------------------------------------->
app.put('/deletestaff', (req, res) => {
    connection.query('update staffDetails set isActive=? where id=?', [0,req.body.id], function (error, results) {
        if (error) {
            console.log("error", error)
        }
        console.log("deleted sucessfully");

        console.log(results)
        res.json(results)

    }); 
})

app.post('/login',(req,res)=>{
    const {Name,position}=req.body;
    const salt=20;
    const hash=bcrypt.hashSync(position,salt);
    console.log(hash);
    console.log(req.body)
    connection.query(`select * from staffDetails where Name=? and position=? and isActive=1`,[Name,hash],function(error,results){
        if(error){
            console.log(error);
        }
        else{   
            console.log(results);
            res.json(results)
        }
    });
}  )

app.post('/register',(req,res)=>{
    const {username,password}=req.body;
    salt=10;
    let sql = "Select * from Login where username = ?"

    connection.query(sql, [username], function (error, results) {

        if(results.length>0){
            res.json("user already exists")
        }else {
            const hash=bcrypt.hashSync(password,salt);
            console.log(hash);
            console.log(req.body)
            connection.query(`insert into Login (username,password) values (?,?)`,[username,hash],function(error,insertResults){
                if(error){
                    console.log(error);
                }
                else{   
                    console.log(results);

                    const payload = { 
                        id : insertResults.insertId,
                        email : username
                    }

                    const token = jwt.sign(payload,'secretkey');

                    sendMail(token);
                    // res.json(results)
                }
            });
        }

     })
   
})
app.post('/verify',(req,res)=>{
    const {username,password}=req.body;
    // salt=10;
    // const hash=bcrypt.hashSync(password,salt);
    // console.log(hash);
    // console.log(req.body)
    connection.query(`select * from Login where username=?`,[username],function(error,results){
        if(error){
            console.log(error);
        }
        else{   
            console.log(results);

            const hashedPassword = results[0].password;

            bcrypt.compare(password, hashedPassword, function(err, result) {
                if(result){
                    res.json(results)
                }
                else{
                    res.json({message:"Invalid username or password"})
                }
            })

   // res.json(results)
        }
    });
})


function sendMail(token) {

    email = {
        from: 'ragulstr007@gmail.com',
        to: 'k12564290@gmail.com',
        subject: 'sending!!!',
        text: 'hii bro,call me',
        html : "<a href='http://localhost:4200/verify/"+token+"'>Click here to verify</a>"
    
    }
    transporter.sendMail(email, function(err, info) {  
        if(err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    });
}


app.post('/verifyToken',(req,res)=>{
    const token = req.body.token;

    jwt.verify(token,'secretkey',(err,decoded)=>{ 
        if(err) {
            return res.status(422).json({message:"Invalid token"})
        }

        const id = decoded.id;
        let update = 'UPDATE Login SET isVerified = ? WHERE id = ?';

        connection.query(update,[1,id],function(error,results){
            
            if(error){
                console.log(error);
                return res.status(422).json({message:"Unable to verify token"})
            }

            else{   
                console.log(results);
                res.status(200).json({message:"Verified successfully"})
            }
        })
    })

 });