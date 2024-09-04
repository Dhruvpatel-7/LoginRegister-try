import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
