// import React, { useState, useEffect } from 'react';
// import Tree from 'react-d3-tree';
// import axios from 'axios';

const BASEURL = 'http://localhost:3001/api/people';

// const App = () => {
//   const [people, setPeople] = useState([]);
//   const [treeData, setTreeData] = useState({});

//   useEffect(() => {
//     fetchPeople();
//   }, []);

//   const fetchPeople = async () => {
//     try {
//       const response = await axios.get(BASEURL);
//       setPeople(response.data);

//       const formattedData = formatTreeData(response.data);
//       setTreeData(formattedData);
//     } catch (error) {
//       console.error('Error fetching people', error);
//     }
//   };

//   const formatTreeData = (people) => {
//     const formattedData = { name: 'Family Tree', children: [] };

//     people.forEach((person) => {
//       const newNode = { name: person.name, attributes: { id: person._id } };

//       if (!person.parentId) {
//         formattedData.children.push(newNode);
//       } else {
//         const parentNode = findNodeById(formattedData, person.parentId);
//         if (parentNode) {
//           parentNode.children = parentNode.children || [];
//           parentNode.children.push(newNode);
//         }
//       }
//     });

//     return formattedData;
//   };

//   const findNodeById = (node, id) => {
//     if (node.attributes && node.attributes.id === id) {
//       return node;
//     }

//     if (node.children) {
//       for (let i = 0; i < node.children.length; i++) {
//         const foundNode = findNodeById(node.children[i], id);
//         if (foundNode) {
//           return foundNode;
//         }
//       }
//     }

//     return null;
//   };

//   const handleAddPerson = async () => {
//     const name = prompt('Enter the name of the new person:');
//     if (name) {
//       const parentId = prompt('Enter the ID of the parent (leave empty for root):');
//       const newPerson = { name, parentId: parentId || null };

//       try {
//         await axios.post(BASEURL, newPerson);
//         fetchPeople();
//       } catch (error) {
//         console.error('Error adding person', error);
//       }
//     }
//   };

//   const handleDeletePerson = async () => {
//     const personId = prompt('Enter the ID of the person to delete:');
//     if (personId) {
//       try {
//         await axios.delete(`${BASEURL}/${personId}`);
//         fetchPeople();
//       } catch (error) {
//         console.error('Error deleting person', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleAddPerson}>Add Person</button>
//       <button onClick={handleDeletePerson}>Delete Person</button>
//       <Tree data={treeData} />
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrgChart from 'react-org-chart';
import './App.css';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [selectedParent, setSelectedParent] = useState('');

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    const response = await axios.get('http://localhost:3001/api/people');
    setPeople(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/people/${id}`);
    fetchPeople();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPerson = {
      name: newPersonName,
      parent: selectedParent || null,
    };
    await axios.post('http://localhost:3001/api/people', newPerson);
    fetchPeople();
    setNewPersonName('');
    setSelectedParent('');
  };

  const data = {
    name: 'Family Tree',
    children: people.map((person) => ({
      name: person.name,
      children: [],
    })),
  };

  return (
    <div className="App">
      <h1>Family Tree App</h1>
      <div className="OrgChart">
        <OrgChart tree={data} />
      </div>
      <h2>Add New Person</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
          />
        </label>
        <label>
          Parent:
          <select
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
          >
            <option value="">None</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add</button>
      </form>
      <h2>People</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.name}{' '}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
