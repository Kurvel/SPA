import React, { useEffect, useState } from "react";

export interface FetchOptions {
  id: string;
  date: string;
  name: string;
  option: string;
  timeOption: string;
}

interface FetchOptionsProps {
  option: string;
  timeOption: string;
  setFilteredData: React.Dispatch<React.SetStateAction<FetchOptions[]>>;
}

const FetchOptionsComponent: React.FC<FetchOptionsProps> = ({
  option,
  timeOption,
  setFilteredData,
}) => {
  const [fetchOptions, setFetchOptions] = useState<FetchOptions[]>([]);

  const fetchData = () => {
    fetch("http://localhost:3000/dates")
      .then((res) => res.json())
      .then((data: FetchOptions[]) => setFetchOptions(data));
  };

  useEffect(() => {
    fetchData();
  }, [option, timeOption, setFilteredData]);

  useEffect(() => {
    if (option === null || timeOption === null) {
      return; // Exit early
    }

    const filteredData = fetchOptions.filter(
      (item) => item.option === option && item.timeOption === timeOption
    );

    setFilteredData(filteredData);
  }, [option, timeOption, fetchOptions, setFilteredData]);

  return null;
};

export default FetchOptionsComponent;
