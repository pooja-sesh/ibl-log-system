import {Header} from "../components/Header";
import {EntryForm} from "../features/EntryForm/EntryForm";
import React from "react";

export function Home() {
    return (
        <div>
            <Header>INDUSTRY BASED LEARNING LOGS</Header>
            <EntryForm/>
        </div>
    )
}