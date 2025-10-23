import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  imports: [RouterLink, RouterModule],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.scss'
})
export class NavLink {


  link = input('');
  text = input('Link Name');

}
