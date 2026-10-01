import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { filterOptions } from '../filter-options';

@Component({
  selector: 'app-autocomplete-field',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-field.component.html',
  styleUrl: './autocomplete-field.component.css',
})
export class AutocompleteFieldComponent implements OnInit {
  @Input() number?: number;
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: string[];

  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    // Reads this.options on each keystroke, so a list that loads later is picked up.
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(this.control.value ?? ''),
      map(value => filterOptions(this.options, value ?? '')),
    );
  }
}
