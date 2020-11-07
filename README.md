# More Than Metrics - Test Assignment - Bernhard Wittmann

Task: Recreate the given page, with drag and drop and edit functionality

## Explanation of my approach

I used Vue.js in conjunction with Nuxt.js to speed up my development, since I am most fluent with Vue. (Further used technologies: Typescript, Scss/Sass, Axios)

I store the data about the persona and fields in the vuex store. 

The UI is separated in the indepenedent parts: GlobalNav, Header, Sidebar and the PersonaCard.

To ensure the correctness of the doubly linked list of fields within a column I used `@thi.ng/dcons` as an implementation for the linked list.

> Note: Don't wonder about the GET requests not appearing on page load in the logs or network tab of the browser dev tools. 
> Since this is deployed to Github pages the page is statically prerendered and served, which leads to the GET request being made during generation and not on page load. 
> Normally this page would be setup in a normal server environment where the requests would be made on page load.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on the build tools, check out [Nuxt.js docs](https://nuxtjs.org).

## Questions

If any questions should arise, please just send me an email.

Bernhard Wittmann

mail@bernhardwittmann.com
