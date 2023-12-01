 export default {
  mixed: {
    default: 'Inválido',
    required: 'Campo obligatorio',
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
    length: 'Debe tener exatamente ${length} caracteres',
    min: 'Debe tener al menos ${min} caracteres',
    max: 'Debe tener máximo ${max} caracteres',
    email: 'Formato de correo inválido',
    url: 'Debe ter un formato de URL válido',
    trim: 'No debe tener espacios en el inicio ni en el final',
    lowercase: 'Debe estar en mayúscula',
    uppercase: 'Debe estar en minúscula',
  },
  number: {
    min: ' Debe ser mínimo ${min}',
    max: ' Debe ser máximo ${max}',
    lessThan: ' Debe ser menor que ${less}',
    moreThan: ' Debe ser mayor que ${more}',
    notEqual: ' No puede ser igual a ${notEqual}',
    positive: ' Debe ser un número positivo',
    negative: ' Debe ser un número negativo',
    integer: ' Debe ser un número entero',
  },
  date: {
    min: 'Debe ser mayor a ${min}',
    max: 'Debe ser menor a ${max}',
  },
  array: {
    min: 'Debe tener un mínimo de ${min} items',
    max: 'Debe tener un máximo de ${max} items',
  },
}