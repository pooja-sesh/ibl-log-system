import React from "react";
import {StyledLogEntry} from "../../components/LogEntryStyle";
import {FormWrapper} from "../../components/EntryFormStyle";
import firebase from "../../services/firebase";

export function EntryListItem(props) {

    const ref = firebase.firestore().collection('logs')

    function deleteLog() {
        // delete log entries
        ref
            .doc(props.entry.id)
            .delete()
            .catch((err) => {
                console.log(err);
            });
    }

    function updateEntry() {
        props.setEntryInput(props.title)
    }

    return (
        <StyledLogEntry>
            <h4>{props.day}</h4>
            <p> <small>Posted on: {props.timeCreated}</small></p>
            <p>{props.title}</p>
            <button onClick={updateEntry}>edit</button>
            <button onClick={deleteLog}>delete</button>
        </StyledLogEntry>
    )
}