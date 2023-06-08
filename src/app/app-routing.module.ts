import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NewsComponent} from "./notes/news/news.component";
import {GamesComponent} from "./game/all-games/games.component";
import {DeveloperComponent} from "./developer/developer-page/developer.component";
import {FaqComponent} from "./faq/faq.component";
import {NoteComponent} from "./notes/note/note.component";
import {CareerComponent} from "./career/career.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {GamePageComponent} from "./game/game-page/game-page.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'news',component:NewsComponent},
  {path:'games',component:GamesComponent},
  {path:'game-page',component:GamePageComponent},
  {path:'developer',component:DeveloperComponent},
  {path:'faq',component:FaqComponent},
  {path:'note',component:NoteComponent},
  {path:'careers',component:CareerComponent},
  {path:'admin',component:AdminComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
