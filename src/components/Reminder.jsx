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
      <div className="search-box px-4 lg-px-8 py-4">
        <div className="search-bar flex items-center py-2 px-4 w-2/3">
          <SearchIcon />
          <input type="text" placeholder="search" className="p-2 ml-4 w-11/12"/>
        </div>
      </div>
      <div className="diary__notes">
        <h1 className="text-3xl lg-text-3xl xl-text-4xl font-bold ml-8">My Reminder</h1>
        <p className="ml-8 mt-2">(Right click on any card to make changes)</p>
        <div className="notes__container p-8">
          {userReminder.map(({id, message, date, time}) => <ReminderNote key={id} id={id} title="Reminder!!!" story={message} date={`${time} ${date}`} time={time} realDate={date} reminderDetails={({time, date})} />)}
        </div>
      </div>
    </div>
  )
}

export default connect((state)=> ({...state}))(Reminder)
