
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'kelly-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  selectedFilter: string = '*';

   constructor(private el: ElementRef) {}

  ngOnInit(): void {
  }


  setFilter(filterValue: string) {
    this.selectedFilter = filterValue;
  }

}
