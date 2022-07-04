import React from 'react';
import {useState} from  'react' ; 
import { FormGroup, Label, Input, Form } from 'reactstrap';
import autisme from "./../../assets/images/autisme.png";
import fond from "./../../assets/images/fond.png";



import Axios from 'axios';
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username,setUsername]=useState("") ; 
    const [password,setPassword]=useState("") ; 
    const navigate = useNavigate();

    
  
  
    const login = () => {
      return Axios.post('auth/login' ,{
        username : username ,
        password: password,
      }).then((response)=> {
        console.log(response.data.user);
        localStorage.setItem("accesstoken",response.data.user.access);
        localStorage.setItem("refreshtoken",response.data.user.refresh);
        navigate("/Pages")
        window.location.reload();
        
    
    
      }).catch((error) => {
      console.error(error)
      })
     }
    
    return (
      <div>
      <div className='Imgs'>
        <center><img className={classes.logo} src={autisme} alt="autisme" height="20%" width='7%'></img></center>
       <center> <img src={fond} alt="fond" height="50%" width='50%' ></img> </center>
       </div>
        <div className={classes.screen}><h4 style={{color : "#566588"}}> <center> Identifiez-vous pour continuer </center> </h4>  
       <center>
        <Form>
          
  <FormGroup   className={classes.username} >
  <Label for="exampleUn">
  </Label>
  <Input 
  onChange={(e)=>setUsername(e.target.value)}
  className={classes.userName}
    id="exampleun"
    name="username"
    placeholder="username"
    type="text"
    size ="50"
    style={{marginBottom : "1em"}}
  />
  </FormGroup>
  <FormGroup className={classes.passe} >
  <Label for="examplePasse" >
  </Label>
  <Input 
  onChange={(e)=>setPassword(e.target.value)}
  className={classes.Passe}
    id="examplePasse"
    name="Password"
    placeholder="Password"
    type="text"
    size ="50"
  />
  </FormGroup> 
  </Form>
  </center>
  <p><center> Se souvenir de moi </center></p>
  <center><button onClick={login} className={classes.log}> Login </button></center>
  <p><center>Mot de passe oublié ?</center></p>
  </div>
  </div>
    );
  }

export default Login;

