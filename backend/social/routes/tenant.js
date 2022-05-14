const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/tenant", async (req, res) => {
    try {
        const tenant = await prisma.tenant.create({
            data: req.body
        });
        res.status(201).send({tenant});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Read
router.get("/tenant/:id", async (req, res) => {
    try {
        const tenant = await prisma.tenant.findUnique({
            where: {id: req.params.id}
        });
        res.status(201).send({tenant});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get("/tenant", async (req, res) => {
    try {
        const tenants = await prisma.tenant.findMany();
        res.status(201).send({tenants});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Update
router.patch("/tenant/:id", async (req, res) => {
    try {
        const tenant = prisma.tenant.update({
            where: {id: req.params.id},
            data: req.body
        });
        res.status(201).send({tenant});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Delete
router.delete("/tenant/:id", async (req, res) =>{
    try {
        const deletedtenant = prisma.tenant.delete({
            where: {id: req.params}
        });
        res.status(201).send({deletedtenant})
    } 
    catch(error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;