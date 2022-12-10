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
//lay event theo id eventype

app.get("/get-events-by-type", function (req,res) {
    const id = req.query.id;
    const sql = `select   * from Nhom5_Events F where EventTypeID in (select ID from Nhom5_EventTypes where ID = ${id} ) `;
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
//  const name = req.query.name;
// lay customer theo ID event
app.get("/customers-by-event", function (req,res) {

    const id = req.query.id;
    const sql = `select * from Nhom5_Customers where ID in ( select CustomerID from Nhom5_Events where EventID =  ${id} ); `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});

// lay event type 1 public

app.get("/alleventype", function (req,res) {
    const sql = `select * from Nhom5_EventTypes A `;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }

    })
});

//detail event type
app.get("/eventype-by-id", function (req,res) {
    const id = req.query.id;
    const sql = `select * from Nhom5_EventTypes A where ID = ${id};`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        } }) });


//get local by event type id

app.get("/local-from-eventype-by-id", function (req,res) {
    const id = req.query.id;
    const sql = `select C.ID as LocalID, C.NameLocal, C.Address, C.Time_Open, C.Time_Close, C.Price as LocalPrice, C.Day_close, 
 C.TotalSeatQty, C.Tel from Nhom5_Localtions C where ID in (select EvTypeID from Nhom5_LocationEvTys where  EvTypeID = ${id} );`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        } }) });
// get service by event type id
app.get("/service-from-eventype-by-id", function (req,res) {
    const id = req.query.id;
    const sql = `
select E.ID as SerID, E.NameServ, E.ServPrice, E.ServicePeople  from Nhom5_Services E where ID in (select ServiceID from Nhom5_EvServis where EventTypeID = ${id} );
`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        } }) });

//where EventTypeID in (select ID from Nhom5_EventTypes
// detail event

app.get("/detail-event", function (req,res) {
    const id = req.query.id;
    const sql = `select  * from Nhom5_Events    where EventID = ${id};`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
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

app.get("/reviews-from-event", function (req,res) {
    const id = req.query.id;
    const sql = `select * from Nhom5_Reviews where EventID in (select EventID from Nhom5_Events where ID =  ${id} )`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }
    })
});

//lay gallery theo eventtype

app.get("/gallery-from-type", function (req,res) {
    const id = req.query.id;
    const sql = `select * from Nhom5_Gallerys where EventTypeID in (select ID from Nhom5_EventTypes where ID =  ${id} )`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        } else {
            res.send(data);
        }
    })
});

//lay gallery

app.get("/gallery", function (req,res) {

    const sql = `select B.EvTyName, A.imageID, A.Fileimage from Nhom5_Gallerys A
             left join Nhom5_EventTypes B on A.EventTypeID = B.ID 
`;
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
// get local tu event
app.get("/local-from-event", function (req,res) {
    const id = req.query.id;
    const sql = `select * from Nhom5_Localtions where ID in (select LocationID from Nhom5_Events where ID =  ${id} )`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        }else {
            res.send(data);
        }

    })
});

// all data
app.get("/alldatabig", function (req,res) {

    const sql = `select    A.ID, A.EvTyName, A.EvTyDecs, A.EPrice,
 C.ID as LocalID, C.NameLocal, C.Address, C.Time_Open, C.Time_Close, C.Price as LocalPrice, C.Day_close, 
 C.TotalSeatQty, C.Tel , E.ID as SerID, E.NameServ, E.ServPrice, E.ServicePeople , 
  F.ID as EventID, F.EvName, F.Descrip, F.Event_Start, F.Event_End, F.SeatQty, F.RatingAVG,
   G.ID as CustoID, G.CustoName, G.CustoAddress, G.CustoTel,
   H.ID as ReviewID, H.Email , H.Rating, H.Comment, I.Fileimage, I.ID as imageID
  from Nhom5_EventTypes A
 left join Nhom5_LocationEvTys B on A.ID = B.EvTypeID
 left join Nhom5_Localtions C on B.LocationID = C.ID
 left join Nhom5_EvServis D on A.ID = D.EventTypeID 
 left join Nhom5_Services E on D.ServiceID = E.ID
 left join Nhom5_Events F on F.EventTypeID = A.ID
 left join Nhom5_Customers G on F.CustomerID = G.ID
 left join Nhom5_Reviews H on H.EventID = F.ID
 left join Nhom5_Gallerys I on A.ID = I.EventTypeID`;
    conn.query(sql,function (err,data) {
        if(err) {
            res.send("404 not found");
        }else {
            res.send(data);
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