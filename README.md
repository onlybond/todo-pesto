                     
<h1 align="center" style="font-weight: bold;">Full Stack Assignment for Pesto-tech 💻</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#routes">API Endpoints</a>
<a href="#colab">Collaborators</a>
<a href="#contribute">Contribute</a> 
</p>


<p align="center">we can add update and delete todos. we can change the status of the todos, this project has a frontend backend and REST api which is built upon the Nextjs framework.</p>


<p align="center">
<a href="https://todos-pesto.vercel.app">📱 Visit this Project</a>
</p>
 
<h2 id="technologies">💻 Technologies</h2>

---
- Next.js - framework(used this because i can create the backend and api in this itself)
- react - library(component based js library used widely for web applications and next is framework built on react)
- shadCn -  Ui library(used pre-made components from this library which saved me a lot of time)
- tailwindCSS- CSS framework(used for styling)
- MongoDB - DB (used for storing the data on the cloud)
- zod - schema validation library
- react-hook-form - used for creating form validation
- typescript - used for type safety
---
 
<h2 id="started">🚀 Getting started</h2>

first clone the project in your local machine 

```bash
git clone https://github.com/onlybond/todo-pesto
```
go to the projet directory and open it in a code editor (i use vscode no offense for vim)
```bash
cd todo-pesto && code .
```

in the terminal run this command to run it in the localhost
```bash
npm i && npm run dev
```

note : if you are a windows user try to give the commands seperately for example 

```bash
npm i 
```
and then 
```bash
npm run dev 
```
---
 
<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your AWS Credentials

```yaml
MONGODB_URI= {YOUR_MONGODB_URI/DATABASENAME}
```
---
 
<h3>Starting</h3>

How to start your project

```bash
cd project-name
npm run dev
```
---
 
<h2 id="routes">📍 API Endpoints</h2>

---
| Route                        | Description                                                |
|------------------------------|------------------------------------------------------------|
| `GET api/todos`              | Retrieves todos from the database. See [response details](#get-todos). |
| `POST api/todos`             | Adds a todo to the database. See [request details](#post-todo). |
| `PATCH api/todos/[:id]`      | Updates a todo in the database according to the ID. See [request details](#patch-todo). |
| `DELETE api/todos/[:id]`     | Deletes a todo in the database according to the ID. See [response details](#delete-todo). |

### <h3 id="get-todos">GET api/todos</h3>

**RESPONSE**
```json
[
  {
    "id": "1",
    "title": "Learn React",
    "desc": "Complete React tutorial",
    "status": "todo",
    "updatedAt": "2024-07-11T14:48:00.000Z",
    "createdAt": "2024-07-11T14:48:00.000Z"
  },
  {
    "id": "2",
    "title": "Learn Next.js",
    "desc": "Build a Next.js app",
    "status": "inprogress",
    "completedby": null,
    "updatedAt": "2024-07-11T14:48:00.000Z",
    "createdAt": "2024-07-11T14:48:00.000Z"
  }
]
```

<h3 id="post-todo">POST api/todos</h3>

**REQUEST**
```json
{
  "title": "Learn TypeScript",
  "desc": "Complete TypeScript tutorial",
  "status": "todo"
}
```

**RESPONSE**
```json
{
  "id": "3",
  "title": "Learn TypeScript",
  "desc": "Complete TypeScript tutorial",
  "status": "todo",
  "completedby": null,
  "createdAt": "2024-07-11T14:48:00.000Z",
  "updatedAt": "2024-07-11T14:48:00.000Z"
}
```

<h3 id="patch-todo">PATCH api/todos/[:id]</h3>

**REQUEST**
```json
{
  "title": "Learn TypeScript",
  "desc": "Complete advanced TypeScript tutorial",
  "status": "inprogress"
}
```

**RESPONSE**
```json
{
  "id": "3",
  "title": "Learn TypeScript",
  "desc": "Complete advanced TypeScript tutorial",
  "status": "inprogress",
  "completedby": null,
  "createdAt": "2024-07-11T14:48:00.000Z",
  "updatedAt": "2024-07-11T15:00:00.000Z"
}
```

<h3 id="delete-todo">DELETE api/todos/[:id]</h3>

**RESPONSE**
```json
{
  "message": "Todo  deleted successfully."
}
```
---
## Usage

To interact with the API, use the provided routes and their respective request formats as shown above. Each route allows you to perform operations on todos stored in the database.

---
