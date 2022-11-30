//xay nha doumain
const express = require("express");
const app = express();
//cap cong
const PORT = process.env.PORT || 5000;

//mo cua

app.listen(PORT, function () {
    console.log("server is running...");
});
// share and allow api access all
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//config connect to mysql
const configDB = {
    host: "139.180.186.20",  // may chu chua db, binh thg la localhost
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password:"t2207e123",   // xamp : neu ko co thi de la "" , neu xai mamp ma ko co thi la "root"
    multipleStatements: true // cho phep su dung nhieu cau sql 1 lan gui yeu cau
};
//connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// lay event
app.get("/get-events", function (req,res) {
    const sql = "select * from Nhom5_Events";
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});

// lay customer

app.get("/get-customers", function (req,res) {
    const sql = "select * from Nhom5_Customers";
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});

// lay service

app.get("/get-services", function (req,res) {
    const sql = "select * from Nhom5_Services";
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});

// lay event theo ten khach hang
app.get("/event-by-customers", function (req,res) {
    const name = req.query.name;
    const sql = `select * from Nhom5_Events where cid in ( select cid from Nhom5_Customers where name like '%${name}%' ) `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});

// lay event

app.get("/get-Events", function (req,res) {
    const sql = "select * from Nhom5_Events";
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});

// detail event

app.get("/detail-event", function (req,res) {
    const id = req.query.id;
    const sql = `select * from Nhom5_Events where ID =  ${id} `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else if (data.length > 0 ) {
            res.send(data[0]);
        }
        else {
            res.status(404).send("404 not found");
        }

    })
});

//detail customer

app.get("/detail-customer", function (req,res) {
    const id = req.query.id;
    const sql = `select * from Nhom5_Customers where ID =  ${id} `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else if (data.length > 0 ) {
            res.send(data[0]);
        }
        else {
            res.status(404).send("404 not found");
        }

    })
});

//lay review

app.get("/reviews", function (req,res) {
    const sql = "select * from Nhom5_Reviews";
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});

//detail review

app.get("/detail-reviews", function (req,res) {
    const id = req.query.id;
    const sql = `select * from Nhom5_Reviews where ID =  ${id} `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else if (data.length > 0 ) {
            res.send(data[0]);
        }
        else {
            res.status(404).send("404 not found");
        }

    })
});


//them, sua, xoa review
  //them
app.post("/postreview", function (req, res) {

    const email = req.query.Email;
    const rating = req.query.Rating;
    const cmt = req.query.Comment;
    const eventID = req.query.EventID;

    const sql = ` insert into Nhom5_Reviews(Email,Rating,Comment,EventID)
 values (' ${email} ', ${rating} ,'${cmt} ', ${eventID}) `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else if (data.length > 0 ) {
            res.send(data[0]);
        }
        else {
            res.status(404).send("404 not found");
        }

    })
});

  //sua

app.put("/updatereview", function (req, res) {
    const id = req.query.id;
    const email = req.query.Email;
    const rating = req.query.Rating;
    const cmt = req.query.Comment;
    const eventID = req.query.EventID;

    const sql = ` update  Nhom5_Reviews set Email = '${email}',Rating = ${rating}, Comment = '${cmt}', EventID = ${eventID}) where ID =  ${id} `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else if (data.length > 0 ) {
            res.send(data[0]);
        }
        else {
            res.status(404).send("404 not found");
        }

    })
});

//xoa

app.delete("/delreview", function (req, res) {

    const id = req.query.id;

    const sql = ` delete from  Nhom5_Reviews  where ID =  ${id}`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else if (data.length > 0 ) {
            res.send(data[0]);
        }
        else {
            res.status(404).send("404 not found");
        }

    })
});