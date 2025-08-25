import React, { useContext, useEffect, useRef , useState} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNotes } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
    }
    else{
      navigate("/Login")
    }
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)

  const updatenotes = (currNote) => {
    ref.current.click()
    setNotes({id:currNote._id,etitle:currNote.title,edescription:currNote.description,etag:currNote.tag})
  }
   const handleClick=(e)=>{
       console.log("Updated note ",note)
       editNotes(note.id,note.etitle,note.edescription,note.etag)
       props.showAlert("Notes Updated Succesfully !","success")
       refClose.current.click();
    }
    const onChange=(e)=>{
            setNotes({...note,[e.target.name]:e.target.value})
    }
  const [note,setNotes]=useState({id:"",etitle:"",edescription:"",etag:""})
  
  return (
    <>
      <AddNotes showAlert={props.showAlert}/>

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>

            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="etitle" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="eemailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  onClick={handleClick} className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h1>Your Notes</h1>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} showAlert={props.showAlert} updatenotes={updatenotes} notes={notes} />
        })}
      </div>
    </>
  )
}

export default Notes
