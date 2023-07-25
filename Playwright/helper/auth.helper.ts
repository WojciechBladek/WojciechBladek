import fs from "fs";

export const loginData = 'playwright.env.json'

export class Authentication  {
  constructor(private path: string) {
    
  }
  loginDataFile(){
    try {
      const loginDataFile = fs.readFileSync(this.path, {
        encoding: "utf8",
      });
      if (loginDataFile) {
        const loginData = JSON.parse(loginDataFile);
        return loginData;
      }
    } catch (error) {
      console.log("This file can be read only in CI process");
    }
  };
  email = this.loginDataFile().user.email;
  password = this.loginDataFile().user.password;
}


