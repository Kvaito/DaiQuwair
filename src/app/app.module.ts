import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from "@angular/fire/compat";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import { HomeComponent } from './home/home.component';
import { DeveloperComponent } from './developer/developer.component';
import { FaqComponent } from './faq/faq.component';
import { CareerComponent } from './career/career.component';
import { NoteComponent } from './notes/note/note.component';
import { GamesComponent } from './games/games.component';
import { NewsComponent } from './notes/news/news.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { AddGameComponent } from './add-game/add-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { GamePageComponent } from './game-page/game-page.component';
import { AddRoadpointComponent } from './roadmap/add-roadpoint/add-roadpoint.component';
import { PointlistComponent } from './roadmap/pointlist/pointlist.component';
import { TasklistDeveloperComponent } from './roadmap/tasklist-developer/tasklist-developer.component';
import { TasklistFromPointComponent } from './roadmap/tasklist-from-point/tasklist-from-point.component';
import { FaqAddComponent } from './faq/faq-add/faq-add.component';
import { FaqEditComponent } from './faq/faq-edit/faq-edit.component';
import { HomeRoadmapComponent } from './roadmap/home-roadmap/home-roadmap.component';
import { CommentsComponent } from './comments/comments.component';
import { DeveloperEditComponent } from './developer-edit/developer-edit.component';
import { FilteringComponent } from './filtering/filtering.component';

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
    FaqEditComponent,
    HomeRoadmapComponent,
    CommentsComponent,
    DeveloperEditComponent,
    FilteringComponent
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
