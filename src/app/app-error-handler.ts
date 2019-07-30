import { Crashlytics } from '@ionic-native/fabric/ngx';
import { ErrorHandler, Injectable } from '@angular/core';

export interface ParsedError {
    message: string;
    status?: number;
    stack?: string;
}
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  constructor(private crashlytics: Crashlytics) {
    super();
  }

  handleError(error: any): void {
    console.log('Global error occured.');
    super.handleError(error);

    // unroll errors from promises
    if (error.rejection) {
        error = error.rejection;
    }

    let parsedError = this.parse(error);
    console.dir(parsedError);
    this.crashlytics.addLog("Error : " + parsedError.message);
    this.crashlytics.sendNonFatalCrash(parsedError.message+'  ----  '+parsedError.stack); // Shows non-fatal error for Android only
    this.crashlytics.recordError(parsedError.message, parsedError.status); // Shows non-fatal error for IOS only
    //this.crashlytics.sendCrash(); // Use only for testing.
  }

  parse(error: any): ParsedError {

    // get best available error message
    let parsedError: ParsedError = {
        message: error.message ? error.message as string : error.toString()
    };
 
    // include HTTP status code
    if (error.status != null) {
        parsedError.status = error.status;
    }
 
    // include stack trace
    if (error.stack != null) {
        parsedError.stack = error.stack;
    }
 
    return parsedError;
  }
  
}