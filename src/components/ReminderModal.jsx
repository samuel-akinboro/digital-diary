import React from 'react'
import './components-styles/ReminderModal.css'
import CloseIcon from '@material-ui/icons/Close';
import {motion} from 'framer-motion'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import alarmAudio from '../assets/audio/mild_alarm.mp3'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

function ReminderModal({handleClick, message, time, date, pastReminder}) {

  return (
    <div className="reminder__modal">
      <motion.div className="reminder__modal__container rounded-lg text-center" animate={{scale: [1, 1.4, 1, 1.2, 1]}}>
        <CloseIcon style={{
          cursor: "pointer",
          marginBottom: "1em"
        }} onClick={handleClick} />
        <div className="box">
          <h1 className="text-center">Reminder !!!</h1>
          <motion.div
            animate={{rotate: ["30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg", "30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg", "30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg", "30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg","30deg", "33deg", "30deg", "-33deg", "0deg"]}}
            transition={{ repeat: Infinity, repeatDelay: 0.8, duration: 3.5 }}
            className="text-center"
          >
            <AccessAlarmIcon />
          </motion.div>
          <p className="bg-yellow-200 py-4 mt-4 text-center">
            <span className="mr-2">
              {time}
            </span>
            <span>
              {date}
            </span>
            </p>
          <p className="mt-4">
            {message}
          </p>
        </div>
        <div className="others">
          <h2 className="mt-2 text-xl font-bold mb-4">Past Reminders</h2>
          {pastReminder.map(single => (<p className="bg-red-200 py-4 rounded-lg relative mb-2 text-lg pl-2">
            {single.message} <span className="text-xs font-bold">{`${single.date} ${single.time}`}</span>
            <IndeterminateCheckBoxIcon />
          </p>))}
        </div>
        <audio autoPlay={true} loop>
          <source src={alarmAudio}></source>
        </audio>
      </motion.div>
    </div>
  )
}

export default ReminderModal
