import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {VENUES} from '../shared/venues.data';
import {Observable, startWith, map} from 'rxjs';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDividerModule, FormsModule, MatCardModule, MatAutocompleteModule, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  venueControl = new FormControl('Dillingers');
  venues = VENUES;

  filteredVenues: Observable<string[]> = this.venueControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || ''))
  );

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.venues.filter(venue => venue.toLowerCase().includes(filterValue));
  }
}
