let con = require("./connection")
let express = require("express")

let app = express()

let bodyparser = require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set("view engine","ejs")

con.connect(function(error){
    if(error){
        console.log(error)
    }else{
        console.log("connection established>>>>>")

        // con.query("select * from students",function(error,result){
        //     if(error){
        //         console.log("error")
        //     }else{
        //         console.log("result is >>>>",result)
        //     }
        // })
    }
})

app.get("/",async (req,res)=>{
    console.log("get route called>>>>")
    res.sendFile(__dirname+"/index.html")
})

app.post("/",async (req,res)=>{
    console.log("get route called>>>>")

    let {name,email,mobile} = req.body

    console.log("req.body>>>>>",req.body)
    let postdata = `INSERT INTO students(name, email, mobile) VALUES(?,?,?)` // VALUES ? || VALUES("${name}","${email}","${mobile}")
    console.log('postdata: ', postdata);

    let val = [
        [name,email,mobile]
    ]

    con.query(postdata,[name,email,mobile],(error,result)=>{ //[val]
        if(error) throw error;
        res.send(result)
    })
})

app.get("/students", async (req,res)=>{
    console.log("get student route")

    let getStudent = "SELECT * FROM students"

    con.query(getStudent,(error,result)=>{
        if(error) throw error;
        console.log("result/////",result)

        res.render(__dirname+"/students",{students:result})
    })
})


app.get("/delete-student", async (req,res)=>{
    console.log("Delete student route")

    console.log('req.query.id: ', req.query.id);
    let deleteStudent = `delete from students where id="${req.query.id}"`
    console.log('deleteStudent: ', deleteStudent);

    con.query(deleteStudent,(error,result)=>{
        if(error) throw error;

        res.redirect("/students")
    })
})

app.get("/update-student", async (req,res)=>{
    console.log("Update student route")

    console.log('req.query.id: ', req.query.id);
    let updateStudent = `SELECT * from students where id="${req.query.id}"`
    console.log('updateStudent: ', updateStudent);

    con.query(updateStudent,(error,result)=>{
        if(error) throw error;

        res.render(__dirname + "/updatestudent", { updatestudent: result })
    })
})

app.post("/update-student", async (req,res)=>{
    console.log("Update student route",req.body)

    let updateStudent = `UPDATE students set name="${req.body.name}", email="${req.body.email}", mobile="${req.body.mobile}" where id=${req.query.id}`
    console.log('updateStudent: ', updateStudent);

    con.query(updateStudent,(error,result)=>{
        if(error) throw error;

        res.redirect("/students")
    })
})
app.listen(5000,()=>{
    console.log("app started🛴🛵......")
})