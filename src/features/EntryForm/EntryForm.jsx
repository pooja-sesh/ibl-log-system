// features
import React, {useEffect, useState} from "react";
import {EntryList} from "../LogEntry/EntryList";
import {v4 as uuidv4} from "uuid";
import {Button} from "../../components/Button";
import {StyledLabel, StyledEntryInput, FormWrapper} from "../../components/EntryFormStyle";
import {StyledSelect} from "../../components/Dropdown";
import firebase from "../../services/firebase"


export function EntryForm() {

    const [allEntries, setAllEntries] = useState([])
    const [submitValid, setButtonValid] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const [entryInput, setEntryInput] = useState("")
    const [day, setDay] = useState('')

    const ref = firebase.firestore().collection('logs')

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    useEffect(() => {
        // for editing the content
        console.log("use effect is here")
    }, [entryInput])

    function onInputChange(event) {
        // this might not be the optimal way of doing this
        const inputValue = event.target.value
        console.log(inputValue)

        // set word count
        const wordsList = inputValue.split(" ")
        setWordCount(wordsList.length)
        console.log(inputValue.split(" "))

        // removing extra word when last character in input is an empty space
        if (wordsList[wordsList.length-1] === "") {
            setWordCount(wordCount)
        }

        // setting state value of the submit button
        if (inputValue.length < 1) {
            setButtonValid(false)
            setWordCount(0)
        }
        else {
            setButtonValid(true)
        }

    }

    function addLog(newLog) {
        // adding a new log entry
        ref
            .doc(newLog.id)
            .set(newLog)
            .catch((err) => {
                console.error(err);
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const inputValue = event.target.elements.entryInput.value

        if (day === '') { // if day is not selected
            alert('Please select a day')
        }
        else { // if all input fields are filled

            // adding new entry
            // setAllEntries([...allEntries, {id: uuidv4(), title: inputValue, selectday: day,
            //     timeCreated: Date().toLocaleString().substring(0,24)}])
            addLog({id: uuidv4(), title: inputValue, selectday: day,
                timeCreated: Date().toLocaleString().substring(0,24)})

            // resetting input fields
            event.target.elements.entryInput.value = ""
            setDay('')
            setWordCount(0)
            setButtonValid(false)
        }

    }

    return (
        <div>
            <FormWrapper>
                <form className="entry-form" onSubmit={handleSubmit}>
                    <div>
                        <StyledLabel>Add new entry</StyledLabel>
                        <div>
                            <StyledSelect value={day} onChange={handleChange} name="selectList" id="selectList">
                                <option value={''}>Select a day of the week...</option>
                                <option value={"Monday"}>Monday</option>
                                <option value={"Tuesday"}>Tuesday</option>
                                <option value={"Wednesday"}>Wednesday</option>
                                <option value={"Thursday"}>Thursday</option>
                                <option value={"Friday"}>Friday</option>
                            </StyledSelect>
                        </div>
                        <div>
                            <StyledEntryInput
                                className="entry-input"
                                id="entryInput"
                                rows="25"
                                cols="100"
                                placeholder='Add a new log'
                                name="description"
                                onChange={onInputChange}>
                            </StyledEntryInput>
                        </div>
                    </div>
                    <StyledLabel>
                        Word count: {wordCount}
                    </StyledLabel>
                    <div>
                        <Button className="entry-button" type="submit" disabled={!submitValid}>Submit</Button>
                    </div>
                </form>
                {/*<div>*/}
                {/*    /!* extract into EntryList component *!/*/}
                {/*    <EntryList allEntries={allEntries} setAllEntries={setAllEntries}*/}
                {/*               entryInput={entryInput} setEntryInput={setEntryInput}/>*/}
                {/*</div>*/}
            </FormWrapper>
            <div>
                <EntryList allEntries={allEntries} setAllEntries={setAllEntries}
                           entryInput={entryInput} setEntryInput={setEntryInput}/>
            </div>
        </div>


    )
}