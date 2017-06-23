import React from 'react';
import { render } from 'react-dom';

import Root from './Root';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

Number.prototype.customFormatNumber = function() {
  var value = '0';
  if (!isNaN(parseFloat(this)) && isFinite(this)) {
    value = this.toFixed(2).toString().replace('.', ',');
  }

  return value;
};

render(<Root />, document.getElementById('root'));
