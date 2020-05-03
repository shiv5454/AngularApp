import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserComponent } from '../../user/user.component';
import { WorldComponent } from '../../world/world.component';
import { IndiaComponent } from '../../india/india.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NewsComponent } from '../../news/news.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { HomeComponent } from 'app/home/home.component';
import { CommentComponent } from 'app/comments/comment/comment.component';
import { TaskComponent } from 'app/task/task/task.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home',           component: HomeComponent },
    { path: 'dashboard',      component: DashboardComponent },    
    { path: 'user',           component: UserComponent },
    { path: 'world',          component: WorldComponent },
    { path: 'india',          component: IndiaComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'news',           component: NewsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'icons',        component: IconsComponent },
    { path: 'task',        component: TaskComponent },
    { path: 'comments',        component: CommentComponent },
];
