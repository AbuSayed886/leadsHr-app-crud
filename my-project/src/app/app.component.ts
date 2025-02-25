import { Component } from '@angular/core';
import { AccountCComponent } from './components/account-c/account-c.component';
import { EmployeeCComponent } from './components/employee-c/employee-c.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  //imports: [AccountCComponent,EmployeeCComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-project';
}
