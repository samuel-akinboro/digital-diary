import React, {useState} from 'react'
import './components-styles/NoteModalForm.css'
import CloseIcon from '@material-ui/icons/Close';
import {motion} from 'framer-motion'
import {connect} from 'react-redux'
import {db} from '../Firebase/Firebase'

function NoteModalForm({category, handleClick, id, uid}) {
  const [formDetails, setFormDetails] = useState({
    diary: {title: "", story: ""},
    reminder: {
      date: "",
      time: "",
      message: ""
    }
  });

  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(e.target.id === "diary"){
      if(!formDetails.diary.title || !formDetails.diary.story){
          setError(true)
          setTimeout(()=>{
            setError(false)
          }, 2000)
      }else{
        db.collection('users').doc(uid).collection("diary").add({
          ...formDetails.diary,
          date: new Date().toUTCString()
        })
        setSent(true)
         setTimeout(()=>{
           setSent(false)
         }, 1500)
      }
      // adding a story to your diary
      
    }else{
      console.log(formDetails.reminder)
       if(!formDetails.reminder.date || !formDetails.reminder.time || !formDetails.reminder.message){
        setError(true)
        setTimeout(()=>{
          setError(false)
        }, 2000)
       }else{
         db.collection('users').doc(uid).collection("reminder").add({...formDetails.reminder})
         setSent(true)
         setTimeout(()=>{
           setSent(false)
         }, 1500)
       }
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
              <form onSubmit={handleSubmit} id="diary" className="relative">
                {error && <p className="text-red-700 bg-red-200 py-2 mb-4 rounded-md">Title and Story can't be empty</p>}
                {sent && <p className="bg-yellow-100 text-yellow-700 p-4 py-16 left-4 absolute top-40">New story has been added 🎇</p>}
                <h1 className="text-xl font-bold">Today's Experience ✏✏</h1>
                <input type="text" placeholder="title" onChange={(e)=> setFormDetails({...formDetails, diary: {...formDetails.diary, title: e.target.value}})} />
                <textarea placeholder="document your experience" onChange={(e)=> setFormDetails({...formDetails, diary: {...formDetails.diary, story: e.target.value}})}></textarea>
                <button type="submit" className="w-full bg-green-500 mt-8 py-4 text-white rounded-full">Add today's experience</button>
              </form>
              :
              <form onSubmit={handleSubmit} id="reminder" className="relative">
                {error && <p className="text-red-700 bg-red-200 py-2 mb-4 rounded-md">Please select a time and date with a message</p>}
                {sent && <p className="bg-yellow-100 text-yellow-700 p-4 py-16 left-4 absolute top-40">Your schedule has been added 🎇</p>}
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

export default connect(state => ({...state}))(NoteModalForm)
