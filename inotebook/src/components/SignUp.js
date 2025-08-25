import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  let navigate = useNavigate();
    const handleSubmit = async (e) => {
        const {name,email,password}= credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name ,email,password})
        });
        const json = await response.json();
        console.log(json);
           if (json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully","success")
        }else{
            props.showAlert("Invalid credentials","danger")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "" })
  return (
    <div className='container'>
      <h1>Sign Up Here !</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Name</label>
          <input type="text" name='name' className="form-control" id="name"  onChange={onChange} aria-describedby="emailHelp" placeholder="Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control"  name='email'  onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password"  name='password' onChange={onChange} className="form-control" id="password" placeholder="Password"/>
        </div>
        <div className="form-group">
          <label htmlFor="cpassword"> Confirm Password</label>
          <input type="password" name='cpassword' onChange={onChange} className="form-control" id="cpassword" placeholder="Confirm Password"/>
        </div>
       
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
