import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
        const context = useContext(noteContext);
        const { notes,updatenotes } = props;
        const { deleteNotes } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        <p className="card-text">{notes.description}</p>
                        <i className="fa fa-trash-o mx-2" onClick={()=>{deleteNotes(notes._id); 
                            props.showAlert("Note Deleted successfull","success");
                         }}></i>
                        <i className="fa fa-edit" onClick={()=>{updatenotes(notes)}}></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
