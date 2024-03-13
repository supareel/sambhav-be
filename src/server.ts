<<<<<<< Updated upstream
import express from "express";
import payload from "payload";
import { env } from "./env";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });
=======
import express from 'express';
import payload from 'payload';
import { CollectionConfig } from 'payload/types';

require('dotenv').config();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Define the collection configuration for faculties
const Faculties: CollectionConfig = {
  slug: 'faculty',
  fields: [
    // Define your fields for faculty collection here
    // For example:
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'department',
      type: 'text',
      required: true,
    },
  ],
};

// Endpoint to create new faculty document
app.post('/api/faculties', async (req, res) => {
  try {
    const { name, department } = req.body;

    // Create a new faculty document
    const createdFaculty = await createDocument({
      collection: 'faculty',
      data: {
        name,
        department,
      },
    });

    res.status(201).json(createdFaculty);
  } catch (error) {
    console.error('Error creating faculty document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const start = async () => {
  try {
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      collections: [Faculties], // Include the faculty collection configuration
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });
>>>>>>> Stashed changes

    // Add your own express routes here

<<<<<<< Updated upstream
  app.listen(env.PORT);
=======
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
>>>>>>> Stashed changes
};

start();
