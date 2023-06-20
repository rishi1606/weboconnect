class User {
    constructor({ name, email, gender, phone, password, status, date }) {
      this.name = name;
      this.email = email;
      this.gender = gender;
      this.phone = phone;
      this.password = password;
      this.status = status;
      this.date = date;
    }
  }
  
  module.exports = User;
  