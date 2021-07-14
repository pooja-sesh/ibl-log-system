import React, {useEffect, useState} from "react";
import './App.css';
import '@fontsource/roboto'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {v4 as uuidv4} from "uuid";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function App() {
  return (
      <div>
          <Header/>
          <EntryForm/>
      </div>
  )
}

function Header() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                    Industry Based Learning Log Record
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

function EntryForm() {

    const [allEntries, setAllEntries] = useState([])
    const [submitValid, setButtonValid] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const [entryInput, setEntryInput] = useState("")

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();
    const [day, setDay] = useState('')

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


    function handleSubmit(event) {
        event.preventDefault();
        const inputValue = event.target.elements.entryInput.value

        if (day === '') { // if day is not selected
            alert('Please select a day')
        }
        else { // if all input fields are filled

            // adding new entry
            setAllEntries([...allEntries, {id: uuidv4(), title: inputValue, selectday: day,
                timeCreated: Date().toLocaleString().substring(0,24)}])

            // resetting input fields
            event.target.elements.entryInput.value = ""
            setDay('')
            setWordCount(0)
            setButtonValid(false)
        }

    }

    return (
        <div>
            <form className="entry-form" onSubmit={handleSubmit}>
                <div>
                    <div className="add-new-entry">
                        <label htmlFor="entryInput">Add new entry</label>
                    </div>
                    <div>
                        <FormControl
                            variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Day</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={day}
                                onChange={handleChange}
                                label="Day"
                            >
                                <MenuItem value={"Monday"}>Monday</MenuItem>
                                <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                                <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                                <MenuItem value={"Thursday"}>Thursday</MenuItem>
                                <MenuItem value={"Friday"}>Friday</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <textarea
                            className="entry-input"
                            id="entryInput"
                            rows="5"
                            cols="60"
                            placeholder='Add a new log'
                            name="description"
                            onChange={onInputChange}>
                        </textarea>
                    </div>
                </div>
                <div>
                    <p>Word count: {wordCount}</p>
                </div>
                <div>
                    <button className="entry-button" type="submit" disabled={!submitValid}>Submit</button>
                </div>
            </form>
            <div>
                <ul>
                    {allEntries.map(entry => {
                        return (
                            <EntryListItem key={entry.id} entryid={entry.id} title={entry.title}
                                           day={entry.selectday} entries={allEntries} timeCreated={entry.timeCreated}
                            setEntries={setAllEntries} entryInput={entryInput} setEntryInput={setEntryInput}/>
                        );
                    })}
                </ul>
            </div>
        </div>

    )
}


function EntryListItem(props) {

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
        <div>
            <h4>{props.day}</h4>
            <p> <small>Posted on: {props.timeCreated}</small></p>
            <p>{props.title}</p>
            <button onClick={updateEntry}>edit</button>
            <button onClick={deleteEntry}>delete</button>
        </div>
    )
}

export default App;
