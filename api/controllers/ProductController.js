const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const excelJs = require("exceljs");

dotenv.config();

app.use(fileUpload());

app.post("/createProduct", async (req, res) => {
  try {
    const result = await prisma.product.create({
      data: req.body,
    });

    res.send({ message: "success" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.get("/getAllProduct", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        status: "use",
      },
    });

    res.send({ result: products });
  } catch (s) {
    res.status(500).send({ message: e.message });
  }
});

app.delete("/removeProduct/:id", async (req, res) => {
  try {
    await prisma.product.update({
      data: {
        status: "delete",
      },
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.send({ message: "success" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.put("/updateProduct", async (req, res) => {
  try {
    const fs = require("fs");
    const oldData = await prisma.product.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    if (oldData.img != "") {
      const imagePath = "./uploads/" + oldData.img;

      if (fs.existsSync(imagePath)) {
        await fs.unlinkSync(imagePath);
      }
    }

    await prisma.product.update({
      data: req.body,
      where: {
        id: parseInt(req.body.id),
      },
    });

    res.send({ message: "success" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.post("/upload", async (req, res) => {
  try {
    if (req.files != undefined) {
      if (req.files.img != undefined) {
        const img = req.files.img;
        const fs = require("fs");
        const myDate = new Date();
        const y = myDate.getFullYear();
        const m = myDate.getMonth();
        const d = myDate.getDate();
        const h = myDate.getHours();
        const min = myDate.getMinutes();
        const s = myDate.getSeconds();
        const ms = myDate.getMilliseconds();

        const arrFileName = img.name.split(".");
        const ext = arrFileName[arrFileName.length - 1];

        const newName = `${y}${m}${d}${h}${min}${s}${ms}.${ext}`;

        img.mv("./uploads/" + newName, (err) => {
          if (err) throw err;

          res.send({ newName: newName });
        });
      }
    } else {
      res.status(501).send("notImpremented");
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.post("/uploadFromExcel", (req, res) => {
  try {
    const fileExcel = req.files.fileExcel;
    fileExcel.mv("./uploads/" + fileExcel.name, async (err) => {
      if (err) throw err;

      const workbook = new excelJs.Workbook();
      await workbook.xlsx.readFile("./uploads/" + fileExcel.name);

      const ws = workbook.getWorksheet(1);

      for (let i = 2; i <= ws.rowCount; i++) {
        const name = ws.getRow(i).getCell(1).value ?? "";
        const cost = ws.getRow(i).getCell(2).value ?? 0;
        const price = ws.getRow(i).getCell(3).value ?? 0;

        if (name != "" && cost >= 0 && price >= 0) {
          await prisma.product.create({
            data: {
              name: name,
              cost: cost,
              price: price,
              img: "",
            },
          });
        }
      }

      const fs = require("fs");
      await fs.unlinkSync("./uploads/" + fileExcel.name);

      res.send({ message: "success" });
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = app;
