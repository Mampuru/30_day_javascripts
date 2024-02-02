import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';

const App = () => {
  const [people, setPeople] = useState([]);
  const [treeData, setTreeData] = useState({});

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/people');
      setPeople(response.data);

      const formattedData = formatTreeData(response.data);
      setTreeData(formattedData);
    } catch (error) {
      console.error('Error fetching people', error);
    }
  };

  const formatTreeData = (people) => {
    const formattedData = { name: 'Family Tree', children: [] };

    people.forEach((person) => {
      const newNode = { name: person.name, attributes: { id: person._id } };

      if (!person.parentId) {
        formattedData.children.push(newNode);
      } else {
        const parentNode = findNodeById(formattedData, person.parentId);
        if (parentNode) {
          parentNode.children = parentNode.children || [];
          parentNode.children.push(newNode);
        }
      }
    });

    return formattedData;
  };

  const findNodeById = (node, id) => {
    if (node.attributes && node.attributes.id === id) {
      return node;
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const foundNode = findNodeById(node.children[i], id);
        if (foundNode) {
          return foundNode;
        }
      }
    }

    return null;
  };

  const handleAddPerson = async () => {
    const name = prompt('Enter the name of the new person:');
    if (name) {
      const parentId = prompt('Enter the ID of the parent (leave empty for root):');
      const newPerson = { name, parentId: parentId || null };

      try {
        await axios.post('http://localhost:5000/api/people', newPerson);
        fetchPeople();
      } catch (error) {
        console.error('Error adding person', error);
      }
    }
  };

  const handleDeletePerson = async () => {
    const personId = prompt('Enter the ID of the person to delete:');
    if (personId) {
      try {
        await axios.delete(`http://localhost:5000/api/people/${personId}`);
        fetchPeople();
      } catch (error) {
        console.error('Error deleting person', error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleAddPerson}>Add Person</button>
      <button onClick={handleDeletePerson}>Delete Person</button>
      <Tree data={treeData} />
    </div>
  );
};

export default App;
