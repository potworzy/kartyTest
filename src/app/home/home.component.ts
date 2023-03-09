import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, defaultIfEmpty, map, Observable, of, tap } from 'rxjs';
import { RescueCard, RescueDataSheet } from '../core/interfaces/rescue-data-sheets.interface';
import { BackendService } from '../core/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({});
  responseObject$: Observable<Partial<RescueDataSheet>> = new Observable();
  recivedCards$: Observable<RescueCard[]> = new Observable();

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
    search: new FormControl(null, [ Validators.maxLength(7), Validators.required ])
  });
  }

  submit() {
    if (this.searchForm.valid) {
      const resObject$ = this.backendService.search(this.searchForm.value.search);
      this.responseObject$ = resObject$.pipe(
        catchError(error => of({
          error: true,
          code: 5,
          description: "Inny poważny błąd",
          error_hash: "#0x1a2b3c4d5e6"
        }))
      )
      const cards$ = this.backendService.search(this.searchForm.value.search);
      this.recivedCards$ = cards$.pipe(
        map(data => data.rescue_cards),
        defaultIfEmpty([])
      )
    }
  }

}
