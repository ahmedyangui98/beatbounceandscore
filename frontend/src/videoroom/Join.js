import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import firepadRef from '../server/firebase';

export default function Join() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("id");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  let newRoomId;
  let newFirepadRef = firepadRef; // Declare a new variable to reassign later
  if (roomId) {
    newRoomId = roomId;
  } else {
    newFirepadRef = firepadRef.push(); // Reassign the variable
    window.history.replaceState(null, "Meet", "?id=" + newFirepadRef.key);
    newRoomId = newFirepadRef.key; // Use the new variable for the room ID
  }

  return (
    <div>
      <Link to={`/room${newRoomId}`}>
        <Button variant="join">join</Button>
      </Link>
    </div>
  );
}


