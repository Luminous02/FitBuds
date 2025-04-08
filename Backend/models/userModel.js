class userModel {
  constructor(user) {
    //might need to enforce typing
    this.id = user.userID;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.fname = user.fname;
    this.bday = user.bday;
  }
}

export default userModel;
