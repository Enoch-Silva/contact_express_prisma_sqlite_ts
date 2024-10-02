import express from "express";
import { PrismaClient } from "@prisma/client";

import { rotas } from "./assets";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

type ContactProps = {
  id: string | number;
  name: string;
  phone: number;
  email: string;
};

app.get("/", (req, res) => {
  res.send(rotas);
});

app.get("/contacts", async (req, res) => {
  const contacts = await prisma.contact.findMany();
  res.json(contacts);
});

app.get("/contact/:id", async (req, res) => {
  const formatedId = parseInt(req.params.id);
  const contact = await prisma.contact.findMany({
    where: {
      id: formatedId,
    },
  });
  res.send(contact);
});

app.post("/contact", async (req, res) => {
  const { name, email, phone } = req.body;
  await prisma.contact.create({
    data: { name, email, phone },
  });
  res.json({ message: "Contacto salvo com sucesso!" });
});

app.patch("/contact/:id", async (req, res) => {
  await prisma.contact.update({
    where: { id: parseInt(req.params.id) },
    data: { name: req.body.name, email: req.body.email, phone: req.body.phone },
  });
  res.json({ message: "Contacto actualizado com sucesso!" });
});

app.delete("/contact/:id", async (req, res) => {
  await prisma.contact.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json({ message: "Contacto excluido com sucesso!" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
