import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AutocompleteFieldComponent } from '../shared/autocomplete-field/autocomplete-field.component';
import { DEALERS } from '../shared/dealers.data';
import { NamesService } from '../shared/names.service';
import { PokerDataService } from '../shared/poker-data.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NgFor, MatCardModule, MatDividerModule, AutocompleteFieldComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent implements OnInit {
  gameOne = Array.from({ length: 10 }, (_, i) => i + 1);
  gameTwo = Array.from({ length: 4 }, (_, i) => i + 1);
  names: string[] = [];
  dealers = DEALERS;

  constructor(public data: PokerDataService, private namesService: NamesService) {}

  ngOnInit(): void {
    this.namesService.getNames().then(names => (this.names = names));
  }
}
