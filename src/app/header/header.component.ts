import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AutocompleteFieldComponent } from '../shared/autocomplete-field/autocomplete-field.component';
import { VENUES } from '../shared/venues.data';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, AutocompleteFieldComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  venueControl = new FormControl('Dillingers');
  venues = VENUES;
}
