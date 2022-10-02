import React, { LabelHTMLAttributes } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> { }

const Label: React.FC<Props> = (props) => {
  return (<label {...props} />);
}

export { Label };