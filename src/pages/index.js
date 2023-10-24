import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../helper";

const IndexPage = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(`${BASE_URL}/api/items`, { name });
      setName("");
      loadItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdate = async (id, newName) => {
    try {
      await axios.put(`${BASE_URL}/api/items/${id}`, {
        name: newName,
      });
      loadItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/items/${id}`);
      loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
            <button
              onClick={() => {
                const newName = prompt("New name:", item.name);
                if (newName) {
                  handleUpdate(item._id, newName);
                }
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
