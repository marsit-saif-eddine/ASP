import React, { useState } from "react";
import classes from "./Utilisateur.module.css";
import stylo from "./../../assets/images/stylo.png";
import supp from "./../../assets/images/supp.png";
import { FormGroup, Label, Input, Form } from "reactstrap";
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from "reactstrap";
import Axios from "axios" ; 
import validator from 'validator' 

const accessToken = localStorage.getItem("accesstoken");

const UserItem = (props) => {
const Userdel = (email) => {
  return Axios.delete('auth/delete',{
     headers: {
       
       Authorization : `Bearer ${accessToken}`
       
     }
     , data:{email: email}
   })
   .then((res) => {
     console.log(res.data.users)
     setnewlist(email)
     
   })
   .catch((error) => {
     console.error(error)
   })
   
   }
   const [email,setEmail]=useState("") ; 
   
   const [username,setUsername]=useState("") ; 
   
   
   
const Usermodif = () => {
  if (!validator.isEmail(email)) {
   
    setemailerror(true)
  
}
else if(!validator.isAlpha(username)){
  setusernameerror(true)
  setemailerror(false)
}
else{
  
  setemailerror(false)
  setusernameerror(false)
  
  return Axios.put('user/edit_profile' ,{new_email: email , new_username : username},{
    headers: {
       
      Authorization : `Bearer ${accessToken}`
      
    },
    
  }).then((response)=> {
    console.log(response.data.user);
    
  }).catch((error) => {
  console.error(error)
  })
 }
} 
    const [modal, setModal] = useState(false);
    const{data, setnewlist}=props
    const button2 = () => {
      setModal(!modal);
    };
    const [erroremail, setemailerror] = useState(false);
const [errorusername, setusernameerror] = useState(false);



  return (
    <div className={classes.mainUse}>
      <Modal isOpen={modal} toggle={button2}  size="lg" centered scrollable>
          <ModalHeader toggle={button2}>Modifier Utilisateur</ModalHeader>
          <ModalBody>
            <Form>
              <div className={classes.form}>
                <FormGroup className={classes.name}>
                  <Label for="exampleNom"></Label>
                  <Input
                    onChange={(e)=>setUsername(e.target.value)}
                    className={classes.nom}
                    id="exampleNom"
                    name="nom"
                    placeholder={data.username}
                    type="text"
                    size="50"
                    
                  />
                  {errorusername &&
                  <div className={classes.msgerr}> il faut entrer un nom valide ! </div>
                  } 
                  
                </FormGroup>
                <FormGroup className={classes.mail}>
                  <Label for="exampleEmail"></Label>
                  <Input
                    onChange={(e)=>setEmail(e.target.value)}
                    className={classes.email}
                    id="exampleEmail"
                    name="email"
                    placeholder={data.email}
                    type="email"
                    size="50"
                  />
                  {erroremail &&
                  <div className={classes.msgerr} > il faut entrer une adresse valide ! </div>
                  } 
                
                </FormGroup>
               
              </div>
             
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                
                Usermodif();
                
                
              }}
              style={{ backgroundColor: "#6DCDFF", border: "none" }}
            >
              Ajouter
            </Button>
            <Button
              onClick={button2}
              style={{
                backgroundColor: "#DCDCDC",
                border: "none",
                color: "#717171",
              }}
            >
              Annuler
            </Button>
          </ModalFooter>
        </Modal>


    
    <tr className={classes.user}>
  <td>
    <div className={classes.divstyle}>
      
      <img className={classes.userContainter} src={data.profileImg} />
        <div style={{paddingLeft : "2em"}}>
        <p className={classes.textstyle}> {data.username} </p>
        <p style={{ color: "#8F9BB3" }}> {data.email} </p>
        </div>
      </div>
   
  </td>
  <td>{data.creation_date}</td>
              <td>
                {" "}
                <div
                  style={{
                    margin:"auto",
                    backgroundColor: "#B1C951",
                    color: "white",
                    width: "6em",
                    paddingBlock: "0.4em",
                    paddingInline: "1em",
                    borderRadius: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <p> {data.role} </p>
                </div>
              </td>
              <td>
       <button className={classes.butt} onClick={button2}> <img src={stylo} alt="stylo" height="20px" width="20px" ></img></button>{" "}
       <button className={classes.butt} onClick={() => {Userdel(data.email)}}><img src={supp} alt="delete" height="20px" width="20px" ></img></button>
       </td> 
         </tr>
  </div>
  );
}

export default UserItem;
