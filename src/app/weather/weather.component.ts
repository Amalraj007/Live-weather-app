import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenWeatherApiService } from '../openweatherapi.service';
import * as XLSX from 'xlsx';
// import { Console } from 'console';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  fileName = 'export-data.xlsx'
  @Input() lat;
  @Input() lng;
  public weatherSearchForm: FormGroup;
  public weatherDetails;
  constructor(
    private formBuilder: FormBuilder,
    private openweatherapiService: OpenWeatherApiService
  ) {
  }

  weather1:any={
    name:'',
    temp:''
  }
  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({ location: [''] });
    
  }
  
  sendToAPI() {
    this.openweatherapiService
      .getWeather(this.lat, this.lng)
      .subscribe(data=>{
        

        this.weatherDetails = data;
        this.weather1.name= this.weatherDetails.name;
        this.weather1.temp= this.weatherDetails.main['temp'];
        this.weather1.description= this.weatherDetails.weather[0].description;
    
      })
      
      
   }
  
  exportExcel():void{
    console.log(this.weatherDetails)
    let element=document.getElementById('excel-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,this.fileName)
  }
}
