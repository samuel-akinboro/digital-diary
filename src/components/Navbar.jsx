import React, {useState} from 'react'
import "./components-styles/Navbar.css"
import {motion} from 'framer-motion'
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import NoteModalForm from './NoteModalForm';
import ReminderModal from './ReminderModal';

function Navbar() {
  const [showNoteCategory, setShowNoteCategory] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState({show: false, category: "diary"});
  const [showReminderModal, setShowReminderModal] = useState({show: true, message: "", time: ""});
  return (
    <nav>
      {showNoteModal.show &&
          <NoteModalForm category={showNoteModal.category} handleClick={()=> {setShowNoteModal({show: false, category: "diary"}); setShowNoteCategory(false)}} />
        }

      {showReminderModal.show &&
          <ReminderModal handleClick={()=> {setShowReminderModal({show: false, message: "", time: ""}); setShowNoteCategory(false)}} />
        }

      <div className="nav__top">
        <div className="logo">
          <h1 className="font-sans text-xl font-bold py-4 mt-2">Docket</h1>
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
      </div>
    </nav>
  )
}

export default Navbar
