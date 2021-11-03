import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-instance-selector',
  templateUrl: './instance-selector.component.html',
  styleUrls: ['./instance-selector.component.css']
})
export class InstanceSelectorComponent implements OnInit {

  regions: string[] = [];
  cores: number[] = [];
  instances: any = [];
  spotAdvisorForm: FormGroup = new FormGroup({});
  flag: boolean = false;
  submitted: boolean = false;

  constructor(private api: ApiServiceService, private fb: FormBuilder, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    //Initialize Reactive form
    this.spotAdvisorForm = this.fb.group({
      awsRegions: ['', Validators.required],
      ram: ['0', Validators.required],
      cores: ['', Validators.required],
      instances: [`${this.instances[0]}`, Validators.required]
    })

    //Make call to API to fetch json data
    this.api.getSpotAdvisorData().subscribe(
      (data) => {
        this.api.setAPIData(data);
        this.regions = this.api.getAWSRegions();
        this.cores = this.api.getCoresList();

        this.spotAdvisorForm.patchValue({
          awsRegions: this.regions[0],
          cores: this.cores[0]
        })

        //Based on selected region,core and ram select 3 least interruption rate instances
        this.selectInstances();
      }
    )
  }

  selectInstances() {
    this.api.filterInstances(this.spotAdvisorForm.value).then(
      data => {
        this.instances = data.map((ele) => {
          return ele[0];
        })
        if (this.flag) {
          this.cd.detectChanges();
        }
        this.flag = true;
        this.spotAdvisorForm.patchValue({
          instances: this.instances[0]
        })
      }
    )
  }

  onAWSRegionChanged(event: any) {
    this.spotAdvisorForm.patchValue({
      awsRegions: event
    })
    this.selectInstances();
  }

  onRAMChanged(event: any) {
    this.spotAdvisorForm.patchValue({
      ram: event.target.value
    })
    this.selectInstances();
  }

  onCPUChanged(event: any) {
    this.spotAdvisorForm.patchValue({
      cores: event
    })
    this.selectInstances();
  }

  onInstanceChanged(event: any) {
    this.spotAdvisorForm.patchValue({
      instances: event
    })
  }

  onSportAdvisorSubmit() {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 3000)
  }
}
