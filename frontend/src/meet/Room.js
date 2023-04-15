import { useEffect } from 'react';
import { connect } from 'react-redux';
import MainScreen from './MainScreen';
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from '../redux/Action/actioncreator';
import db from '../server/firebase';
import firepadRef from '../server/firebase';

function Room(props) {
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  useEffect(() => {
    const connectedRef = db.database().ref('.info/connected');
    const participantRef = firepadRef.child('participants');
    const userName = 'Your username here';
    const defaultPreference = {
      audio: true,
      video: false,
      screen: false,
    };

    const setupUser = async () => {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;
      props.setMainStream(stream);
      const userStatusRef = participantRef.push({
        userName,
        preferences: defaultPreference,
      });
      props.setUser({
        [userStatusRef.key]: { name: userName, ...defaultPreference },
      });
      userStatusRef.onDisconnect().remove();
    };

    connectedRef.on('value', (snap) => {
      if (snap.val()) {
        setupUser();
      }
    });

    const isUserSet = !!props.user;
    const isStreamSet = !!props.stream;

    if (isStreamSet && isUserSet) {
      participantRef.on('child_added', (snap) => {
        const preferenceUpdateEvent = participantRef
          .child(snap.key)
          .child('preferences');
        preferenceUpdateEvent.on('child_changed', (preferenceSnap) => {
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        const { userName: name, preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      participantRef.on('child_removed', (snap) => {
        props.removeParticipant(snap.key);
      });
    }

    return () => {
      // cleanup function to remove the user on unmount
      participantRef.child(props.user && Object.keys(props.user)[0]).remove();
    };
  }, []);

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
