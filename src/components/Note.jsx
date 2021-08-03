import React, {useState} from 'react'
import "./components-styles/Note.css"
import EditIcon from '@material-ui/icons/Edit';
import StarRateIcon from '@material-ui/icons/StarRate';

function Note({title, story, favorite = false}) {
  const colorGenerator = () => {
    const colors = ["#FFC972", "#FF9B76", "#E4EE90", "#B692FD", "#00D4FE"];
    let randomIndex = Math.floor(Math.random() * 5);
    return colors[randomIndex];
  }

  const [isStarred, setIsStarred] = useState(favorite)

  return (
    <div className="note p-4 rounded-2xl" style={{backgroundColor: colorGenerator(), position: "relative"}}>
      <h1 className="font-semibold mb-2">
         The day i will never forget
      </h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt ex mollitia ipsum explicabo nam cumque repellendus, consectetur itaque ducimus, culpa dolore dicta aliquam odit, impedit nobis quam officia veritatis vel?</p>
     <span className="edit"><EditIcon /></span> 
     <span className="favorite" onClick={()=> setIsStarred(!isStarred)}>
       <StarRateIcon style={{
         color: `${isStarred ? "#FFD100" : "#fff"}`
       }} />
     </span>
    </div>
  )
}

export default Note
