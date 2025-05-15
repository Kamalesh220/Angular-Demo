import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Well } from '../../Models/WellModel';
import { Select, Store } from '@ngxs/store';
import { WellDataStore } from '../../demo_Form_&_List_Store/well.state';
import { Observable, Subscription } from 'rxjs';
import { deleteWellData, getSingleWellData } from '../../demo_Form_&_List_Store/well.actions';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-demolist',
  templateUrl: './demolist.component.html',
  styleUrl: './demolist.component.css'
})
export class DemolistComponent implements OnInit, AfterViewInit, OnDestroy {

  wells: Well[] = [];
  totalCount : number = 0;

  @Select(WellDataStore.getallWellData) getWellAllData$! : Observable<Well[]>;

  subscription! : Subscription;
  wellName: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: any = ['Well Name', 'Well Type', 'Spud Date', 'Total Depth (m)','Current Pressure (psi)','Production Rate (bbl/day)','Is Operational','Actions'];
  dataSource!: MatTableDataSource<Well>;

  constructor(private store : Store)
  {
    this.subscription = this.getWellAllData$.subscribe((item) => {
      if(item && item.length > 0)
      {
        this.wells = item;
        this.totalCount = item.length;
        this.dataSource = new MatTableDataSource<Well>(item);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else
      {
        this.wells = [];
        this.totalCount = 0;
        this.dataSource = new MatTableDataSource(this.wells);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  
  
  ngOnInit(): void 
  {
    
    console.log(this.sort,"kk")
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.sort,"kk")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//Manual sorting

  // announceSortChange(sort: Sort) {
  //   const data = this.dataSource.data.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.dataSource.data = data;
  //     return;
  //   }

    
  //   this.dataSource.data = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'wellName': return this.compare(a.wellName, b.wellName, isAsc);
  //       case 'wellType': return this.compare(a.wellType, b.wellType, isAsc);
  //       case 'spudDate': return this.compare(a.spudDate?.getTime(), b.spudDate?.getTime(), isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
  //  compare(a: number | string | Date | undefined, b: number | string | Date | undefined, isAsc: boolean) {
  //   return (a == b ? 0 : (a! < b! ? -1 : 1)) * (isAsc ? 1 : -1);
  // }

  editWellData(Id: number) 
  {
    console.log("kk",Id)
    this.store.dispatch(new getSingleWellData(Id));
  }

  deleteWelldata(WellId: number) 
  {
    console.log("gg",WellId)
    this.store.dispatch(new deleteWellData(WellId));
    
    this.editWellData(0);
  }

  ngOnDestroy(): void 
  {
    this.subscription.unsubscribe();
  }
}
