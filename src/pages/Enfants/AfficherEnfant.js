import React, { useState, useEffect } from "react";
import classes from "./Enfants.module.css";
import { FormGroup, Label, Input, Form } from "reactstrap";
// import modif from "./../../assets/images/modif.png";
// import listing from "./../../assets/images/listing.png"; 
import Pagination from "../../components/content/pagination/Pagination";
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from "reactstrap";
import UserItem from "./EnfantsItem";
import Axios from "axios" ;
import validator from 'validator'
import { Grid } from '@mui/material'; 


const accessToken = localStorage.getItem("accesstoken");
console.log(accessToken)
const AfficherEnfant = () => {
  
  const [modal, setModal] = useState(false);
 
  const[users,setUsers]=useState([]);
  const button1 = () => {
    setModal(!modal);
  };
  

useEffect(() => {
 Axios.get('/groupe/', {
  headers: {
    
    Authorization : `Bearer ${accessToken}`
  }
})
.then((res) => {
  console.log(res.data.groupes)
  setUsers(res.data.groupes)
})
.catch((error) => {
  console.error(error)
})
},[])

const [email,setEmail]=useState("") ; 
const [password,setPassword]=useState("") ;  
const [repassword,setrePassword]=useState("") ;
const [username,setUsername]=useState("") ; 
const [telephone,settelephone]=useState("") ; 
const [searchInput,setSearchInput]=useState("") ; 
const [role,setRole]=useState("") ; 
const UserVal = () => {
if (!validator.isEmail(email)) {
   
    setemailerror(true)
  
}
else if(!validator.isAlpha(username)){
  setusernameerror(true)
  setemailerror(false)
}
else if (!validator.isMobilePhone(telephone ,'ar-TN' )){
  setusernameerror(false)
  settelephoneerror(true)
  setemailerror(false)

}
else if ( validator.isEmpty(role)){
  setroleerror(true)
  setusernameerror(false)
  settelephoneerror(false)
  setemailerror(false)
  
}
else if(!validator.isLength(password ,6 )) {
  setpassworderror(true)
  setroleerror(false)
  setemailerror(false)
  setusernameerror(false)
  settelephoneerror(false)
}
else if (!validator.equals(password,repassword) ){
  setrepassworderror(true)
  setpassworderror(false)
  setroleerror(false)
  setemailerror(false)
  setusernameerror(false)
  settelephoneerror(false)
}
else{
  setrepassworderror(false)
  setroleerror(false)
  setpassworderror(false)
  setemailerror(false)
  setusernameerror(false)
  settelephoneerror(false)
  
  return Axios.post('auth/register' ,{
    email: email,
    password: password,
    role : role ,
    username : username ,
    
  }).then((response)=> {
    console.log(response.data.user);
  }).catch((error) => {
  console.error(error)
  })
  

}
 } 
const setnewlist = (id) => {
  setUsers(prev => (prev.filter(user =>(user.id!==id))))
}

const [filteredResults, setFilteredResults] = useState([]);

const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = users.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(users)
  }
}
const [erroremail, setemailerror] = useState(false);
const [errorusername, setusernameerror] = useState(false);
const [errortelephone, settelephoneerror] = useState(false);
const [errorrole, setroleerror] = useState(false);
const [errorpassword, setpassworderror] = useState(false);
const [errorrepassword, setrepassworderror] = useState(false);
const [postsPerPage ] = useState(6);
const [currentPage , setCurrentPage] = useState(1);

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentusers = users.slice(indexOfFirstPost,indexOfLastPost)

