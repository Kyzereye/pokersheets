import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AutocompleteFieldComponent } from '../shared/autocomplete-field/autocomplete-field.component';
import { NamesService } from '../shared/names.service';
import { PokerDataService } from '../shared/poker-data.service';

@Component({
  selector: 'app-poker-sheet',
  standalone: true,
  imports: [NgFor, MatCardModule, MatDividerModule, AutocompleteFieldComponent],
  templateUrl: './poker-sheet.component.html',
  styleUrl: './poker-sheet.component.css',
})
export class PokerSheetComponent implements OnInit {
  firstGame = Array.from({ length: 20 }, (_, i) => i + 1);
  secondGame = Array.from({ length: 20 }, (_, i) => i + 21);
  names: string[] = [];

  constructor(public data: PokerDataService, private namesService: NamesService) {}

  ngOnInit(): void {
    this.namesService.getNames().then(names => (this.names = names));
  }
}
