import React, {useState, useEffect} from "react";
import {EntryListItem} from "./EntryListItem";
import firebase from "../../services/firebase";

export function EntryList(props) {

    const [entriesList, setEntriesList] = useState([]);

    const ref = firebase.firestore().collection("logs");
    console.log(ref)

    // get a list of all entries
    function getLogs() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setEntriesList(items);
        })
    }

    useEffect(() => {
        getLogs();
    }, []);

    return (
        <ul>
            {entriesList.map(entry => {

                console.log(entry.id)

                return (
                    <EntryListItem key={entry.id} entryid={entry.id} title={entry.title}
                                   day={entry.selectday} entries={props.allEntries} timeCreated={entry.timeCreated}
                                   setEntries={props.setAllEntries} entryInput={props.entryInput}
                                   setEntryInput={props.setEntryInput} entry={entry}/>
                );
            })}
        </ul>
    )
}