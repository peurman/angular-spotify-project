import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  textLogo = '../../../../assets/images/SpotyByUs.png';
  isMenuOpen = false;
  showHamburger = false;

  ngOnInit() {
    this.showHamburger = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.showHamburger = window.innerWidth < 768;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
