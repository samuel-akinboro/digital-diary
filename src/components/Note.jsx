import React, {useState, useEffect} from 'react'
import "./components-styles/Note.css"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
// import ReminderModal from './ReminderModal';
import {db} from '../Firebase/Firebase'

function Note({id, uid, dispatch, title, story, date, favorite = false}) {
  const colorGenerator = () => {
    const colors = ["#FFC972", "#FF9B76", "#E4EE90", "#B692FD", "#00D4FE"];
    let randomIndex = Math.floor(Math.random() * 5);
    return colors[randomIndex];
  }

  const [isStarred, setIsStarred] = useState(favorite);
  const [editTitle, setEditTitle] = useState(title);
  const [editStory, setEditStory] = useState(story);
  const [showEditForm, setShowEditForm] = useState(false)

  // submit the editted version of the note
  const submitRevision = () => {
    async function update(){
      await db.collection('users').doc(uid).collection("diary").doc(id).update({
        title: editTitle,
        story: editStory
      })
    }

    update().then(setShowEditForm(false))
  }

  const remove = () => {
    db.collection('users').doc(uid).collection("diary").doc(id).delete()
  }

  return (
    <>
      <div className="note p-4 rounded-2xl transform hover:scale-110 duration-200 ease-out relative" style={{backgroundColor: colorGenerator()}}>
        <h1 className="font-semibold mb-2">{title}</h1>
        <p>{story}</p>
        <div className="cover w-full h-full absolute inset-0 z-10" onClick={()=>  dispatch({
            type: "READ_STORY",
            title,
            story,
            show: true
          })}></div>
        <span className="favorite" style={{zIndex: 11}} onClick={()=> setShowEditForm(true)}><EditIcon /></span> 
        <span className="edit z-20" onClick={remove}><DeleteIcon /></span>
        {showEditForm && <input type="text" className="relative bottom-4 z-20 p-2 font-semibold" value={editTitle} onChange={(e)=> setEditTitle(e.target.value)} />}
        {showEditForm && <textarea className='relative z-20 bottom-2 p-2 h-5/6' value={editStory} onChange={(e)=> setEditStory(e.target.value)} resize="false"></textarea>}
        <div className="pt-2 flex justify-start font-semibold text-sm"> {date}</div>
        {showEditForm && <button className='relative bottom-0 bg-black text-white w-full py-2 rounded-md mx-auto z-20' onClick={submitRevision}>Submit</button>}
      </div>
    </>
  )
}

export default connect((state)=> ({...state}))(Note)
