import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';
import DropdownMenu from './DropDownMenu';
import { Option } from './DropDownMenu';


  


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

 const options: Option[] = [
    { value: 'Warm', label: 'Warm' },
    { value: 'Cold', label: 'Cold' }
  ];

function Booking() {
    const [newDate, setNewDate] = useState<Value>(new Date());
    const [newName, setNewName] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

   

    const saveDate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isoDate = (newDate as Date).toISOString();

        fetch("http://localhost:3000/dates", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ date: isoDate, name: newName, option: selectedOption || options[0] }) 
        }) 
        .then(() => console.log("Date saved successfully", isoDate))
        .catch(error => console.error("Error saving date:", error));
    }

    return(
        <div>
            <h3>BOOKING</h3>
            <form onSubmit={saveDate}>
            <DropdownMenu options={options} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
                <label>Name: </label>
                <input type="text" value={newName} onChange={((e) => setNewName(e.target.value))} />
                <Calendar onChange={setNewDate} value={newDate} />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}



export default Booking;
