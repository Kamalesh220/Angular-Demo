import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { addWellData, clearSingleWellData, editWellData } from '../../demo_Form_&_List_Store/well.actions';
import { WellDataStore } from '../../demo_Form_&_List_Store/well.state';
import { Observable, Subscription } from 'rxjs';
import { Well } from '../../Models/WellModel';


@Component({
  selector: 'app-demoform',
  templateUrl: './demoform.component.html',
  styleUrl: './demoform.component.css'
})
export class DemoformComponent implements OnInit,OnDestroy {

  wellForm: FormGroup = new FormGroup({});
  wellformid : number = 0;
  subscription! : Subscription;
  @Select(WellDataStore.getSingleWellData) wellDataPoints$! : Observable<Well>;
   
  constructor(private formbuilder: FormBuilder, private store : Store) {  }
  

  ngOnInit() {
    this.wellForm = this.formbuilder.group({
      wellName: ['', Validators.required],
      wellType: ['', Validators.required],
      spudDate: [''],
      totalDepth: ['', Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)], 
      currentPressure: ['', Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)],
      productionRate: ['', Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)],
      isOperational: [false]
    });

    this.subscription = this.wellDataPoints$.subscribe((item) => {
      if(item == null)
      {
        this.wellformid = 0;
        this.wellForm.reset(); 
      }
      else
      {
        this.wellformid = item.Id;

        this.wellForm.patchValue({
          wellName : item.wellName,
          wellType : item.wellType,
          spudDate : item.spudDate,
          totalDepth : item.totalDepth,
          currentPressure : item.currentPressure,
          productionRate : item.productionRate,
          isOperational : item.isOperational
        });
      }
    })
  }

  onSubmit() {
    if (this.wellForm.valid) {
      if(this.wellformid == 0)
      {
        console.log('Form submitted:', this.wellForm.value);

        this.store.dispatch(new addWellData(this.wellForm.value));

        this.store.dispatch(new clearSingleWellData());
        this.wellForm.reset();
      }
      else
      {
        console.log('Form submitted:', this.wellForm.value);

        this.store.dispatch(new editWellData(this.wellForm.value, this.wellformid));

        this.store.dispatch(new clearSingleWellData());
        this.wellForm.reset();
      }
      
    } else {
      console.log('Form is invalid. Please check the errors.');
    }
  }

  get wellNameControl() { return this.wellForm.get('wellName'); }
  get wellTypeControl() { return this.wellForm.get('wellType'); }
  get totalDepthControl() { return this.wellForm.get('totalDepth'); }
  get currentPressureControl() { return this.wellForm.get('currentPressure'); }
  get productionRateControl() { return this.wellForm.get('productionRate'); }

  onFormReset() 
  {
    this.store.dispatch(new clearSingleWellData());
   this.wellForm.reset(); 
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
   this.store.dispatch(new clearSingleWellData());
   this.wellForm.reset(); 
  }

  
    
}
