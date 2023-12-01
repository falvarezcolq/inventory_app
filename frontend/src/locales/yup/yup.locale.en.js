 export default {
  mixed: {
    default: 'Inválido',
    required: 'Required field',
    oneOf: '${path} Debe ser um dos seguintes valores: ${values}',
    notOneOf: '${path} não pode ser um dos seguintes valores: ${values}',
    notType: function notType(_ref) {
      var path = _ref.path,
          type = _ref.type,
          value = _ref.value,
          originalValue = _ref.originalValue;
      var isCast = originalValue != null && originalValue !== value;
      // var msg = path + " must be a `" + type + "` type, " + ("but the final value was: `" + (value, true) + "`") + (isCast ? " (cast from the value `" + (0, _printValue.default)(originalValue, true) + "`)." : '.');
      let msg = "Formato tipo de dato inválido";
      if(type=='date'){ msg ='¡Fórmato de fecha inválido!';}
      if(value === null) { msg += "\n If \"null\" is intended as an empty value be sure to mark the schema as `.nullable()`"; }
      
      return msg;
    },
  },
  string: {
    length: 'Must be exactly ${length} characters',
    min: 'Must be at least ${min} characters',
    max: 'Must have maximum ${max} characters',
    email: 'Invalid email format',
    url: 'Must be a valid URL format',
    trim: 'Must not have spaces at the beginning or end',
    lowercase: 'Must be uppercase',
    uppercase: 'Must be lowercase',
  },
  number: {
    min: 'Must be minimum ${min}',
    max: 'Must be maximum ${max}',
    lessThan: 'Must be less than ${less}',
    moreThan: 'Must be greater than ${more}',
    notEqual: 'Cannot be equal to ${notEqual}',
    positive: 'Must be a positive number',
    negative: 'Must be a negative number',
    integer: 'Must be an integer',
  },
  date: {
    min: 'Must be greater than ${min}',
    max: 'Must be less than ${max}',
  },
  array: {
    min: 'Must have a minimum of ${min} items',
    max: 'Must have a maximum of ${max} items',
  },
}