import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { catchError, defaultIfEmpty, map, Observable, of, tap } from 'rxjs';
import { RescueCard, RescueDataSheet } from '../core/interfaces/rescue-data-sheets.interface';
import { BackendService } from '../core/services/backend.service';
import { ModalComponent } from '../shared/components/modal/modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({});
  responseObject$: Observable<Partial<RescueDataSheet>> = new Observable();
  recivedCards$: Observable<RescueCard[]> = new Observable();
  card:Partial<RescueCard>[] = []

  constructor(private backendService: BackendService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
    search: new FormControl(null, [ Validators.maxLength(7), Validators.required ])
  });
  }

  submit() {
    if (this.searchForm.valid) {
      const resObject$ = this.backendService.search(this.searchForm.value.search);
      this.responseObject$ = resObject$.pipe(
        //dla json-server każdy błąd przewidziany
        catchError(error => of({
          error: true,
          code: 500,
          description: "Inny poważny błąd",
          error_hash: "#0x00000000"
        }))
      )
      //const cards$ = this.backendService.search(this.searchForm.value.search);
      this.recivedCards$ = resObject$.pipe(
        map(data => data.rescue_cards),
        defaultIfEmpty([])
      )
    }
  }

   openDialog1() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '',
      left: ''
    };
    dialogConfig.minWidth = '320px'
    dialogConfig.maxWidth = '500px'
    dialogConfig.maxHeight = '500px'

     dialogConfig.data = {
      description: 'Rest api z json obsługuje 1-10 jako poprawnie znalezione odpowiedzi i p1-5 jako błędne wyszukania',
      title: 'Jak szukać',
      closeButtonText: 'Zamknij'
     }

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //     data => console.log("Dialog output:", data)
    // );

   }
  openDialog2() {
    const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = false
     dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '',
      left: ''
    };
    dialogConfig.minWidth = '320px'
    dialogConfig.maxWidth = '500px'
    dialogConfig.maxHeight = '500px'

     dialogConfig.data = {
       description: 'test test test test test test test test test test test test test test test test test test test',
       title: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
       closeButtonText: 'Zamknij'
     }

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //     data => console.log("Dialog output:", data)
    // );

  }

}
