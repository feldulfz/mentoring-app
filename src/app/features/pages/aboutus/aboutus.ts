import { Component } from '@angular/core';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { Footer } from "../../../shared/components/footer/footer";

@Component({
  selector: 'app-aboutus',
  imports: [Navbar, Footer],
  templateUrl: './aboutus.html',
  styleUrl: './aboutus.scss'
})
export class Aboutus {

}
