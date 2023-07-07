interface User {
  firstName: string;
  lastName: string;
  age: number;
  profession: string;
  emailMe: Function;
  aboutMe: Function;
  useMySkills: Function;
  enjoyBetterQuality: Function;
}

class QA {
  firstName: string = "Wojciech";
  lastName: string = "Błądek";
  age: number = 29;
  profession: string = "Quality Assurance Engineer";

  emailMe() {
    console.log("wojciechbladekk@gmail.com");
  }

  aboutMe() {
    console.log(`
        My position is Quality Assurance, I am in charge of maintaining     
         quality in projects, I started the adventure of my profession as 
         early as 2021, since then I develop my skills every day until 
         today
    
        I am passionate when it comes to software testing, my most important 
         trait in this profession by far is meticulousness, perfectionism, 
         communicativeness
    `);
  }
  useMySkills() {
    console.log(`
        Quality assurance, Software testing, Manual Testing ,Automation 
        Testing ,Jira ,Postman ,Playwright ,Testing methodology ,Web Apps - 
        Testing ,Scrum ,Agile ,Rest API ,JavaScript ,TypeScript ,SQL ,GIT,
        BrowserStack, ISTQB knowledge ,DevTools ,CI/CD ,UML Sequnce
        Diagram ,Block Diagram
        `);
  }
  enjoyBetterQuality() {
    return "Happy Clients";
  }
}

const wojciech: User = new QA();
wojciech.aboutMe();
wojciech.emailMe();
wojciech.useMySkills();
wojciech.enjoyBetterQuality();
