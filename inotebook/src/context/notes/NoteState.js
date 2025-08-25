import React ,{ useState} from "react";
import  NoteContext from "./noteContext";

const NoteState =(props)=>{
   const host = "http://localhost:5000"
   const notesInitial = []

   const [notes,setNotes]= useState(notesInitial)

const getNotes= async ()=>{
   const response = await fetch(`${host}/api/notes/fetchNotes`,{
     method:'GET',
     headers:{
      'Content-Type':'application/json',
      'auth-token': localStorage.getItem('token')
     },
 });
  const json = await  response.json();
  console.log(json);
  setNotes(json)
}
const addNotes= async (title,description,tag)=>{
   const response = await fetch(`${host}/api/notes/addNotes`,{
     method:'POST',
     headers:{
      'Content-Type':'application/json',
      'auth-token':  localStorage.getItem('token')
     },
     body:JSON.stringify({title,description,tag})
 });
  const json = response.json();
  
  const newnotes={
    
    "_id": "6888eb5f2aacb597bccf97f9",
    "user": "688130dcf0979c25d12a9caf",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2025-07-29T15:40:15.348Z",
    "__v": 0
  };
  setNotes(notes.concat(newnotes))
}


const deleteNotes=async (id)=>{
 const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
     method:'DELETE',
     headers:{
      'Content-Type':'application/json',
      'auth-token': localStorage.getItem('token')
     },
 });
const json = await response.json();
  
const newnotes = notes.filter((note)=>{return note._id!==id})
setNotes(newnotes)
}

const editNotes= async(id,title,description,tag)=>{
 const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
     method:'PUT',
     headers:{
      'Content-Type':'application/json',
      'auth-token': localStorage.getItem('token')
     },
     body:JSON.stringify({title,description,tag})
 });
  const json = await response.json();
 
 let newNotes = JSON.parse(JSON.stringify(notes))
 for (let index = 0; index < notes.length; index++) {
  const element = newNotes[index];
  if(element._id===id){
    newNotes[index].title = title;
    newNotes[index].description = description;
    newNotes[index].tag = tag;
    break;
  }
 }
 setNotes(newNotes)
}

    return(
        <NoteContext.Provider value={{notes,addNotes,deleteNotes,editNotes,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState