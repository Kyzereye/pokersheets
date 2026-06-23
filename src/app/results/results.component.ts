import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map } from 'rxjs';
import { DEALERS } from '../shared/dealers.data';
import { PokerDataService } from '../shared/poker-data.service'; 

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatDividerModule, CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, 
            FormsModule, NgFor, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  names: string[] = [];
  dealers = DEALERS;

  gameOneResults = Array.from({ length: 10 }, (_, i) => i + 1);
  gameTwoResults = Array.from({ length: 4 }, (_, i) => i + 1);

  filteredNames1: Observable<string[]>[] = [];
  filteredNames2: Observable<string[]>[] = [];
  filteredDealers1: Observable<string[]> = new Observable();
  filteredDealers2: Observable<string[]> = new Observable();
  filteredDealers3: Observable<string[]> = new Observable();
  filteredDealers4: Observable<string[]> = new Observable();

  constructor(public dataService: PokerDataService, private cdr: ChangeDetectorRef) {
    // Initialize filtered names observables after service is injected
    this.filteredNames1 = this.dataService.gameOneControls.map(control => 
      control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      )
    );

    this.filteredNames2 = this.dataService.gameTwoControls.map(control => 
      control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      )
    );
  
    this.filteredDealers1 = this.dataService.dealerControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDealers(value || ''))
    );

    this.filteredDealers2 = this.dataService.dealerControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDealers(value || ''))
    );

    this.filteredDealers3 = this.dataService.dealerControl3.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDealers(value || ''))
    );

    this.filteredDealers4 = this.dataService.dealerControl4.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDealers(value || ''))
    );
  }

  ngOnInit(): void {
    import('../shared/names.data').then(m => {
      this.names = m.NAMES;
      this.cdr.markForCheck();
    });
  }

  // FormControls for first game results (10 rows) - use service
  get gameOneControls() { return this.dataService.gameOneControls; }
  
  // FormControls for second game results (4 rows) - use service
  get gameTwoControls() { return this.dataService.gameTwoControls; }
  
  get dealerControl1() { return this.dataService.dealerControl1; }
  get dealerControl2() { return this.dataService.dealerControl2; }
  get dealerControl3() { return this.dataService.dealerControl3; }
  get dealerControl4() { return this.dataService.dealerControl4; }
  
  private _filter(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    if (!filterValue) return [];
    return this.names.filter(name => name.toLowerCase().startsWith(filterValue));
  }

  private _filterDealers(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    if (!filterValue) return [];
    return this.dealers.filter(name => name.toLowerCase().startsWith(filterValue));
  }
}
