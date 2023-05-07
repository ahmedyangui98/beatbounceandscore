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
function Room(props) {  //const [userName, setUserName] = useState('');

/*
useEffect(() => {
  setUserName(props.userName);
}, [props.userName]);*/
  //console.log(userName)
 const participants=useSelector((state)=>state.userMeetReducer.participants)
 console.log("participant"+JSON.stringify(participants))
 const userName = useSelector((state) => state.Authreducer.user.firstname);
   const cu= useSelector((state) => state.userMeetReducer.mainStream);
 const participantRef = firepadRef.child('participants');
    console.log("pr"+participantRef)

    // change on pc 
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: false,
    });

    return localStream;
  };

  useEffect(() => {
    const connectedRef = db.database().ref('.info/connected');
    const participantRef = firepadRef.child('participants');

    const getUserMediaAndSetMainStream = async () => {
      const stream = await getUserStream();
      stream.getVideoTracks()[0].enabled = false;
      props.setMainStream(stream);
      props.setUser(userName)
    };

    getUserMediaAndSetMainStream();

    connectedRef.on('value', (snap) => {
      if (snap.val()) {
        const defaultPreference = {
          audio: false,
          video: false,
          screen: false,
        };
        const userStatusRef = participantRef.push({
          userName: props.userName,
          preferences: defaultPreference,
        });
        props.setUser({
          [userStatusRef.key]: { name: props.userName, ...defaultPreference },
        });
        userStatusRef.onDisconnect().remove();
      }
    });
    

    return () => {
      connectedRef.off();
      participantRef.off();
    };
  }, []);

  useEffect(() => {
    const participantRef = firepadRef.child('participants');
    console.log("pr"+participantRef)

    const isUserSet = !!props.user;
    const isStreamSet = !!props.stream;

    if (isStreamSet && isUserSet) {
      const handleParticipantAdded = (snap) => {
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
        const { userName: name,preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      };
      participantRef.on('child_added', handleParticipantAdded);

      const handleParticipantRemoved = (snap) => {
        props.removeParticipant(snap.key);
      };
      participantRef.on('child_removed', handleParticipantRemoved);

      return () => {
        participantRef.off('child_added', handleParticipantAdded);
        participantRef.off('child_removed', handleParticipantRemoved);
      };
    }
  }, [props.stream, props.user]);

  return (
    <div className="Room">
      <MainScreen />
    </div>
  );
}

const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

const mapStateToProps = (state) => {
  
  var urlParams = new URLSearchParams(window.location.search);
  var roomId = urlParams.get("id");
  var obj ={"name":state.Authreducer.user.firstname,"audio":false,"screen":false,"video":false,"currentUser":true,"avatarColor":generateColor()}
  var obj2 ={"name":state.Authreducer.user.firstname,"audio":false,"screen":false,"video":false,"avatarColor":generateColor()}
  return {
    participants: {...state.userMeetReducer.participants.push(
      {[roomId]:obj}
      )}
    ,
    stream: state.userMeetReducer.mainStream,
    currentUser:       
    `{${roomId}:${obj2}}`
    ,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};
export default connect(
  mapStateToProps, 
  mapDispatchToProps)(Room);
