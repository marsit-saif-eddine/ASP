import React, { useState, useEffect } from 'react'
import '../../../assets/css/CalendarPage.css';
import { Grid } from '@mui/material';
import Axios from "axios";
import ReactBigCalendar from './ReactBigCalendar';
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from "reactstrap";
import { FormGroup, Label, Input, Form } from "reactstrap";
import classes from '../../../pages/utilisateur/Utilisateur.module.css';

const accessToken = localStorage.getItem("accesstoken");
const CalendarPage = () => {

    const [modal, setModal] = useState(false);
    const [event, setEvent] = useState(null);
    const [events, setEvents] = useState([]);

    const handleModal = (e) => {
        setEvent(e);
        setModal(!modal);
        console.log(event);
    };

    const handleSubmit = () => {
        return Axios.post('activity/create', {
            but: event.but,
            date: "2020-02-04",
            duration: 2.5,
            group_id: "2",
            kid_id: "1",
            specialist_id: "1",
            status: "waiting",
            template_id: "1",
            time: "10:53:44"
        }).then((response) => {
            console.log(response.data.activity);
        }).catch((error) => {
            console.error(error)
        })
    }

    const [but, setBut] = useState("");

    useEffect(() => {
        Axios.get('activity/', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log(res.data.activities)
                setEvents(res.data.activities)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <>
            <Modal isOpen={modal} toggle={handleModal} size="lg" centered scrollable>
                <ModalHeader toggle={handleModal}>Ajouter évènement</ModalHeader>
                <ModalBody>
                    <Form>
                        <div className={classes.form}>
                            <FormGroup className={classes.name}>
                                <Label for="exampleBut"></Label>
                                <Input
                                    onChange={(e) => setBut(event.but)}
                                    className={classes.nom}
                                    id="exampleBut"
                                    name="but"
                                    placeholder={event ? event.but : "But*"}
                                    defaultValue={event ? event.but : ""}
                                    type="text"
                                    size="50"
                                />
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
                                    // onChange={(e) => setEmail(e.target.value)}
                                    className={classes.email}
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="E-mail *"
                                    type="email"
                                    size="50"
                                />
                            </FormGroup>
                            <FormGroup className={classes.mob}>
                                <Label for="exampleMobile"></Label>
                                <Input
                                    className={classes.mobile}
                                    id="exampleMobile"
                                    name="mobile"
                                    placeholder="Téléphone mobile *"
                                    type="tel"
                                    size="50"
                                />
                            </FormGroup>
                            <FormGroup className={classes.select}>
                                <Label for="exampleSelect"></Label>
                                <Input
                                    // onChange={(e) => setRole(e.target.value)}
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
                                </Input>
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
                                    // onChange={(e) => setPassword(e.target.value)}
                                    className={classes.pass}
                                    id="examplepw"
                                    name="password"
                                    placeholder="Password *"
                                    type="password"
                                    size="50"
                                />
                            </FormGroup>
                            <FormGroup className={classes.confirm}>
                                <Label for="exampleConfirm"></Label>
                                <Input
                                    className={classes.confirmer}
                                    id="exampleConfirm"
                                    name="confirm"
                                    placeholder="Confirmer le mot de passe *"
                                    type="password"
                                    size="50"
                                />
                            </FormGroup>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            handleSubmit();
                        }}
                        style={{ backgroundColor: "#6DCDFF", border: "none" }}
                    >
                        Ajouter
                    </Button>
                    <Button
                        onClick={handleModal}
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
            <Grid container xs={12}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className='events-container'>
                        <h5>Liste des évènements</h5>
                        <ul className="calendar-events">
                            {events.map((item, index) => (
                                <li onClick={() => handleModal(item)} className='event-item' key={index}>{item.activity_desc}</li>
                            ))}
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <div className="container">
                        <ReactBigCalendar events={events} />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default CalendarPage