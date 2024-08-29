import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertiesdetailsComponent } from './propertiesdetails/propertiesdetails.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdDashboardComponent } from './admin/ad-dashboard/ad-dashboard.component';

const routes: Routes = [
  { path:'', component: IndexComponent },
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path:'prop', component: PropertiesComponent, canActivate:[AuthGuard] },
  { path:'propdet', component: PropertiesdetailsComponent, canActivate:[AuthGuard] },
  { path:'gallery', component: GalleryComponent, canActivate:[AuthGuard] },
  { path:'contact', component: ContactComponent, canActivate:[AuthGuard] },
  { path:'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  { path:'ad1', component: AdDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
