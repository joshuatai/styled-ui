import React, { useState, useRef } from 'react';
import GroupContext from '../GroupContext';

const CheckboxGroup = ({
  children,
  defaultValue,
  disabled,
  size,
  value: valueProp,
  variantColor,
  onChange,
}) => {
  const { current: isControlled } = useRef(valueProp != null);
  const [values, setValues] = useState(defaultValue || []);
  const _values = isControlled ? valueProp : values;
  const _onChange = event => {
    const { checked, value } = event.target;
    let newValues;
    if (checked) {
      newValues = [..._values, value];
    } else {
      newValues = _values.filter(val => val !== value);
    }
    !isControlled && setValues(newValues);
    onChange && onChange(newValues);
  };
  const state = {
    disabled: disabled,
    onChange: _onChange,
    size: size,
    value: _values,
    variantColor: variantColor,
  };

  return (
    <GroupContext.Provider value={state}>
      { children }
    </GroupContext.Provider>
  );
};

export default CheckboxGroup;
