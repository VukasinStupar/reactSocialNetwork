import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import "../../styles/common.css";

const GenericDropdown = ({
  fetchData,
  displayField,
  valueField,
  onSelect,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  debounceDelay = 500,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced fetch function
  const fetchOptions = useCallback(async () => {
    if (!fetchData) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchData(searchTerm);
      setOptions(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dropdown options:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, searchTerm]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOptions();
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [fetchOptions, debounceDelay]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(valueField ? option[valueField] : option);
    }
  };

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen && options.length === 0) {
      fetchOptions();
    }
  };

  return (
    <div className={`dropdown ${className} ${disabled ? 'disabled' : ''}`}>
      <div 
        className="dropdown-toggle" 
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? selectedOption[displayField] : placeholder}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-search">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="dropdown-options" role="listbox">
            {isLoading ? (
              <div className="dropdown-loading">Loading...</div>
            ) : error ? (
              <div className="dropdown-error">Error: {error}</div>
            ) : options.length === 0 ? (
              <div className="dropdown-no-results">No options found</div>
            ) : (
              options.map((option, index) => (
                <div
                  key={valueField ? option[valueField] : index}
                  className={`dropdown-option ${
                    selectedOption && 
                    selectedOption[valueField] === option[valueField] ? 'selected' : ''
                  }`}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={
                    selectedOption && 
                    selectedOption[valueField] === option[valueField]
                  }
                >
                  {option[displayField]}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

GenericDropdown.propTypes = {
  fetchData: PropTypes.func.isRequired, // Function that returns a Promise with data
  displayField: PropTypes.string.isRequired, // Which field to display in dropdown
  valueField: PropTypes.string, // Which field to use as value (optional)
  onSelect: PropTypes.func.isRequired, // Callback when an option is selected
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  debounceDelay: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default GenericDropdown;