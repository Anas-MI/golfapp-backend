// Email validations

export const validateEmail = email => {
  if (email === "" || email === null) {
    return {
      emailError: true,
      emailErrorMsg: "Email can't be empty"
    };
  } else {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === true) {
      return {
        emailError: false,
        emailErrorMsg: ""
      };
    } else {
      return {
        emailError: true,
        emailErrorMsg: "Email is Not Valid"
      };
    }
  }
};

//Name validations
export const validateName = name => {
  if (name === "" || name === null) {
    return {
      nameError: true,
      nameErrorMsg: "Name can't be empty!"
    };
  } else {
    const pattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    const result = pattern.test(name.trim());

    if (result === true) {
      return {
        nameError: false,
        nameErrorMsg: ""
      };
    } else {
      return {
        nameError: true,
        nameErrorMsg: "Name doesn't seems valid"
      };
    }
  }
};

//Country validation
export const validateCountry = country => {
  if (country === "" || country === null) {
    return {
      countryError: true,
      countryErrorMsg: "Country can't be empty!"
    };
  } else {
    return {
      countryError: false,
      countryErrorMsg: ""
    };
  }
};

//State validation
export const validateState = state => {
  if (state === "" || state === null) {
    return {
      stateError: true,
      stateErrorMsg: "Name can't be empty!"
    };
  } else {
    return {
      stateError: false,
      stateErrorMsg: ""
    };
  }
};

//empty or not validation
export const validateField = state => {
  if (state === "" || state === null) {
    return {
      stateError: true,
      ErrorMsg: "Can't be empty!"
    };
  } else {
    return {
      stateError: false,
      ErrorMsg: ""
    };
  }
};

//Phone Number validation
export const validateNumber = number => {
    if(number.length>12){
        return {
            numberError: true,
            numberErrorMsg: "Phone number cant be more than 12 digits"
          };
    } else {

  const pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  const result = pattern.test(number.trim());
  console.log({ result });
  if (result === true) {
    return {
      numberError: false,
      numberErrorMsg: ""
    };
  } else {
    return {
      numberError: true,
      numberErrorMsg: "Number doesn't seems valid"
    };
  }
}};
