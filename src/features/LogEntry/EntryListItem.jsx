import React from "react";
import {StyledLogEntry} from "../../components/LogEntryStyle";
import {FormWrapper} from "../../components/EntryFormStyle";

export function EntryListItem(props) {

    function deleteEntry() {
        const newEntriesArray = [...props.entries].filter(entry => entry.id !== props.entryid)
        props.setEntries(newEntriesArray)
    }

    function updateEntry() {
        console.log("before set entry input " + props.entryInput)
        console.log("props title is " + props.title)
        props.setEntryInput(props.title)
        console.log("after set entry input " + props.entryInput)
    }

    // useEffect(() => {
    //     props.setEntryInput(props.title)
    // })

    return (
        <StyledLogEntry>
            <h4>{props.day}</h4>
            <p> <small>Posted on: {props.timeCreated}</small></p>
            <p>{props.title}</p>
            <button onClick={updateEntry}>edit</button>
            <button onClick={deleteEntry}>delete</button>
        </StyledLogEntry>

    )
}