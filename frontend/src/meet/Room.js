import { useState, useEffect } from "react";
import MainScreen from "../meet/MainScreen/MainScreen.component";
import firepadRef, { db} from "../server/firebase";
import "../App.css";
import { connect, useDispatch } from "react-redux";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "../redux/Action/useraction";
import { useSelector } from "react-redux";
import { get_current } from "../redux/Action/authAction";
function Room(props) {
console.log("uuu"+props.u)
  const { setMainStream, addParticipant, setUser, removeParticipant, updateParticipant } = props;
  const userName = 'John Doe';
  const connectedRef = db.database().ref('.info/connected');
  const participantRef = firepadRef.child('participants');

  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };

  useEffect(() => {
    const setupParticipant = (userStatusRef) => {
      const defaultPreference = {
        audio: true,
        video: false,
        screen: false,
      };
      setUser({
        [userStatusRef.key]: { name: userName, ...defaultPreference },
      });
      userStatusRef.onDisconnect().remove();
    };

    const handleConnectedRef = (snap) => {
      if (snap.val()) {
        getUserStream().then((stream) => {
          stream.getVideoTracks()[0].enabled = false;
          setMainStream(stream);
          const userStatusRef = participantRef.push({
            userName,
            preferences: {
              audio: true,
              video: false,
              screen: false,
            },
          });
          setupParticipant(userStatusRef);
        });
      }
    };

    connectedRef.on('value', handleConnectedRef);

    return () => {
      connectedRef.off('value', handleConnectedRef);
    };
  }, [setMainStream, setUser]);

  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;

  useEffect(() => {
    const handleChildAdded = (snap) => {
      const preferenceUpdateEvent = participantRef.child(snap.key).child('preferences');
      preferenceUpdateEvent.on('child_changed', (preferenceSnap) => {
        updateParticipant({
          [snap.key]: {
            [preferenceSnap.key]: preferenceSnap.val(),
          },
        });
      });
      const { userName: name, preferences = {} } = snap.val();
      addParticipant({
        [snap.key]: {
          name,
          ...preferences,
        },
      });
    };

    const handleChildRemoved = (snap) => {
      removeParticipant(snap.key);
    };

    if (isStreamSet && isUserSet) {
      participantRef.on('child_added', handleChildAdded);
      participantRef.on('child_removed', handleChildRemoved);
    }

    return () => {
      if (isStreamSet && isUserSet) {
        participantRef.off('child_added', handleChildAdded);
        participantRef.off('child_removed', handleChildRemoved);
      }
    };
  }, [isStreamSet, isUserSet, addParticipant, removeParticipant, updateParticipant]);

  return (
    <div className="Room">
      <MainScreen />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
  };
};

export default connect(mapStateToProps, {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
})(Room);


