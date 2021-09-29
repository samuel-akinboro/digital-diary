import React, {useState, useEffect} from 'react'
import './components-styles/Diary.css'
import SearchIcon from '@material-ui/icons/Search';
import ReminderNote from './ReminderNote'
import {db} from '../Firebase/Firebase'
import {connect} from 'react-redux'
import ReminderModal from './ReminderModal';

function Reminder({uid}) {
  const [userReminder, setUserReminder] = useState([]);
  useEffect(()=>{
    db.collection("users").doc(uid).collection("reminder").onSnapshot(snapshot => {
      setUserReminder(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
    })
  }, [])

  return (
    <div className="main__container">
      <div className="search-box px-8 py-4">
        <div className="search-bar py-2 px-4 w-2/3">
          <SearchIcon />
          <input type="text" placeholder="search" className="p-2 ml-4 w-11/12"/>
        </div>
      </div>
      <div className="diary__notes">
        <h1 className="text-4xl font-bold ml-8 mt-4">My Reminder</h1>
        <div className="notes__container p-8">
          {userReminder.map(({id, message, date, time}) => <ReminderNote key={id} id={id} title="Reminder!!!" story={message} date={`${time} ${date}`} reminderDetails={({time, date})} />)}
        </div>
      </div>
    </div>
  )
}

export default connect((state)=> ({...state}))(Reminder)