const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className={classes.mainContainer}>
      <div style={{ display: "inline" }}>
        <Modal isOpen={modal} toggle={button1}  size="lg" centered scrollable>
          <ModalHeader toggle={button1}>Ajouter Utilisateur</ModalHeader>
          <ModalBody>
            <Form>
              <div className={classes.form}>
              <FormGroup className={classes.select}>
                  <Label for="exampleSelect"></Label>
                  <select
                    onChange={(e)=>setRole(e.target.value)}
                    className={classes.role}
                    id="exampleSelect"
                    name="select"
                    placeholder="Choisir le rôle"
                    type="select"
                  >
                    <option value="" disabled selected>
                      Choisir le rôle
                    </option>
                    <option value="admin">Admin</option>
                    <option value="therapeute">Therapeute</option>
                    <option value="educateur">Educateur</option>
                  </select>
                  {errorrole &&
                  <div className={classes.msgerr} > il faut choisir un role ! </div>
                  } 
                  
                </FormGroup>
                <FormGroup>
                <Button color="danger"
                >Ajouter une categorie</Button> <br></br>
                </FormGroup>
                
              </div>
              <div className={classes.form2}>
              <FormGroup className={classes.select}>
                  <Label for="exampleSelect"></Label>
                  <select
                    onChange={(e)=>setRole(e.target.value)}
                    className={classes.role}
                    id="exampleSelect"
                    name="select"
                    placeholder="Choisir le rôle"
                    type="select"
                  >
                    <option value="" disabled selected>
                      Choisir le rôle
                    </option>
                    <option value="admin">Admin</option>
                    <option value="therapeute">Therapeute</option>
                    <option value="educateur">Educateur</option>
                  </select>
                  {errorrole &&
                  <div className={classes.msgerr} > il faut choisir un role ! </div>
                  } 
                  
                </FormGroup>
                <FormGroup>
                <Button color="danger"
                >Ajouter une categorie</Button> <br></br>
                </FormGroup>
                
              </div>
              <div className={classes.pw}>
              <FormGroup className={classes.select}>
                  <Label for="exampleSelect"></Label>
                  <select
                    onChange={(e)=>setRole(e.target.value)}
                    className={classes.role}
                    id="exampleSelect"
                    name="select"
                    placeholder="Choisir le rôle"
                    type="select"
                  >
                    <option value="" disabled selected>
                      Choisir le rôle
                    </option>
                    <option value="admin">Admin</option>
                    <option value="therapeute">Therapeute</option>
                    <option value="educateur">Educateur</option>
                  </select>
                  {errorrole &&
                  <div className={classes.msgerr} > il faut choisir un role ! </div>
                  } 
                  
                </FormGroup>
              <FormGroup>
          <Label for="exampleDate">Date</Label>
          <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
        </FormGroup>
       
              </div>
              <div className={classes.form}>
              <FormGroup>
          <Label for="exampleTime">Time</Label>
          <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" />
        </FormGroup>
              <FormGroup className={classes.select}>
                  <Label for="exampleSelect"></Label>
                  <select
                    onChange={(e)=>setRole(e.target.value)}
                    className={classes.role}
                    id="exampleSelect"
                    name="select"
                    placeholder="Choisir le rôle"
                    type="select"
                  >
                    <option value="" disabled selected>
                      Choisir le rôle
                    </option>
                    <option value="admin">Admin</option>
                    <option value="therapeute">Therapeute</option>
                    <option value="educateur">Educateur</option>
                  </select>
                  {errorrole &&
                  <div className={classes.msgerr} > il faut choisir un role ! </div>
                  } 
                  
                </FormGroup>
               
              </div>
              <div className={classes.form}>
              <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
              </div>

            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                UserVal();
                
              }}
              style={{ backgroundColor: "#6DCDFF", border: "none" }}
            >
              Ajouter
            </Button>
            <Button
              onClick={button1}
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

        
        <div className={classes.ajout}>
          

          <button className={classes.ajouter} onClick={button1}>
            {" "}
            ajouter{" "}
          </button>
        </div>
      </div>
      <Grid container style={{paddingBottom :"2em"}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
     
                <Grid item xs={1} sm={1} md={1}>
                  
                    <div className={classes.containerr}>
                    <p className={classes.titrecontainer} >Nbre total des enfants</p>
                        
                    </div>
                    <div className={classes.containerr}>
                    <p className={classes.titrecontainer} >Nbre total des enfants</p>
                        
                    </div>
                    <div className={classes.containerr}>
                    <p className={classes.titrecontainer} >Nbre total des enfants</p>
                        
                    </div>
                    <div className={classes.containerr}>
                    <p className={classes.titrecontainer} >Nbre total des enfants</p>
                        
                    </div>
                </Grid>
               
            </Grid>

      
    </div>
  );
};
export default AfficherEnfant;