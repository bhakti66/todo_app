import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { TodoListComponent } from './todo-list/todo-list.component'

const routes: Routes = [
  { path: "", component:  LoginComponent},
  { path: "register", component: RegistrationComponent },
  { path: "profile", component: UpdateProfileComponent },
  { path: "todolist", component: TodoListComponent }
  // { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
