import React from 'react'
import './components-styles/Diary.css'
import SearchIcon from '@material-ui/icons/Search';
import Note from './Note'

function Reminder() {
  return (
    <div className="main__container">
      <div className="search-box px-8 py-4">
        <div className="search-bar py-2 px-4 w-2/3">
          <SearchIcon />
          <input type="text" placeholder="search" className="p-2 ml-4 w-11/12"/>
        </div>
      </div>
      <div className="diary__notes">
        <h1 className="text-4xl font-bold ml-8 mt-4">My Reminder</h1>
        <div className="notes__container p-8">
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
      </div>
    </div>
  )
}

export default Reminder
