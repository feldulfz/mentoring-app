import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { Footer } from "../../shared/components/footer/footer";
import { SlidingCard } from "../../shared/components/sliding-card/sliding-card";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-welcome-page',
  imports: [RouterModule, Navbar, Footer, SlidingCard ],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss'
})
export class WelcomePage {

}
