import React,{useState} from 'react'

export default function Textforms(props) {
  
  const HandleUpClick =()=>{
    console.log("You have clicked");
    let newText = text.toUpperCase();
    setText(newText);
  }

  const HandleUpClick2 =()=>{
    console.log("You have clicked");
    let newText = text.toLowerCase();
    setText(newText);
  }

   const handleOnChange =(event)=>{
    console.log("On change");
    setText(event.target.value);
  }

  const[text,setText]= useState('Enter the text')
  return (
    <>
    <div  className='container'>
<div className="mb-3">
    <h1>{props.heading}</h1>
    <textarea className="form-control" value ={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
</div>
    <button className='btn btn-primary mx-2' onClick={HandleUpClick}>Convert to Uppercase</button>
    <button className='btn btn-primary' onClick={HandleUpClick2}>Convert to Lowercase</button>
    </div>
    <div className='container my-3'>
     <h1>TEXT SUMMARY</h1>
    <p>{text.split(" ").length} words and {text.length} characters</p>
    <p>{0.008 * text.split(" ").length} Minutes to read </p>
    <h1>PREVIEW</h1>
    <p>{text}</p>
    </div>
    </>
  )
}
