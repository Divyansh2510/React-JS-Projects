import React, { useState , useContext}  from 'react'
import noteContext from '../context/notes/noteContext';


const AddNotes = (props) => {
    const context = useContext(noteContext);
    const {addNotes}=context;
    const [notes,setNotes]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
       e.preventDefault();
       addNotes(notes.title,notes.description,notes.tag)
       setNotes({title:"",description:"",tag:""})
       props.showAlert("Note added ","success")
    }
    const onChange=(e)=>{
            setNotes({...notes,[e.target.name]:e.target.value})
    }
  return (
    
      <div className='container my-3'>
        <h1>Add Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="title" className="form-control" id="title" value={notes.title} name="title" aria-describedby="emailHelp" onChange={onChange}  />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={notes.description}  onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" value={notes.tag}  name="tag" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
    
  )
}

export default AddNotes
