import React, { useState, useEffect } from "react";
import classes from "./Activite.module.css";
import { FormGroup, Label, Input, Form } from "reactstrap";
// import modif from "./../../assets/images/modif.png";
// import listing from "./../../assets/images/listing.png"; 
import Pagination from "../../components/content/pagination/Pagination";
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from "reactstrap";
import UserItem from "./ActiviteItem";
import Axios from "axios" ;
import validator from 'validator'
import { Grid } from '@mui/material'; 


const accessToken = localStorage.getItem("accesstoken");
console.log(accessToken)
const Activite = () => {
  
  const[idme,setIdme]=useState('');
  useEffect(() => {
    (async () => {
        
            const {data} = await Axios.get('auth/me', {
              headers: {
                
                Authorization : `Bearer ${accessToken}`
              }
            });

            setIdme(data.id);
            
       
    })();
}, []);
  const [modal, setModal] = useState(false);
  const[groups,setgroups]=useState([]);
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
     setgroups(res.data.groupes)
   })
   .catch((error) => {
     console.error(error)
   })
   },[])
 
useEffect(() => {
 Axios.get('activity/', {
  headers: {
    
    Authorization : `Bearer ${accessToken}`
  }
})
.then((res) => {
  console.log(res.data.activities)
  setUsers(res.data.activities)
})
.catch((error) => {
  console.error(error)
})
},[])
const [group,setGroup]=useState("") ; 
const [But,setBut]=useState("") ; 
const [Time,setTime]=useState("") ;  
const [Date,setDate]=useState("") ;
const [duration,setDuration]=useState("") ; 
const [type,settype]=useState("indiv") ; 
const [searchInput,setSearchInput]=useState("") ; 
const [role,setRole]=useState("") ; 
let data;
if (type =="indiv") {
        data ={but: But,
      date: Date,
      time: Time,
      duration: duration,
      specialist_id: idme,
      kid_id: group,
      template_id: "9"};

        }
      else if (type =="groupe")  {
                 
        data={but: But,
        date: Date,
        time: Time,
        duration: duration,
        specialist_id: idme,
        group_id: group,
        template_id: "9"};
      }
