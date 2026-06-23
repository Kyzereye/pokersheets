import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PokerDataService } from '../shared/poker-data.service';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-poker-sheet',
  standalone: true,
  imports: [MatDividerModule, CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, NgFor, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './poker-sheet.component.html',
  styleUrl: './poker-sheet.component.css'
})
export class PokerSheetComponent implements OnInit {
  firstGameNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
  secondGameNumbers = Array.from({ length: 20 }, (_, i) => i + 21);
  names: string[] = [];

  filteredNames1: Observable<string[]>[] = [];
  filteredNames2: Observable<string[]>[] = [];
  filteredNames3: Observable<string[]>[] = [];

  constructor(public dataService: PokerDataService, private cdr: ChangeDetectorRef) {
    // Initialize filtered names observables after service is injected
    this.filteredNames1 = this.dataService.column1Controls.map(control => 
      control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      )
    );

    this.filteredNames2 = this.dataService.column2Controls.map(control => 
      control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      )
    );

    this.filteredNames3 = this.dataService.column3Controls.map(control => 
      control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      )
    );
  }

  ngOnInit(): void {
    import('../shared/names.data').then(m => {
      this.names = m.NAMES;
      this.cdr.markForCheck();
    });
  }

  // FormControls for each column - use service
  get column1Controls() { return this.dataService.column1Controls; }
  get column2Controls() { return this.dataService.column2Controls; }
  get column3Controls() { return this.dataService.column3Controls; }

  private _filter(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    if (!filterValue) return [];
    return this.names.filter(name => name.toLowerCase().startsWith(filterValue));
  }

}
