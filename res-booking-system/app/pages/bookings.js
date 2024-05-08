// pages/bookings.js

import { useState } from 'react';
import { Nav } from 'next/navigation'; // Importing Nav from next/navigation

export default function Bookings() {
  const [date, setDate] = useState('');
  const [waiterName, setWaiterName] = useState('');
  const [guestList, setGuestList] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would submit the form data to the server, probably via an API call
    // For brevity, I'm omitting that part
    // After successful submission, you can redirect the user to another page
    Nav.push('/confirmation'); // Using Nav from next/navigation instead of direct router import
  };

  return (
    <div>
      <h1>Bookings</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Waiter Name"
          value={waiterName}
          onChange={(e) => setWaiterName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Guest List"
          value={guestList}
          onChange={(e) => setGuestList(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
