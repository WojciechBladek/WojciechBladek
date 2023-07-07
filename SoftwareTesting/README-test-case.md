

| Test case   |             |             |            |
| ----------- | ----------- | ----------- | -----------|
| Title | Application password recovery |
| Objective of the Test | Checking the application password recovery mechanism |
| Preconditions | **E-mail addresses are known:**                                        **[email 1]** - email address existing in the application; **[e-mail 2]** - an e-mail address that does not exist in the application; Access to the **[email 1]** and **[email 2]** mailboxes themselves; |
| Requirements | 2 |
| Type of test | positive-negative |
| - |   | 
| - |   |
| Step number | Step description | Expected result | Current result |
| 1 | open login page | page has been opened |
| 2 | Check for the "I don't remember my password" link on the page. | The link is visible |
| 3 | Click on the "Forgot Password" link | The user was redirected to a separate password recovery page. |
| 4 | Check that the "Email address" and "Captcha" fields are present on the page. | The fields are visible |
| 5 | Enter [email 1] in the "Email address" field, and leave the "Captcha" field blank and generate a new password. | The user is informed that the "Captcha" field is required. |
| 6 | Leave the "Email address" field blank, and fill in the "Captcha" field correctly and generate a new password. | The user is told that the "Email address" field is required. |
| 7 | Enter [email 1] in the "Email address" field, and fill in the "Captcha" field incorrectly and generate a new password. | The user receives a message that the "Captcha" field was filled in incorrectly. |
| 8 | Enter [email 2] in the "Email address" field, and complete the "Captcha" field correctly and generate a new password. | The user is supposed to be told that this "Email address" does not exist in the application. |
| 9 | Enter [email 1] in the "Email address" field, and complete the "Captcha" field correctly and generate a new password. | Użytkownik otrzymuję informację, o wygenerowaniu nowego hasła. |
| 10 | Go to your [email 1] inbox and verify that you received the link to change your password, generated in step 9. | The link to change the password has been sent. |
| 11 | Change your password to a new one using the link sent to [email 1] and log in to the application. | The user has been logged in. |
| 12 | Go to the [email 2] inbox and verify that you received the link to change your password, generated in step 8. | The link to change the password has not been sent. |


