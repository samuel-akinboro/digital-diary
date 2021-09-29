import React, {useState, useEffect} from 'react'
import "./components-styles/Note.css"
import EditIcon from '@material-ui/icons/Edit';
import StarRateIcon from '@material-ui/icons/StarRate';
import {connect} from 'react-redux'
import ReminderModal from './ReminderModal';

function ReminderNote({id, dispatch, title, story, date, reminderDetails, favorite = false}) {
  const colorGenerator = () => {
    const colors = ["#FFC972", "#FF9B76", "#E4EE90", "#B692FD", "#00D4FE"];
    let randomIndex = Math.floor(Math.random() * 5);
    return colors[randomIndex];
  }

  const [isStarred, setIsStarred] = useState(favorite);
  const [showReminderModal, setShowReminderModal] = useState({show: false, message: "", time: "", pastReminder: []});
  const [pastReminder, setPastReminder] = useState([]);
  const [showModify, setShowModify] = useState(false)

  useEffect(()=>{
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

      <div className="note p-4 rounded-2xl transform hover:scale-110 duration-200 ease-out relative" style={{backgroundColor: colorGenerator(), position: "relative"}}>

        <h1 className="font-semibold mb-2">
          {title}
        </h1>
        {showModify && <p className="font-semibold font-sans bg-white h-8 w-32 shadow-md rounded-md pl-2 pt-1 z-10 right-2 absolute justify-center transform  cursor-pointer duration-150 ease-out hover:scale-105">Modify</p>}
        <p>{story}
        </p>
      <span className="edit"><EditIcon /></span> 
      <span className="favorite" onClick={()=> setIsStarred(!isStarred)}>
        <StarRateIcon style={{
          color: `${isStarred ? "#FFD100" : "#fff"}`
        }} />
      </span>
      <div className="pt-2 flex justify-start font-semibold text-sm"> {date}</div>
      <div className="w-full h-full absolute inset-0 z-10" onClick={()=>  dispatch({
            type: "READ_STORY",
            title,
            story,
            show: true
          })} onContextMenu={handleRightClick}></div>
      {showModify && <div className="w-full h-full absolute inset-0 z-20" onClick={()=>  setShowModify(false)}></div>}
      </div>
    </>
  )
}

export default connect((state)=> ({...state}))(ReminderNote)
