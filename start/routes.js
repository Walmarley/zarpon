'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post("/register", "AuthController.register").middleware(["auth"]);
Route.post("/authenticate", "AuthController.authenticate")

Route.group(()=> {
  Route.resource("user", "AuthController")
  Route.get("/user", "AuthController.index").middleware(["auth"]);
  Route.get("/user/:id", "AuthController.show").middleware(["auth"]);
  Route.put("/user/:id", "AuthController.update").middleware(["auth"]);
  Route.delete("/user/:id", "AuthController.destroy").middleware(["auth"]);
})