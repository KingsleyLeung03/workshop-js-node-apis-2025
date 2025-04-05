import { Router } from "express";
import { retrieveContacts, createContact, updateContact, retrieveContact } from "../data/contacts-dao.js";

const router = Router();

// GET http://localhost:3000/api/contacts
router.get("/contacts", async (req, res) => {
  const contacts = await retrieveContacts();
  res.json(contacts);
});

// POST http://localhost:3000/api/contacts
router.post("/contacts", async (req, res) => {
  try {
    const contact = req.body;
    const newContact = await createContact(contact);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ error: error});
  }
});

// PATCH http://localhost:3000/api/contacts/<some-id>
router.patch("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = req.body;
    const updated = await updateContact(id, contact);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE http://localhost:3000/api/contacts/<some-id>
router.delete("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteContact(id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error }); 
  }
});

// GET http://localhost:3000/api/contacts/<some-id>
router.get("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await retrieveContact(id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  } 
});

export default router;