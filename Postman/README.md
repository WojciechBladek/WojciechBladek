# Here you will find automatic tests written to postman

## To use the tests, I recommend exporting and then importing the tests into postman and running them on the native postman runner

### HOW TO IMPORT TESTS: 

Go to the postman
<br/>

- Import collection 
    1. Click Import
    2. Attach file collection.postman.json
    
<br/>

- Import environment variables
    1. Click Import
    2. Attach file DEV.postman_environment.json

**Not all scripts will work properly, if you do not run them in the test runner, for example, the script for iterating through pages only works in the test runner should be remembered, it is executed there automatically.**

# U can run collection by using NEWMAN
User script bellow in terminal
```javascript
newman run ./Postman/collection.postman.json -e ./Postman/DEV.postman_environment.json —-global-var
```