const UserVal = () => {
  if(validator.isEmpty(But)){
    setButerror(true)
  }
  else {
    setButerror(false)
    
    return Axios.post('/activity/create' ,
     
     
      data
      
      
    ,{
      headers: {
         
        Authorization : `Bearer ${accessToken}`
        
      },}).then((response)=> {
        //console.log(data);
      console.log(response.data.user);
    }).catch((error) => {
      //console.log(data);
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
const [errorbut, setButerror] = useState(false);
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
          <ModalHeader toggle={button1}>Ajouter Activite</ModalHeader>
          <ModalBody>
            <Form>
              <div className={classes.form}>
              <FormGroup className={classes.select}>
                  <Label for="exampleSelect"></Label>
                  <select
                    onChange={(e)=>settype(e.target.value)}
                    className={classes.role}
                    id="exampleSelect"
                    name="select"
                    placeholder="Choisir le type d activite"
                    type="select"
                  >
                    <option value="" disabled selected>
                      Choisir le type d'activité
                    </option>
                    <option value="indiv">Individuelle</option>
                    <option value="groupe">Par groupe</option>
                  </select>
                  {errorrole &&
                  <div className={classes.msgerr} > il faut choisir un role ! </div>
                  } 
                  
                </FormGroup>
                
                
              </div>
              <div className={classes.form2}>
              <FormGroup className={classes.select}>
                  <Label for="exampleSelect"></Label>
                  <select
                    onChange={(e)=>setGroup(e.target.value)}
                    className={classes.role}
                    id="exampleSelect"
                    name="select"
                    placeholder="Choisir le rôle"
                    type="select"
                  >
                    { (type =="indiv") && (
           <option value="" hidden>nom enfant</option>

          )
         || (type =="groupe") &&  (
                    
          <option value="" hidden>nom groupe</option>
         
      )}
                   
                   { (type =="indiv") && (
          groups.map((item,index)=>(
            item.Kids.map(kid=>(
              <option value={kid.id}>{kid.nom_complet}</option>
            ))
            
          ))

          )
         || (type =="groupe") &&  (
                    
          groups.map((item,index)=>(
  <option value={item.id}>{item.nom}</option>
))
)
         
      }
                  </select>
                  {errorrole &&
                  <div className={classes.msgerr} > il faut choisir un role ! </div>
                  } 
                  
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
              <FormGroup className={classes.select}>
          <Label for="exampleDate"></Label>
          <Input onChange={(e)=>setDate(e.target.value)} className={classes.role} type="date" name="date" id="exampleDate" placeholder="date placeholder" />
        </FormGroup>
       
              </div>
              <div className={classes.form}>
              <FormGroup className={classes.select}>
          <Label for="exampleTime"></Label>
          <Input onChange={(e)=>setTime(e.target.value)} className={classes.role} type="time" name="time" id="exampleTime" placeholder="time placeholder" />
        </FormGroup>
              <FormGroup className={classes.select}>
                  <Label for="exampleSelect"></Label>
                  <select
                    onChange={(e)=>setDuration(e.target.value)}
                    className={classes.role}
                    id="exampleSelect"
                    name="select"
                    placeholder="choisir la duree"
                    type="select"
                  >
                    <option value="" disabled selected>
                      Choisir la durée
                    </option>
                    <option value="0.5">0.5 h </option>
                    <option value="1">1 h</option>
                    <option value="1.5">1.5 h</option>
                    <option value="2">2 h </option>
                    <option value="2.5">2.5 h</option>
                    <option value="3">3 h</option>
                  </select>
                  {errorrole &&
                  <div className={classes.msgerr} > il faut choisir un role ! </div>
                  } 
                  
                </FormGroup>
               
              </div>
              <div className={classes.form}>
              <FormGroup className={classes.select} >
          <Label for="exampleText"></Label>
          <Input onChange={(e)=>setBut(e.target.value)} className={classes.role} type="textarea" name="text" id="exampleText" />
          {errorbut &&
                  <div className={classes.msgerr} > il faut remplir le text ! </div>
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
      <Grid container style={{paddingBottom :"2em"}} spacing={{ xs: 2, md: 3 }} columns={{ xs:2 , sm: 6, md: 10 }}>
      <Grid item xs={1} sm={2} md={2}>
                    <div className={classes.container}>
                        <p className={classes.titrecontainer} >Avancement Activité X</p>
                        <p className={classes.postcontainer} >35%</p>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <div className={classes.container}>
                    <p className={classes.titrecontainer} >Avancement Activité Y</p>
                        <p className={classes.postcontainer} >25%</p>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <div className={classes.container}>
                    <p className={classes.titrecontainer} >Avancement Activité Z</p>
                        <p className={classes.postcontainer} >15%</p>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <div className={classes.container}>
                    <p className={classes.titrecontainer} >Avancement Activité W</p>
                        <p className={classes.postcontainer} >20%</p>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2} md={2}>
                    <div className={classes.container}>
                    <p className={classes.titrecontainer} >Avancement Activité Q</p>
                        <p className={classes.postcontainer} >11%</p>
                    </div>
                </Grid>
            </Grid>

      <div style={{ display: "inline" }}>
        <table className={classes.tableUser}>
          <thead>
            <tr className={classes.TabHeadStyle}>
              <td style={{ paddingLeft:"2em" , paddingBlock: "1em" }} colSpan={6}>
                Liste des activités
              </td>

              <td style={{paddingRight:"1em", paddingBlock: "1em" }}> <Input
                    onChange={(e)=>searchItems(e.target.value)}
                    
                    id="exampleNom"
                    name="nom"
                    placeholder="Recherche"
                    type="text"
                    size="40"
                    
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
              
              <td style={{ paddingBlock: "1em" }}></td>
              <td style={{ paddingBlock: "1em" }}>Activité </td>
              <td style={{ paddingBlock: "1em" }}>Profil Educateur</td>
              <td style={{ paddingBlock: "1em" }}>Date de création</td>
              <td style={{ paddingBlock: "1em" }}>Groupe</td>
              <td style={{ paddingBlock: "1em" }}>Modèle</td>
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
            <td colSpan={7}>
            <Pagination  postsPerPage={postsPerPage} totalPosts={users.length} paginate={paginate} />
            </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default Activite;