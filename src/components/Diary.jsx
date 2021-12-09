import React, {useState, useEffect} from 'react'
import './components-styles/Diary.css'
import SearchIcon from '@material-ui/icons/Search';
import Note from './Note';
import {connect} from 'react-redux';
import {db} from '../Firebase/Firebase'

function Diary({id, uid, dispatch}) {
  const [loggedInUserDiary, setLoggedInUserDiary] = useState([]);
  useEffect(()=>{
    const unSubscribe = db.collection("users").doc(uid).collection("diary").onSnapshot(snapshot => {
      setLoggedInUserDiary(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
    });

    return ()=> unSubscribe();
  }, []);

  console.log(loggedInUserDiary)
  return (
    <div className="main__container">
      <div className="search-box px-4 lg-px-8 py-4">
        <div className="search-bar flex items-center py-2 px-4 w-2/3">
          <SearchIcon />
          <input type="text" placeholder="search" className="p-2 ml-4 w-11/12"/>
        </div>
      </div>
      <div className="diary__notes">
        <h1 className="text-3xl lg-text-3xl xl-text-4xl font-bold ml-8">Diary</h1>
        {loggedInUserDiary.length === 0 && <p className="bg-yellow-200 text-yellow-700 text-sm w-40 h-40 lg-w-64 mx-auto p-2 my-16 text-center lg-h-64 flex items-center justify-center shadow-lg font-semibold lg-text-lg">Create a new note</p>}
        <div className="notes__container p-8">
          {loggedInUserDiary.map(({id, title, story, date}) => <Note key={id} id={id} title={title} story={story} date={date} />)}
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({...state}))(Diary)
