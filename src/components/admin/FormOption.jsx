import PropTypes from 'prop-types';
import React from 'react';
import Input from './Input';
import Select from './Select';

function FormOption({ name, label, value, type, errorMessage, ...props }) {
  return (
    type === 'select'
      ? <Select name={ name } label={ label } { ...props } />
      : (
        <Input
          name={ name }
          label={ label }
          type={ type }
          errorMessage={ errorMessage }
          { ...props }
        />)
  );
}

FormOption.propTypes = {
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

FormOption.defaultProps = {
  errorMessage: null,
  value: null,
};

export default FormOption;
