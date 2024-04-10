import React, { useState } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface DropdownMenuProps {
  options: Option[];
  selectedOption: Option | null;
  setSelectedOption: (option: Option) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'Warm or Cold?'}
        <i className={`arrow ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <ul>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;