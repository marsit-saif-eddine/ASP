import React, { useState, useEffect } from "react";
import classes from "./Groupes.module.css";
import { FormGroup, Label, Input, Form } from "reactstrap";
// import modif from "./../../assets/images/modif.png";
// import listing from "./../../assets/images/listing.png"; 
import Pagination from "../../components/content/pagination/Pagination";
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from "reactstrap";
import UserItem from "./GroupesItem";
import Axios from "axios" ;
import validator from 'validator'
import { Grid } from '@mui/material'; 




const accessToken = localStorage.getItem("accesstoken");
console.log(accessToken)


const Groupes = () => {
  
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
     const filteredDataid = res.data.users.filter((item) => {
      return item.role == "educateur"
    })
     seteducator(filteredDataid);
     console.log(educator);
   })
   .catch((error) => {
     console.error(error)
   })
   },[])


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
const [educatorid,setEducatorid]=useState("") ; 
const [groupcolor,setGroupcolor]=useState("") ; 
const [educator,seteducator]=useState([]) ; 
const [groupname,setGroupname]=useState("") ; 
const [searchInput,setSearchInput]=useState("") ; 

const UserVal = () => {
if(!validator.isAlpha(groupname)){
  setgroupnameerror(true)
}
else {
  setgroupnameerror(false)
  
  return Axios.post('/groupe/create' ,{
    nom: groupname,
    educator_id: educatorid,
    color: groupcolor,
    
    
  },{
    headers: {
       
      Authorization : `Bearer ${accessToken}`
      
    },}).then((response)=> {
    console.log(educatorid);
    console.log(response.data.user);
    
  }).catch((error) => {
    console.log(educatorid);
  console.error(error)
  
  })
  

}
 } 
const setnewlist = (nom) => {
  setUsers(prev => (prev.filter(user =>(user.nom!==nom))))
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

const [errorgroupname, setgroupnameerror] = useState(false);
const [postsPerPage ] = useState(10);
const [currentPage , setCurrentPage] = useState(1);

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentusers = users.slice(indexOfFirstPost,indexOfLastPost)

const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className={classes.mainContainer}>
      <div style={{ display: "inline" }}>
        <Modal isOpen={modal} toggle={button1}  size="lg" centered scrollable>
          <ModalHeader toggle={button1}>Ajouter Groupe</ModalHeader>
          <ModalBody>
            <Form>
              <div className={classes.form}>
              <FormGroup className={classes.confirm}>
                  <Label for="exampleConfirm"></Label>
                  <Input
                    onChange={(e)=>setGroupname(e.target.value)}
                    className={classes.confirmer}
                    id="exampleConfirm"
                    name="confirm"
                    placeholder="nom du groupe"
                    type="text"
                    size="50"
                  />
                  {errorgroupname &&
                  <div className={classes.msgerr} >il faut taper un vrai nom ! </div>
                  } 
                </FormGroup>
               
              </div>
              <div >
              <FormGroup>
          <Input onChange={(e)=>setGroupcolor(e.target.value)} className={classes.confirmer}   style={{margintop:"1rem "}} type="color" name="color" id="exampleColor" placeholder="color placeholder" />
        </FormGroup>
       
        </div>
        <div className={classes.form}>
        <FormGroup className={classes.confirm}>
        <Input  value={educatorid} onChange={(e)=>{ setEducatorid(e.target.value)}} className={classes.confirmer}  type="select" name="select" id="exampleSelect">
        <option value="" hidden>nom educateur</option>
          {educator.map((item,index)=>(
            <option value={item.id}>{item.username}</option>
          ))}
          </Input>
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
              <td style={{ paddingLeft:"2em" , paddingBlock: "1em" }} colSpan={2}>
                Liste des groupes
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
              
              
              <td style={{ paddingBlock: "1em" }}>Groupes </td>
              <td style={{ paddingBlock: "1em" }}>Date de création</td>
              
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
export default Groupes;