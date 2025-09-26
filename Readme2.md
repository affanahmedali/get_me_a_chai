This file contains info about internall logic (how the project is built) and is not needed for using the project. Basically explains the extra fuctions/code

## Login page

### Redirect to dashboard if user is logedin

Three different mechanisms were built for above mentioned logic

this explanation is specific to how the project works, theoratical explanation can be found in chat gpt converstion `Next.js 15 Features` on 2-4-25
(this is personal note and not for public)
login button in navbar redirects to login page, here

1. the logic 1 causes an error
Error: Cannot update a component (`Router`) while rendering a different component (`Login`). To locate the bad setState() call inside `Login`, follow the stack trace as described in <https://react.dev/link/setstate-in-render>
Source:
authenticate @ auth.js:12
Login @ D:\Programming\Web d…pp\login\page.js:10

2. logic 2 works fine but the function checkAuth (in logic 2) needs to be called, otherwise it does not work and hence does not redirect
You can not call the fucntion after it is declared, it needs to be called in `return` part, where it will be triggered by a ui element such as button otherwise react will be stuck in infinite loop
Note: This (calling in retun part) does not allign with login page structure I initially built (page_org.js)
If already logedin and then call the fucntion after it is declared, it thorws following error
Error: cannot update a component (`Router`) while rendering a different component (`Login`). To locate the bad setState() call inside `Login`, follow the stack trace as described in <https://react.dev/link/setstate-in-render>
Source:
authenticate @ auth.js:12
checkAuth @ D:\Programming\Web d…pp\login\page.js:19
Login @ D:\Programming\Web d…pp\login\page.js:24
<ForwardRef(LinkComponent)>  
Navbar @ D:\Programming\Web d…onents\Navbar.js:44
"use client"  
RootLayout @ layout.js:25
"use server"  

3. logic 3 works but displays login page for a moment even when the user is logged in beacuse it use useEffect hook which works after initial render.

SOLUTION: It is better to use middleware instead of any logic in the login page because it is a  client component.

## Payment Mechanism

### Initial approach

1. collect payment form from user's page
2. check (in database?) if user credentials (dashboard form) are entered or not
    - if credentials found perform step 6 to 8
    - if not
3. redirect to dashboard page
4. get data from dashboard form
5. send it to the server
6. associate the the payemntform with credentials (from dashboard form) along with user identity
7. save to database
8. display the message on users page.

### Final approach

1. collect payment form from user's page

## Note

fetchUser in `[username]` is used for getting the username of the person who owns the page, who we will support.
fetchUser in `dashboard` is used for getting the username of the person who is logedin

## Need to Implement

Need to implement this in app\api\payment\route.js
Check if user payment info (for user who is donating) are present in database.

Also when a user logs in (donating user) they should be prompted to Dashboard, to enter credentials and that should be saved in databse.

Need to display messges on the users page from donatees

DONE


Need to retrive name displayed at Navbar from database instead of github.
