import React from "react";
import {EntryListItem} from "./EntryListItem";

export function EntryList(props) {
    return (
        <ul>
            {props.allEntries.map(entry => {
                return (
                    <EntryListItem key={entry.id} entryid={entry.id} title={entry.title}
                                   day={entry.selectday} entries={props.allEntries} timeCreated={entry.timeCreated}
                                   setEntries={props.setAllEntries} entryInput={props.entryInput}
                                   setEntryInput={props.setEntryInput}/>
                );
            })}
        </ul>
    )
}