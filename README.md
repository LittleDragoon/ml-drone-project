<!-- Title -->
<h1 align="center">Reinforcement Learning x Crazyflie</h1>
<div align="center" >Benjamin ZHU - 4A Mines Nancy - Sept 2023 à Jan 2024</div>

<!-- Introduction -->
<h2>Introduction</h2>
<p align="justify">

</p>

ℹ️ This repository is only the `front-end part` of the `whole` project we have been working on with [Romain Maillard](https://www.linkedin.com/in/romain-maillard6/) and [May Ouir](https://www.linkedin.com/in/may-ouir-499b83184/), also at Mines Nancy with me.

You will find the complementary repository (server + AI code) here : [TODO insert]

<!-- Setup -->
<h2>Setup</h2>

- Clone the repository
- `npm install`
- You will need the file `.env` . Contact me on [LinkedIn](https://www.linkedin.com/in/zhu-benjamin/)
- Run the command `npm run dev`

<!-- Choix dataset -->
<h2>Explanation</h2>

Use of NextJs and Tailwind CSS for efficiency and fast development.

1. Folder `pages`
   a) `index.js`: Home page with the login and logout functionality
   b) `training-setup.js`: Second page where the user can fill the parameters of the training via a form
   c) `training-history.js`: Third page where the user is shown the history of all the trainings via cards
   <br/>
2. Folder `Firebase`: Needed for firebase configuration and permissions to write and read.
   <br/>
3. Folder `components`: Re-usability of components such as navbar, card, route protection layout.
   <br/>
4. Folder `api`: Implementations of the functions to communicate with the server's api.
   <br/>
5. Folder `context`: Use of a context variable (authUser) to keep track of the user's authentification and access to each pages. If not, the user is denied of the access.
   <br/>

<h2>Usage</h2>

⚠️ The main features of this application will not work on the vercel URL as it is only connected to the server `locally`. If you want to work on the whole project, as mentioned before, you also need the server repo which is here : (TODO insert)
