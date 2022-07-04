import React, { useState, useEffect } from "react";
import classes from "./Utilisateur.module.css";
import { FormGroup, Label, Input, Form } from "reactstrap";
// import modif from "./../../assets/images/modif.png";
// import listing from "./../../assets/images/listing.png"; 
import Pagination from "./../../components/content/pagination/Pagination";
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from "reactstrap";
import UserItem from "./UserItem";
import Axios from "axios" ;
import validator from 'validator' 


const accessToken = localStorage.getItem("accesstoken");

const Utilisateur = () => {
  
  const [modal, setModal] = useState(false);
 
  const[users,setUsers]=useState([]);
  const button1 = () => {
    setModal(!modal);
  };
  

useEffect(() => {
 Axios.get('users', {
  headers: {
    
    Authorization : `Bearer ${accessToken}`
  }
})
.then((res) => {
  console.log(res.data.users)
  setUsers(res.data.users)
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
const setnewlist = (email) => {
  setUsers(prev => (prev.filter(user =>(user.email!==email))))
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
const [postsPerPage ] = useState(3);
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
                <FormGroup className={classes.name}>
                  <Label for="exampleNom"></Label>
                  <Input
                    onChange={(e)=>setUsername(e.target.value)}
                    className={classes.nom}
                    id="exampleNom"
                    name="nom"
                    placeholder="Nom*"
                    type="text"
                    size="50"
                    
                  />
                  {errorusername &&
                  <div className={classes.msgerr}> il faut entrer un nom valide ! </div>
                  } 
                  
                </FormGroup>
                <FormGroup className={classes.pre}>
                  <Label for="examplePrenom"></Label>
                  <Input
                    className={classes.prenom}
                    id="examplePrenom"
                    name="prenom"
                    placeholder="Prénom *"
                    type="text"
                    size="50"
                  />
                </FormGroup>
              </div>
              <div className={classes.form2}>
                <FormGroup className={classes.mail}>
                  <Label for="exampleEmail"></Label>
                  <Input
                    onChange={(e)=>setEmail(e.target.value)}
                    className={classes.email}
                    id="exampleEmail"
                    name="email"
                    placeholder="E-mail *"
                    type="email"
                    size="50"
                  />
                  {erroremail &&
                  <div className={classes.msgerr} > il faut entrer une adresse valide ! </div>
                  } 
                
                </FormGroup>
                <FormGroup className={classes.mob}>
                  <Label for="exampleMobile"></Label>
                  <Input
                    onChange={(e)=>settelephone(e.target.value)}
                    className={classes.mobile}
                    id="exampleMobile"
                    name="mobile"
                    placeholder="Téléphone mobile *"
                    type="tel"
                    size="50"
                  />
                  {errortelephone &&
                  <div className={classes.msgerr} > il faut entrer un numero valide ! </div>
                  } 
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
              <div className={classes.pw}>
                <FormGroup className={classes.profil}>
                  <Label for="exampleProfile"></Label>
                  <Input
                    className={classes.profile}
                    id="examplePorfile"
                    name="profile"
                    placeholder="Nom profile *"
                    type="text"
                    size="50"
                  />
                </FormGroup>
                <FormGroup className={classes.mdp}>
                  <Label for="examplePassword"></Label>
                  <Input
                    onChange={(e)=>setPassword(e.target.value)}
                    className={classes.pass}
                    id="examplepw"
                    name="password"
                    placeholder="Password *"
                    type="password"
                    size="50"
                  />
                  {errorpassword &&
                  <div className={classes.msgerr} > votre mot de passe doit avoir au minimum 8 caracteres ! </div>
                  } 
                </FormGroup>
                <FormGroup className={classes.confirm}>
                  <Label for="exampleConfirm"></Label>
                  <Input
                    onChange={(e)=>setrePassword(e.target.value)}
                    className={classes.confirmer}
                    id="exampleConfirm"
                    name="confirm"
                    placeholder="Confirmer le mot de passe *"
                    type="password"
                    size="50"
                  />
                  {errorrepassword &&
                  <div className={classes.msgerr} >il faut retapez le meme mot de passe ! </div>
                  } 
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

      <div style={{ display: "inline" }}>
        <table className={classes.tableUser}>
          <thead>
            <tr className={classes.TabHeadStyle}>
              <td style={{ paddingLeft:"2em" , paddingBlock: "1em" }} colSpan={3}>
                Liste des utilisateurs
              </td>

              <td style={{paddingRight:"1em", paddingBlock: "1em" }}> <Input
                    onChange={(e)=>searchItems(e.target.value)}
                    
                    id="exampleNom"
                    name="nom"
                    placeholder="Recherche"
                    type="text"
                    size="8"
                    
                  />
                  </td>
            </tr>

            <tr
              style={{
                backgroundColor: "#EFF4FA",
                color: "#8F9BB3",
                fontWeight: "bold",
                textAlign: 'center',

              }}
            >
              <td style={{ paddingBlock: "1em",paddingRight:"4em" }}>Profil </td>
              <td style={{ paddingBlock: "1em" }}>Date de création</td>
              <td style={{ paddingBlock: "1em" }}>Rôle</td>
              <td style={{ paddingBlock: "1em" }}>Action</td>
            </tr>
          </thead>
          <tbody>
          {searchInput.length > 1 ? (
                      filteredResults.map((user,index)=><UserItem setnewlist={setnewlist} data={user} key={index}/> )
                    
                ) : (
                  currentusers.map((user,index)=><UserItem setnewlist={setnewlist} data={user} key={index}/> )
                  
                )}  
               
          
          </tbody>
          <tfoot>
          <tr >
            <td colSpan={4}>
            <Pagination  postsPerPage={postsPerPage} totalPosts={users.length} paginate={paginate} />
            </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default Utilisateur;