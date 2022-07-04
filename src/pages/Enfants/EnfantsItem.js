import React, { useState } from "react";
import classes from "./Enfants.module.css";
import show from "./../../assets/images/show.png";
import supp from "./../../assets/images/supp.png";
import { FormGroup, Label, Input, Form } from "reactstrap";
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from "reactstrap";
import Axios from "axios" ; 
import validator from 'validator' 

const accessToken = localStorage.getItem("accesstoken");

const EnfantsItem = (props) => {
  console.log(props.data);
const Userdel = (id) => {
  return Axios.delete('activity/delete',{
     headers: {
       
       Authorization : `Bearer ${accessToken}`
       
     }
     , data:{id: id}
   })
   .then((res) => {
     console.log(res.data.users)
     setnewlist(id)
     
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


    
    
    
  
{data.Kids.map(kid=>(

<tr className={classes.user} >
<td style={{paddingLeft: "3em" }} ><Input style={{position:"relative"}} type="checkbox"/></td>
<td style={{paddingLeft: "3em" }} > {kid.nom_complet}</td>
<td>
    <div className={classes.divstyle}>
      
      <img className={classes.userContainter} src={data.educator.profileImg} />
        <div style={{paddingLeft : "2em"}}>
        <p className={classes.textstyle}> {data.educator.username} </p>
        <p style={{ color: "#8F9BB3" }}> {data.educator.email} </p>
        </div>
      </div>
   
  </td>
  <td>
    <div className={classes.divstyle}>
      
      <img className={classes.userContainter} src={data.activities[0].specialist.profileImg} />
        <div style={{paddingLeft : "2em"}}>
        <p className={classes.textstyle}> {data.activities[0].specialist.username} </p>
        <p style={{ color: "#8F9BB3" }}> {data.activities[0].specialist.email} </p>
        </div>
      </div>
   
  </td>
  <td style={{paddingLeft: "3em" }} > {kid.creation_date}</td>
  <td style={{paddingLeft:"2em",textAlign:"left",paddingTop: "1em" , paddingBottom: "1em" }} ><span style={{backgroundColor:`${data.color}` , marginRight:"0.5em" }} className={classes.dot}></span>{data.nom}</td>
  <td style={{textAlign:"-webkit-center"}}>     
       <button className={classes.butt} onClick={button2}> <img src={show} alt="stylo" height="20px" width="20px" ></img></button>{" "}
       {/* <button className={classes.butt} onClick={() => {Userdel(data.nom)}}><img src={supp} alt="delete" height="20px" width="20px" ></img></button> */}
       </td> 

</tr>))}
  
         
  </div>
  );
}

export default EnfantsItem;
