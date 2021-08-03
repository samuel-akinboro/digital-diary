import React, {useState} from 'react'
import './components-styles/NoteModalForm.css'
import CloseIcon from '@material-ui/icons/Close';
import {motion} from 'framer-motion'

function NoteModalForm({category, handleClick}) {
  const [formDetails, setFormDetails] = useState({
    diary: {title: "", story: ""},
    reminder: {
      date: "",
      time: "",
      message: ""
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    if(e.target.id === "diary"){
      console.log(formDetails.diary)
    }else{
      console.log(formDetails.reminder)
    }
  }

  return (
    <div className="note__modal">
      <motion.div className="note__modal__container rounded-lg" animate={{scale: [1, 1.4, 1, 1.2, 1]}}>
        <CloseIcon style={{
          cursor: "pointer",
          marginBottom: "1em"
        }} onClick={handleClick} />
        <div className="box">
          {category === "diary" ? 
              <form onSubmit={handleSubmit} id="diary">
                <h1 className="text-xl font-bold">Today's Experience ✏✏</h1>
                <input type="text" placeholder="title" onChange={(e)=> setFormDetails({...formDetails, diary: {...formDetails.diary, title: e.target.value}})} />
                <textarea placeholder="document your experience" onChange={(e)=> setFormDetails({...formDetails, diary: {...formDetails.diary, story: e.target.value}})}></textarea>
                <button type="submit" className="w-full bg-green-500 mt-8 py-4 text-white rounded-full">Add today's experience</button>
              </form>
              :
              <form onSubmit={handleSubmit} id="reminder">
                <h1 className="text-xl font-bold">Today's Reminder ⏰⏰</h1>
                <input type="date" onChange={(e)=> setFormDetails({...formDetails, reminder: {...formDetails.reminder, date: e.target.value}})} />
                <input type="time" onChange={(e)=> setFormDetails({...formDetails, reminder: {...formDetails.reminder, time: e.target.value}})} />
                <textarea placeholder="message" onChange={(e)=> setFormDetails({...formDetails, reminder: {...formDetails.reminder, message: e.target.value}})}></textarea>
                <button type="submit" className="w-full bg-green-500 mt-8 py-4 text-white rounded-full">Set Reminder</button>
              </form>
          }
        </div>
      </motion.div>
    </div>
  )
}

export default NoteModalForm
