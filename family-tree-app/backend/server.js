const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/family-tree', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  parentId: mongoose.Schema.Types.ObjectId,
});

const Person = mongoose.model('Person', personSchema);

app.post('/api/people', async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const person = new Person({ name, parentId });
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/people/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    await Person.deleteOne({ _id: personId });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
