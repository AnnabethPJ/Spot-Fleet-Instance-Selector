import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiData: any;
  private awsRegions: string[] = [] //Array to store all AWS regions -- used for dropdown selection

  constructor(private http: HttpClient) { }

  setAPIData(data: any) {
    this.apiData = data;
  }

  getCoresList(): number[] {
    return [1, 2, 4, 8, 16, 32];
  }

  getSpotAdvisorData() {
    return this.http.get('https://spot-bid-advisor.s3.amazonaws.com/spot-advisor-data.json');
  }

  getAWSRegions() {
    this.awsRegions = Object.keys(this.apiData.spot_advisor);
    return this.awsRegions;
  }

  getInstancesOfSelectedRegion(awsRegion: string) {
    return {
      ...this.apiData.spot_advisor[`${awsRegion}`].Linux,
      ...this.apiData.spot_advisor[`${awsRegion}`].Windows
    }
  }

  filterInstancesByRamAndCore(ram: any, core: any): string[] {
    var selectedRamCoreInstArr: string[] = [] //Stores names of all instances whoes ram and cores matches user selection

    //Object.entries converts each key-value of an object to array. ie; array[0] is key and array[1] is value and returns array.
    Object.entries(this.apiData.instance_types).map((element: any[]) => {
      if (element[1]['ram_gb'] >= ram && element[1]['cores'] >= core) {
        selectedRamCoreInstArr.push(element[0]);
      }
    })

    return selectedRamCoreInstArr;
  }

  getLeastInterruptionRateInstanceList(instancesOfSelectedRegion: {}, instancesOfSelectedRamCore: any[], count: number) {
    var leastInterruptionInstanceList: any[] = []

    leastInterruptionInstanceList = Object.entries(instancesOfSelectedRegion)
      .filter((elements: any[]): any => {
        if (instancesOfSelectedRamCore.includes(elements[0])) {
          return elements
        }
      })
      .sort((x: any, y: any) => x[1].r - y[1].r)
      .slice(0, count);

    return leastInterruptionInstanceList;
  }


  async filterInstances(form: any) {
    //get all the instances(Linux and windows) of selected region
    var instancesOfSelectedRegion = await this.getInstancesOfSelectedRegion(form.awsRegions);
    // console.log(this.instancesOfSelectedRegion);

    //get all the instances of selected ram and cores
    var instancesOfSelectedRamCore = this.filterInstancesByRamAndCore(form.ram, form.cores);
    // console.log(instancesOfSelectedRamCore);

    //get n leastInterruptionRateInstances
    var nLeastInterruptionRateInstanceList = this.getLeastInterruptionRateInstanceList(instancesOfSelectedRegion, instancesOfSelectedRamCore, environment.instanceCount)

    return nLeastInterruptionRateInstanceList;

  }



}
