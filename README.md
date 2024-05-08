The app is developed using Expo Cli in Visual Studio Code platform. This is a react-native project written in typescript.

Run "npm start" Type "i" to open iOS simulator and "a" to open Android emulator.

The main aim of the app is to add and view expenses of a particular user.

I used Context API for state management and implemented animations, JSON server for backend and added many libraries to get the native feel for the app.

My app contains the following:
Landing Page/Login Page: Here we have to login else need to register. 
Register Page: A new user need to create their account giving the details. 
Expenses Page: This page displays all the Expenses of user, it has a search bar where the expenses matched with the search query gets displayed, sort icon beside search bar displays the items whose expense amount is higher and could be searched as well. At the right bottom there is a plus icon when clicked, it navigates to Add Expense screen. Each item also has edit and delete features. When clicked on the item a card view of item is displayed.
Add Expense Page: It contains a form which includes the title, date, description, amount and a dropdown category of the item. The UI of date picker is different for Android and iOS. When the text fields are filled and clicked on Add, the item gets added to Expenses screen. The screen name and button changes to Update Expense and Save respectively in edit mode. For the category there is an additional option of other, when clciked ont hat it changes to text field where we can type the category.
Here attaching iOS simulator screenshots.

<img width="297" alt="Screenshot 2024-05-08 at 11 45 05 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/280f7ea1-1e7c-4792-afbf-39af6a9a2afe">
<img width="305" alt="Screenshot 2024-05-08 at 11 45 20 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/597d7bae-d937-4df5-9574-6c9e6a8678f2">
<img width="298" alt="Screenshot 2024-05-08 at 11 53 06 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/88ca0e71-a4ed-4501-9d3b-c6ec9681b17f">
<img width="310" alt="Screenshot 2024-05-08 at 11 44 16 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/2d2641e5-569d-460f-ad95-b05bd4896841">
<img width="312" alt="Screenshot 2024-05-08 at 11 44 06 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/8cba4051-d370-4512-8d3c-cb5db32302ed">
<img width="319" alt="Screenshot 2024-05-08 at 11 44 32 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/ed83b586-368e-489e-9759-3966d9550679">
<img width="303" alt="Screenshot 2024-05-08 at 11 44 46 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/939bdaab-fa1a-410e-bf68-9738997e34ee">
<img width="300" alt="Screenshot 2024-05-08 at 11 52 41 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/d8b8b198-fabf-4804-a3dd-ccf4567b0138">
<img width="296" alt="Screenshot 2024-05-08 at 11 43 16 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/12e3d524-cb58-4035-8190-ad87eb0417f6">
<img width="305" alt="Screenshot 2024-05-08 at 11 43 39 AM" src="https://github.com/jahnavi-vemuri/ExpenseTrackerApp/assets/127096031/5bf69fe4-e6fd-48ac-a051-c24c2dafb0cd">
