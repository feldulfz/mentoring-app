import { Component, inject, input, OnInit, output } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropDown } from '../drop-down/drop-down';

@Component({
  selector: 'app-location-selector',
  imports: [
    DropDown,    
    ReactiveFormsModule
  ],
  templateUrl: './location-selector.html',
  styleUrl: './location-selector.css'
})

export class LocationSelector implements OnInit {
  selectionChange = output<any>();
  formSubmitted = input<boolean>(false);

  selectForm!: FormGroup;

  regions: any[] = [];
  provinces: any[] = [];
  municipalities: any[] = [];
  barangays: any[] = [];

  private locationService = inject(LocationService);

  constructor() {
    this.initForm();
  }

  initForm() {
    this.selectForm = new FormGroup({
      regionSelected: new FormControl('', Validators.required),
      provinceSelected: new FormControl('', Validators.required),
      municipalitySelected: new FormControl('', Validators.required),
      barangaySelected: new FormControl('', Validators.required),
      streetInput: new FormControl('')
    }); 
  }

  get regionSelected() {
    return this.selectForm.get('regionSelected');
  }

  get provinceSelected() {
    return this.selectForm.get('provinceSelected');
  }
  
  get municipalitySelected() {
    return this.selectForm.get('municipalitySelected');
  }
  
  get barangaySelected() {
    return this.selectForm.get('barangaySelected');
  }
  

  get regionSelectedControl() {
    return this.selectForm.get('regionSelected') as FormControl;
  }

  get provinceSelectedControl() {
    return this.selectForm.get('provinceSelected') as FormControl;
  }

  get municipalitySelectedControl() {
    return this.selectForm.get('municipalitySelected') as FormControl;
  }  

  get barangaySelectedControl() {
    return this.selectForm.get('barangaySelected') as FormControl;
  }    

  get streetInputControl() {
    return this.selectForm.get('streetInput') as FormControl;
  }      

  ngOnInit(): void {
    this.locationService.getData().subscribe(data => {
      this.regions = Object.keys(data).map(key => ({
        code: key,
        ...data[key]
      }));
    });

    this.selectForm.valueChanges.subscribe(val => {
      const address = {
        region: val.regionSelected.region_name,
        province: val.provinceSelected.name,
        barangay: val.barangaySelected.name,
        street: val.streetInput
      };

      this.selectionChange.emit(address);
    });       
  }

  onRegionChange(): void {
    const selectedRegion = this.regionSelectedControl.value; 

    this.provinces = selectedRegion
      ? Object.keys(selectedRegion.province_list).map(key => ({
        name: key,
        ...selectedRegion.province_list[key]
      }))
      : [];

    this.municipalities = [];
    this.barangays = [];
  }

  onProvinceChange(): void {
    const selectedProvince = this.provinceSelectedControl.value; 

    this.municipalities = selectedProvince
      ? Object.keys(selectedProvince.municipality_list).map(key => ({
        name: key,
        ...selectedProvince.municipality_list[key]
      }))
      : [];
    this.barangays = [];
  }

  onMunicipalityChange(): void {
    const selectedMunicipality = this.municipalitySelectedControl.value; 
    
    this.barangays = selectedMunicipality
      ? selectedMunicipality.barangay_list.map((brgy: string, index: number) => ({
          id: index + 1,  
          name: brgy
        }))
      : [];
  }  

}

