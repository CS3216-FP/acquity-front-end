import React from 'react';
import Select from 'react-dropdown-select';

import InputDropdownSelectGhost from './InputDropdownSelectGhost';
import './InputDropdownSelect.scss';

const customLoadingRenderer = () => <div />;

const customContentRenderer = ({ state }) => {
  const { values } = state;

  if (values[0]) {
    return <div className="input__dropdown__display">{values[0].name}</div>;
  }

  return <div className="input__dropdown__display--none">Company</div>;
};

const customDropdownRenderer = ({ props, state, methods }) => {
  const regexp = new RegExp(state.search, 'i');
  const { options, loading } = props;

  if (loading) {
    return <InputDropdownSelectGhost />;
  }

  return (
    <div className="input__dropdown__dropdown">
      <div className="dropdown__search dropdown-item">
        <input
          className="dropdown__search__input input"
          type="text"
          value={state.search}
          onKeyPress={evt => {
            // Needed to prevent enter key from submitting form
            if (evt.which === 13 /* Enter */) {
              evt.preventDefault();
            }
          }}
          onChange={methods.setSearch}
          placeholder="Search"
        />
      </div>
      <hr className="dropdown-divider" />
      <div className="dropdown__items">
        {options
          .filter(item =>
            regexp.test(item[props.searchBy] || item[props.labelField])
          )
          .map((option, optionIndex) => {
            if (!props.keepSelectedInList && methods.isSelected(option)) {
              return null;
            }

            return (
              <div
                className={`dropdown__items__item dropdown-item ${
                  state.cursor === optionIndex
                    ? 'dropdown__items__item--active'
                    : ''
                }
                  ${
                    methods.isSelected(option)
                      ? 'dropdown__items__item--selected'
                      : ''
                  }

                `}
                disabled={option.disabled}
                key={option[props.valueField]}
                onClick={option.disabled ? null : () => methods.addItem(option)}
                onKeyPress={
                  option.disabled ? null : () => methods.addItem(option)
                }
              >
                <div className="dropdown__items__item__label">
                  {option[props.iconField]}
                  {option[props.labelField]}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const InputDropdownSelect = ({
  onChange,
  isLoading,
  isError,
  options,
  valueField,
  labelField,
  iconField,
  handleBlur,
  values = [],
  useDefaultStyles = true
}) => {
  return (
    <Select
      contentRenderer={customContentRenderer}
      dropdownRenderer={customDropdownRenderer}
      loadingRenderer={customLoadingRenderer}
      className={`dropdown input__dropdown ${
        useDefaultStyles ? 'default' : ''
      } ${isError ? 'is-danger' : ''}`}
      loading={isLoading}
      valueField={valueField}
      labelField={labelField}
      iconField={iconField}
      searchBy={labelField}
      values={values}
      closeOnSelect
      searchable={false}
      placeholder=""
      options={options}
      onChange={onChange}
      onDropdownClose={handleBlur}
      style={{}}
    />
  );
};

export default InputDropdownSelect;
