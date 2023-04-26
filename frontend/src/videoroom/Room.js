import { useState, useEffect } from "react";
import MainScreen from "../meet/MainScreen/MainScreen.component"
import firepadRef, { db} from "../server/firebase";
import "../App.css";
import { connect } from "react-redux";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "../redux/Action/useraction";
import { useSelector } from "react-redux";
function Room(props) {
  const user = useSelector((state) => state.Authreducer.user);
  const cuser = useSelector((state) => state.userreducer.currentUser);
  console.log("cuser"+cuser)

  console.log("u room"+user.firstname)
  const [Name, setName] = useState(user.firstname ?? '');
  const { setMainStream, addParticipant, setUser, removeParticipant, updateParticipant } = props;

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
      if (userStatusRef) {
        const defaultPreference = {
          audio: true,
          video: false,
          screen: false,
        };
        const participantRef = firepadRef.child('participants').push();
        participantRef.set({
          name: Name,
          preferences: defaultPreference,
        });
        userStatusRef.onDisconnect().remove();
      }
    };
    

    const handleConnectedRef = (snap) => {
      if (snap.val()) {
        getUserStream().then((stream) => {
          stream.getVideoTracks()[0].enabled = false;
          setMainStream(stream);
          const userStatusRef = participantRef.push({
            name: Name,
            uid: user.uid,
            preferences: {
              audio: true,
              video: false,
              screen: false,
            },
          });
          setupParticipant(userStatusRef);
          setUser(userStatusRef.key);
        });
      }
    };
    
    
    connectedRef.on('value', handleConnectedRef);

    return () => {
      connectedRef.off('value', handleConnectedRef);
    };
  }, [setMainStream, setUser, Name]); // added Name as a dependency


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
    currentUser: state.userreducer.currentUser,
  };
};


export default connect(mapStateToProps, {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
})(Room);

