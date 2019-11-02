import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { USER_TYPES } from 'constants/user';
import { setUserType } from 'reducers/MiscDux';

import './TypeSelector.scss';

const TypeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { userType } = useSelector(state => state.misc);

  const toggle = () => setIsOpen(!isOpen);

  const handleTypeSelect = type => {
    dispatch(setUserType(type));
    setIsOpen(false);
  };

  // Required to prevent closing when the dropdown itself is blurred
  const handleBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      onBlur={handleBlur}
      className={`typeselector ${isOpen ? 'typeselector--open' : ''}`}
    >
      <button
        className="typeselector__selected no-outline"
        onClick={toggle}
        type="button"
      >
        <span className="typeselector__selected--text">{userType}</span>
      </button>
      <div className="typeselector__options">
        {USER_TYPES.filter(type => type !== userType).map(type => (
          <button
            className="typeselector__option no-outline"
            key={type}
            onClick={() => handleTypeSelect(type)}
            type="button"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeSelector;
