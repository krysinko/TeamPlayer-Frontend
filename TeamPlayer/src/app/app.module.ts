import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ProjectModel} from '../providers/models/project-model';
import {TaskModel} from '../providers/models/task-model';
import {MeetingModel} from '../providers/models/meeting-model';
import {NoteModel} from '../providers/models/note-model';
import {ParticipantModel} from '../providers/models/participant-model';
import {UserModel} from '../providers/models/user-model';
import {RoleModel} from '../providers/models/role-model';
import {PrivilegesModel} from '../providers/models/privileges-model';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectModel,
    TaskModel,
    MeetingModel,
    NoteModel,
    ParticipantModel,
    UserModel,
    RoleModel,
    PrivilegesModel
  ]
})
export class AppModule {}
