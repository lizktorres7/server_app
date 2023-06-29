//PARA CUANDO SE PUEDA O NO ENVIAR EL NAME --- SOLO QUE SI SE ENVIA QUE NO SEA UN ESTRING VASIO ----
const NameNotEmpty = async (name) => {
  if (name === "" || name.length < 4) {
    throw new Error("the name is empty or less than four characters");
  }
};

//SI SE ENVIA EL EMAIL TIENE QUE SER VALIDO
const EmailNotEmpty = async (email) => {
  if (email && !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
    throw new Error("the email is invalid");
  }
};

module.exports = {
  NameNotEmpty,
  EmailNotEmpty,
};
