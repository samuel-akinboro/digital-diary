import React, {useState, useEffect} from 'react'
import "./components-styles/Note.css"
// import EditIcon from '@material-ui/icons/Edit';
// import StarRateIcon from '@material-ui/icons/StarRate';
import {connect} from 'react-redux'
import ReminderModal from './ReminderModal';
import {db} from '../Firebase/Firebase'
import DeleteIcon from '@material-ui/icons/Delete';

function ReminderNote({id, uid, dispatch, title, story, date, reminderDetails, time, realDate, favorite = false}) {
  const colorGenerator = () => {
    const colors = ["#FFC972", "#FF9B76", "#E4EE90", "#B692FD", "#00D4FE"];
    let randomIndex = Math.floor(Math.random() * 5);
    return colors[randomIndex];
  }

  const [isStarred, setIsStarred] = useState(favorite);
  const [showReminderModal, setShowReminderModal] = useState({show: false, message: "", time: "", pastReminder: []});
  const [pastReminder, setPastReminder] = useState([]);
  const [showModify, setShowModify] = useState(false);
  const [editTime, setEditTime] = useState(time);
  const [editDate, setEditDate] = useState(realDate);
  const [editMessage, setEditMessage] = useState(story);
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(()=>{
    // Timer algorithm
    if(reminderDetails?.time){
      // set alarm
      const hourMinute = reminderDetails.time.split(":");
      const dateSplit = reminderDetails.date.split("-");

      const alarm = (message, year, month, day, hour, min, sec) =>{
        let reminderDate = new Date(year, month - 1, day, hour, min, sec).getTime();
        let currentDate = new Date().getTime();
        let r = reminderDate - currentDate;
        let rs = new Date(r).getSeconds();
        let rm = new Date(r).getMinutes() * 60;
        let rh = (new Date(r).getHours() - 1) * 60 * 60;
        let rd = (new Date(r).getDate() - 1) * 24 * 3600;
        let rmonth = new Date(r).getMonth() * rd;
        let total = rs + rm + rh + rd + rmonth
        let ID = setInterval(alarm2, 1000);

        function alarm2() {
        if(total > 0){
        total--
        }else if(total === 0){
          setShowReminderModal({...showReminderModal, message, show: true, time: reminderDetails.time, date: reminderDetails.date})
          clearInterval(ID)
        }else{
          setPastReminder([...pastReminder, {message, time: reminderDetails?.time, date: reminderDetails?.date}])
          setShowReminderModal({...showReminderModal})
          clearInterval(ID)
        }
        }
        return r
        };

        alarm(story, dateSplit[0], dateSplit[1], dateSplit[2], hourMinute[0], hourMinute[1], 1)
    }
  }, []);

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowModify(true);
  }

  const submitRevision = () => {
    async function update(){
      await db.collection('users').doc(uid).collection("reminder").doc(id).update({
        date: editDate,
        time: editTime,
        message: editMessage
      })
    }
    update().then(()=> {
      setShowEditForm(false)
    })

    const hourMinute = editTime.split(":");
      const dateSplit = editDate.split("-");

      const alarm = (message, year, month, day, hour, min, sec) =>{
        let reminderDate = new Date(year, month - 1, day, hour, min, sec).getTime();
        let currentDate = new Date().getTime();
        let r = reminderDate - currentDate;
        let rs = new Date(r).getSeconds();
        let rm = new Date(r).getMinutes() * 60;
        let rh = (new Date(r).getHours() - 1) * 60 * 60;
        let rd = (new Date(r).getDate() - 1) * 24 * 3600;
        let rmonth = new Date(r).getMonth() * rd;
        let total = rs + rm + rh + rd + rmonth
        let ID = setInterval(alarm2, 1000);

        function alarm2() {
        if(total > 0){
        total--
        }else if(total === 0){
          setShowReminderModal({...showReminderModal, message, show: true, time: reminderDetails.time, date: reminderDetails.date})
          clearInterval(ID)
        }else{
          setPastReminder([...pastReminder, {message, time: reminderDetails?.time, date: reminderDetails?.date}])
          setShowReminderModal({...showReminderModal})
          clearInterval(ID)
        }
        }
        return r
        };

        alarm(editMessage, dateSplit[0], dateSplit[1], dateSplit[2], hourMinute[0], hourMinute[1], 1)
  }

  const remove = () => {
    db.collection('users').doc(uid).collection("reminder").doc(id).delete()
  }

  return (
    <>
      {showReminderModal.show &&
          <ReminderModal
            message={showReminderModal.message}
            time={showReminderModal.time}
            date={showReminderModal.date}
            pastReminder={pastReminder}
            handleClick={()=> {setShowReminderModal({show: false, message: "", time: "", pastReminder})}}
           />
        }

      <div className="note p-4 rounded-2xl transform lg-hover:scale-110 duration-200 overflow-hidden ease-out relative" style={{backgroundColor: colorGenerator(), position: "relative"}}>

        <h1 className="font-semibold mb-2">
          {title}
        </h1>
        {showModify && <p className="font-semibold font-sans bg-white h-8 w-32 shadow-md rounded-md pl-2 pt-1 z-30 right-2 absolute justify-center transform  cursor-pointer duration-150 ease-out hover:scale-105" onClick={()=> {
          setShowEditForm(true)
          setShowModify(false);
        }}>Modify</p>}
        <p>{story}
        </p>
        <div className="cover w-full h-full absolute inset-0 z-10" onClick={()=>  dispatch({
            type: "READ_STORY",
            title,
            story,
            show: true
          })} onContextMenu={handleRightClick}></div>
      <span className="edit z-20" onClick={remove}><DeleteIcon /></span>
      {/* <span className="favorite" onClick={()=> setIsStarred(!isStarred)}>
        <StarRateIcon style={{
          color: `${isStarred ? "#FFD100" : "#fff"}`
        }} />
      </span> */}
      {showEditForm && <div className="h-full w-full absolute bg-black inset-0 bg-opacity-30 z-30" onClick={()=> setShowEditForm(false)}></div>}
        {showEditForm && <input type="date" className="relative bottom-3 z-40" value={editDate} onChange={(e)=> setEditDate(e.target.value)} />}
        {showEditForm && <input type="time" className="relative bottom-2 z-40" value={editTime} onChange={(e)=> setEditTime(e.target.value)} />}
        {showEditForm && <textarea className='relative p-2 h-1/4 bottom-0 z-40' value={editMessage} onChange={(e)=> setEditMessage(e.target.value)}></textarea>}
      <div className="pt-2 flex justify-start font-semibold text-sm"> {date}</div>
          {showEditForm && <button className='relative bottom-0 bg-black text-white w-full py-2 rounded-md mx-auto z-40' onClick={submitRevision}>Set</button>}
      {showModify && <div className="w-full h-full absolute inset-0 z-20" onContextMenu={(e)=> e.preventDefault()} onClick={()=>  setShowModify(false)}></div>}
      </div>
    </>
  )
}

export default connect((state)=> ({...state}))(ReminderNote)
