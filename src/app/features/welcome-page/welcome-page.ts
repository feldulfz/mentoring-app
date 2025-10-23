import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from "../../shared/components/navbar/navbar";
import { Footer } from "../../shared/components/footer/footer";
import { SlidingCard } from "../../shared/components/sliding-card/sliding-card";
@Component({
  selector: 'app-welcome-page',
  imports: [RouterModule, Navbar, Footer, SlidingCard ],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss'
})
export class WelcomePage {

}
