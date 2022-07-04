import React, { useState } from "react";
import classes from "./Activite.module.css";
import stylo from "./../../assets/images/stylo.png";
import supp from "./../../assets/images/supp.png";
import { FormGroup, Label, Input, Form } from "reactstrap";
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from "reactstrap";
import Axios from "axios" ; 
import validator from 'validator' 

const accessToken = localStorage.getItem("accesstoken");

const ActiviteItem = (props) => {
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
  
   
   
   
const Usermodif = (id) => {
 
   Axios.put('/activity/date' ,{date: Date , activity_id : id},{
    headers: {
       
      Authorization : `Bearer ${accessToken}`
      
    },
    
  }).then((response)=> {
    console.log(response.data.user);
    
  }).catch((error) => {
  console.error(error)
  })

   Axios.put('/activity/time' ,{time: Time , activity_id:id },{
    headers: {
       
      Authorization : `Bearer ${accessToken}`
      
    },
    
  }).then((response)=> {
    console.log(response.data.user);
    
  }).catch((error) => {
  console.error(error)
  })
 
} 
    const [modal, setModal] = useState(false);
    const{data, setnewlist}=props
    const button2 = () => {
      setModal(!modal);
    };
    const [erroremail, setemailerror] = useState(false);
const [errorusername, setusernameerror] = useState(false);
const [Time,setTime]=useState("") ;  
const [Date,setDate]=useState("") ;


  return (
    <div className={classes.mainUse}>
      <Modal isOpen={modal} toggle={button2}  size="lg" centered scrollable>
          <ModalHeader toggle={button2}>Modifier Activite</ModalHeader>
          <ModalBody>
            <Form>
              <div className={classes.form}>

              <FormGroup className={classes.select}>
          <Label for="exampleTime"></Label>
          <Input onChange={(e)=>setTime(e.target.value)} className={classes.role} type="time" name="time" id="exampleTime" placeholder="time placeholder" />
        </FormGroup>

        <FormGroup className={classes.select}>
          <Label for="exampleDate"></Label>
          <Input onChange={(e)=>setDate(e.target.value)} className={classes.role} type="date" name="date" id="exampleDate" placeholder="date placeholder" />
        </FormGroup>
                
                
               
              </div>
             
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                
                Usermodif(data.id);
                
                
              }}
              style={{ backgroundColor: "#6DCDFF", border: "none" }}
            >
              Modifier
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
    <td style={{paddingLeft: "3em" }} ><Input style={{position:"relative"}} type="checkbox"/></td>
  <td style={{paddingLeft: "3em"}} >
{data.activity_name}</td>
  <td>
    <div className={classes.divstyle}>
      
      <img className={classes.userContainter} src={data.specialist.profileImg} />
        <div style={{paddingLeft : "2em"}}>
        <p className={classes.textstyle}> {data.specialist.username} </p>
        <p style={{ color: "#8F9BB3" }}> {data.specialist.email} </p>
        </div>
      </div>
   
  </td>
              <td>
                {data.date} 
              </td>
              <td><span className={classes.dot}></span>{data.group_name}</td>
              <td>{data.activity_type}</td>
              <td style={{textAlign:"center"}}>
       <button className={classes.butt} onClick={button2}> <img src={stylo} alt="stylo" height="20px" width="20px" ></img></button>{" "}
       <button className={classes.butt} onClick={() => {Userdel(data.id)}}><img src={supp} alt="delete" height="20px" width="20px" ></img></button>
       </td> 
         </tr>
  </div>
  );
}

export default ActiviteItem;
