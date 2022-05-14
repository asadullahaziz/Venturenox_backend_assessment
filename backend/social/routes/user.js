const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/users", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });
        res.status(201).send({user});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Read
router.get("/users/:id", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.params.id}
        });
        res.status(201).send({user});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(201).send({users});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Update
router.patch("/users/:id", async (req, res) => {
    try {
        const user = prisma.user.update({
            where: {id: req.params.id},
            data: req.body
        });
        res.status(201).send({user});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Delete
router.delete("/users/:id", async (req, res) =>{
    try {
        const deletedUser = prisma.user.delete({
            where: {id: req.params}
        });
        res.status(201).send({deletedUser})
    } 
    catch(error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;