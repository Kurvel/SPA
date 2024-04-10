import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';
import ChoiceVarmCold from './ChoiceVarmCold';
import { Option } from './ChoiceVarmCold';
import Time from './Time';
import { TimeOption } from './Time';


  


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

 const options: Option[] = [
    {  label: 'Warm' },
    {  label: 'Cold' }
  ];

  const timeOptions: TimeOption[] = [
    {  label: 'Am' },
    {  label: 'Fm' },
    {  label: 'Evning' }
  ];

function Booking() {
    const [newDate, setNewDate] = useState<Value>(new Date());
    const [newName, setNewName] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);

   

    const saveDate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isoDate = (newDate as Date).toISOString();

        fetch("http://localhost:3000/dates", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ date: isoDate, name: newName, option: selectedOption?.label || options[0], timeOption: selectedTime?.label || timeOptions[0] }) 
        }) 
        .then(() => console.log("Date saved successfully", isoDate))
        .catch(error => console.error("Error saving date:", error));
    }

    return(
        <div>
            <h3>BOOKING</h3>
            <form onSubmit={saveDate}>
            <ChoiceVarmCold options={options} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
            <Time timeOptions={timeOptions} setSelectedTime={setSelectedTime} selectedTime={selectedTime} ></Time>
                <label>Name: </label>
                <input type="text" value={newName} onChange={((e) => setNewName(e.target.value))} />
                <Calendar onChange={setNewDate} value={newDate} />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}



export default Booking;
