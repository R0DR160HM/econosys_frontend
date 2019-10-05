import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler{


  constructor(private injector:Injector) { }

  handleError(error:any){
    const router = this.injector.get(Router);
    console.log(`Request URL: ${router.url}`);

    if(error instanceof HttpErrorResponse){
      console.error('Backend retornou o status:', error.status);
      console.error('Corpo do retorno:', error.message);
    }else{
      console.error('Erro:', error.message);
    }

    router.navigate(['/erro']);

  }
}
