import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from "@angular/fire/compat";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import { HomeComponent } from './home/home.component';
import { DeveloperComponent } from './developer/developer-page/developer.component';
import { FaqComponent } from './faq/faq.component';
import { CareerComponent } from './career/career.component';
import { NoteComponent } from './notes/note/note.component';
import { GamesComponent } from './game/all-games/games.component';
import { NewsComponent } from './notes/news/news.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { AddGameComponent } from './game/add-game/add-game.component';
import { EditGameComponent } from './game/edit-game/edit-game.component';
import { GamePageComponent } from './game/game-page/game-page.component';
import { AddRoadpointComponent } from './roadmap/add-roadpoint/add-roadpoint.component';
import { PointlistComponent } from './roadmap/pointlist/pointlist.component';
import { TasklistDeveloperComponent } from './roadmap/tasklist-developer/tasklist-developer.component';
import { TasklistFromPointComponent } from './roadmap/tasklist-from-point/tasklist-from-point.component';
import { FaqAddComponent } from './faq/faq-add/faq-add.component';
import { HomeRoadmapComponent } from './roadmap/home-roadmap/home-roadmap.component';
import { CommentsComponent } from './comments/comments.component';
import { DeveloperEditComponent } from './developer/developer-edit/developer-edit.component';
import { FilteringComponent } from './filtering/filtering.component';
import { FaqListComponent } from './faq/faq-list/faq-list.component';
import { UserCardComponent } from './developer/developer-card/user-card.component';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';
import { CommentItemComponent } from './comments/comment-item/comment-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeveloperComponent,
    FaqComponent,
    CareerComponent,
    NoteComponent,
    GamesComponent,
    NewsComponent,
    FooterComponent,
    MenuComponent,
    AdminComponent,
    LoginComponent,
    EditNoteComponent,
    AddNoteComponent,
    AddGameComponent,
    EditGameComponent,
    GamePageComponent,
    AddRoadpointComponent,
    PointlistComponent,
    TasklistDeveloperComponent,
    TasklistFromPointComponent,
    FaqAddComponent,
    HomeRoadmapComponent,
    CommentsComponent,
    DeveloperEditComponent,
    FilteringComponent,
    FaqListComponent,
    UserCardComponent,
    CommentCreateComponent,
    CommentItemComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
