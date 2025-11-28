const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Item = require('../models/Item');  // Import Item model

// GET: Fetch all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching projects', details: error.message });
    }
});

// POST: Create a new project
router.post('/add', async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    try {
        const newProject = new Project({ name, description });
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        res.status(400).json({ error: 'Error creating project', details: error.message });
    }
});

// DELETE: Delete a project by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully', project: deletedProject });
    } catch (error) {
        res.status(500).json({ error: 'Server error while deleting project', details: error.message });
    }
});

// GET: Fetch a single project by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching the project', details: error.message });
    }
});

// PUT: Update a project by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(400).json({ error: 'Error updating project', details: error.message });
    }
});

// POST: Add a new item to the database
router.post('/add-item', async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    try {
        const newItem = new Item({ name, price });
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(400).json({ error: 'Error adding item', details: error.message });
    }
});

module.exports = router;