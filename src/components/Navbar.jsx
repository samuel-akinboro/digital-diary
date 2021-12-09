import React, {useState} from 'react'
import "./components-styles/Navbar.css"
import {motion} from 'framer-motion'
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import NoteModalForm from './NoteModalForm';
import {Avatar} from '@material-ui/core'
import {connect} from 'react-redux'
import ReadStoryModal from './ReadStoryModal';

function Navbar({photoURL, readStory, dispatch}) {
  const [showNoteCategory, setShowNoteCategory] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState({show: false, category: "diary"});
  // const [showReadStoryModal, setShowReadStoryModal] = useState({show: true, title: "", story: ""});
  return (
    <nav>
      {showNoteModal.show &&
          <NoteModalForm category={showNoteModal.category} handleClick={()=> {setShowNoteModal({show: false, category: "diary"}); setShowNoteCategory(false)}} />
        }

      {readStory.show &&
          <ReadStoryModal title={readStory.title} story={readStory.story} />
        }

      <div className="nav__top">
        <div className="logo">
          <h1 className="font-sans text-lg lg-text-xl font-bold py-4 mt-2">Docket</h1>
        </div>
      </div>
      <div className="nav__bottom mt-8">
        <div className="add__button" onClick={()=> setShowNoteCategory(!showNoteCategory)}>
          <AddIcon />
        </div>

        {showNoteCategory &&
          <motion.ul
            className="shadow-2xl"
            animate={{scale: [1, 1.1, 1, 1.2, 1.1, 1]}}
          >
            <li className="active" onClick={()=> setShowNoteModal({show: true, category: "diary"})}>Diary</li>
            <li onClick={()=> setShowNoteModal({show: true, category: "reminder"})}>Reminder</li>
          </motion.ul>
        }

        <div className="link__buttons my-16">
          <Link to="/" className="add__button" style={{backgroundColor: "#00D4FF"}}>
            <HomeIcon />
          </Link>
          <Link to="/reminder" className="add__button" style={{backgroundColor: "#f9ca10"}}>
            <AccessAlarmIcon />
          </Link>
        </div>

        <div className="cursor-pointer relative group" onClick={()=>{
          dispatch({type: "SET_USER", userDetails:{
            displayName: "",
            email: "",
            phoneNumber: "",
            photoURL: "",
            uuid: "",
            diary: [],
            reminder: []
        }});
        }}>
          <Avatar src={photoURL} style={{
            margin: "0 auto"
          }} />
          <p className="bg-white shadow-md rounded-md pointer-events-none opacity-0 absolute -right-28 z-20 p-2 group-hover:opacity-100 duration-150 ease-in">click image to log out</p>
        </div>
      </div>
    </nav>
  )
}

export default connect(state => ({...state}))(Navbar)
