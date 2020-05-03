import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { WorldComponent } from '../../world/world.component';
import { IndiaComponent } from '../../india/india.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NewsComponent } from '../../news/news.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ErrorComponent } from 'app/shared/error/error.component';
import { CarouselComponent } from 'app/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select'
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,    
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    MatTableModule,
    MatInputModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    WorldComponent,
    IndiaComponent,
    IconsComponent,
    MapsComponent,
    NewsComponent,
    UpgradeComponent,
    ErrorComponent,
    CarouselComponent,
  ]
})

export class AdminLayoutModule {}
