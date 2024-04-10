import { useEffect, useState } from "react";

interface PrintDate {
    id: string,
    date: string
}

function PrintDates() {
    const [printDates, setPrintDates] = useState<PrintDate[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/dates")
            .then(res => res.json())
            .then((data: PrintDate[]) => setPrintDates(data));
    }, []); // Add an empty dependency array to useEffect to run only once

    return(
        <div>
            <h3>PrintTest</h3>
            {printDates.map((printDate: PrintDate, index: number) => {
                const utcDate: Date = new Date(printDate.date);
                const localDate: string = utcDate.toLocaleString(); 
                return <div key={index}>{localDate}</div>; 
            })}
        </div>
    );
}

export default PrintDates;
