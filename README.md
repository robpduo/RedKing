# Development Process

## Things to remember
  Always git pull before creating a new branch
  
## Creating a new branch
  1. git checkout develop (Start from the develop branch)
  2. git pull
  3. git checkout -b feature/<your-feature> OR style/<component-to-style> OR bug/(bug-to-fix)

## Merging feature branch into develop
  1. save your work and push it to yor branch
    git add . -> git commit -m " " -> git push origin feature/<your-feature>
  2. git checkout develop
  3. git pull (always do a pull before you merge, you will get an error if you try to merge when the develop branch is behind)
  4. git merge your-branch-name
  5. git push (push the changes that you merged into develop)

## Merge Conflicts
  When you get a merge conflict, open VS Code and see what changes need to be approved <br/> <br/>
  ![image](https://user-images.githubusercontent.com/101683611/170808502-61732634-3ad2-442b-914b-a1eb5898a8b8.png)
  
  Click on the changes you want to accept
  Please don't change the models in the Backend or Frontend(IUser, IDeck, ICard) unless everyone agrees, if the models change then all methods that rely on it will    break and there will be a merge conflict for unmerged branches 

  
## Services Impolemented
  Users Services<br/>
    Login: Param: email, passowrd. Ret: user.<br/>
    Register: Param: email, password, firstName, lastName, money. Ret: user <br/>
    Update: Param: user. Ret: updated user <br/>
    Deposit: Param: deckId, amount. Ret: user with updated amount <br/>
  <br/>
  Deck Services<br/>
    Initialize: Param: user. Ret: deck (shuffled)<br/>
    Deal Card: Param: deck. Ret: card. <br/>
  
  *Possibly add a moderator to delete accounts if needed
  
## Pending Services
 
  Retrieve all User Accounts (To display highscores) <br/>
  Withdraw Money (Used For betting) <br/>
  
## Node.js
  npx create-react-app name-of-app --template typescript<br/>

  ### Install Node Modules to be used in React
  (May not have to install all these modules because I may have pushed everything up)
  1. Open Terminal
  2. CD into blackjack-frontend
  3. Run each of these commands in the terminal<br/>
    (npm install)<br/>
    npm i axios<br/>
    npm i react-router-dom<br/>
    npm i react-redux<br/>
    npm i @reduxjs/toolkit<br/>
