import PropTypes from 'prop-types';
import React from 'react';

function Select({ name, label, selectOptions, ...selectProps }) {
  const id = `select-${name}`;
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={ id }>
        {label}
        <select name={ name } id={ id } { ...selectProps }>
          {selectOptions.map((option) => (
            <option key={ option.value } value={ option.value }>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selectOptions: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    map: PropTypes.func,
  }).isRequired,
};

export default Select;
