## Vue JS (2.0) Test Task

The goal of this task is to implement a web application that gives the user the ability to see the available books in the library, add new ones and edit the existing books. All data should be stored in browser memory. There should not be any implemented server side code. When app starts for the first time it should be filled with 5 mockup books and 5 authors. Developer should assume that this is a small part of a big application and create several independent components that can be reused. For example, having “view/edit book” component separated from the books list is a good idea because it will give an ability to reuse the same component in other application areas. 
The application is required to use  official router library [https://router.vuejs.org/en/installation.html](https://router.vuejs.org/en/installation.html) and state management solution [https://vuex.vuejs.org/en/installation.html](https://vuex.vuejs.org/en/installation.html) 

Book in our application should have these properties:

**ID** 			– 	Book unique number

**ISBN** 			– 	The international book code

**Title**			– 	The title of the book

**Author**		– 	The author of the book. For simplicity it’s just a string. But it should be selected from the predefined array of possible options (authors list) This list should be hard-coded in State. For auto-complete feature, any of 3rd-party components can be used.

**Description** 		– 	Book description

**Record Creation Date** 		– 	The date when the book was added to the library

All these properties should be editable. The data should be stored in browser memory, using Vuex.

#### Web Application should have sections listed below
*List of Books*		– 	Page shows all books from memory storage. User can remove a book from this page or navigate to add/edit book. The list should have search field (search by title and pagination)

*Add/Edit Book* 		– 	Page to add or edit books


# Library (Training Task)

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Live Demo

Check here [http://library.techalin.com/](http://library.techalin.com/)
