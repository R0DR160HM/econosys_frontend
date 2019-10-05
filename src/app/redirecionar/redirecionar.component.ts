import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirecionar',
  templateUrl: './redirecionar.component.html',
  styleUrls: ['./redirecionar.component.css']
})
export class RedirecionarComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
    this.route.navigate(["/"])
  }

  

}
