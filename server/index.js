const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "GESTION_DES_CHANTIERS",
});

app.post("/create", (req, res) => {
    console.log(req.body);
  const idOuvrier = req.body.idOuvrier;
  const NomOuvrier = req.body.NomOuvrier;
  const PrenomOuvrier = req.body.PrenomOuvrier;
  const EmailOuvrier = req.body.EmailOuvrier;
  const TelephoneOuv = req.body.TelephoneOuv;

  db.query(
    "INSERT INTO OUVRIERS (idOuvrier, NomOuvrier, PrenomOuvrier, EmailOuvrier, TelephoneOuv) VALUES (?,?,?,?,?)",
    [idOuvrier, NomOuvrier, PrenomOuvrier, EmailOuvrier, TelephoneOuv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/Ouvriers", (req, res) => {
  db.query("SELECT * FROM OUVRIERS", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//app.put("/update", (req, res) => {
//  const id = req.body.id;
//  const wage = req.body.wage;
//  db.query(
//    "UPDATE OUVRIERS SET T = ? WHERE id = ?",
//    [wage, id],
//    (err, result) => {
//      if (err) {
//        console.log(err);
//      } else {
//        res.send(result);
//      }
//    }
//  );
//});

app.delete("/delete/:idOuvrier", (req, res) => {
  const idOuvrier = req.params.idOuvrier;
  db.query("DELETE FROM OUVRIERS WHERE idOuvrier = ?", idOuvrier, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});