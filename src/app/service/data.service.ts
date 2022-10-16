import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable } from 'rxjs';




import { mergeMap, repeat, repeatWhen } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { InsurerName } from '../model/insurer-name';
import { Country } from '../model/countries.model';
import { Policy } from '../model/policy';

const baseUrl = 'http://localhost:1000/legacyCodeAnalyser/analyse';

// const storeAnalysisReport = 'http://localhost:1001/legacyCodeAnalysisStore/storefileinfo';
// const registerRepo = 'http://localhost:1001/legacyCodeAnalysisStore/registercodebase';
// const getRegisterRepo = 'http://localhost:1001/legacyCodeAnalysisStore/analyse/getRegCodeBase';


// const analysis = 'http://localhost:1000/legacyCodeAnalyser/analyse/';

// const storeAnalysis = 'http://localhost:1001/legacyCodeAnalysisStore/analyse/';

//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

const predictionurl = 'http://127.0.0.1:5000/churn?id=';

const localDashboarCountriesDataUrl = 'http://localhost:8080/insurer/data/countries';

const localDashboarInsurerDataUrl = 'http://localhost:8080/insurer/data/companies';

const localDashboardPolicyDataUrl = 'http://localhost:8080/insurer/data/getPolicyDetails';

const localDashboardExpiringPoliciesURL ='http://localhost:8080/insurer/data/expiringSoon/';

const localDashboardPieChartDataURL = 'http://localhost:8080/insurer/data/getPieChartInfoForInsuranceType';

const localDashboardBarChartDataURL = 'http://localhost:8080/insurer/data/expiringSoonCountInDateRange';
@Injectable({
  providedIn: 'root'
})
export class InsurerDetailService {
 
  constructor(private http: HttpClient, private router: Router) { }
  
  getListOfCountries():  Observable<Country[]>{
    console.info('we are in ser countries data');
    const headers = { 'content-type': 'application/json' }
    return this.http.get<Country[]>(localDashboarCountriesDataUrl, { 'headers': headers });
  }

  getListOfPolicies(): Observable<Policy[]>{
    console.info("getting policies");
    const headers = { 'content-type': 'application/json' }
    return this.http.get<Policy[]>(localDashboardPolicyDataUrl, {'headers': headers});
  }
  
  getExpiringPolicies(days: number): Observable<Policy[]>{
    console.info("getting expiring policies");
    const headers = { 'content-type': 'application/json' }
    return this.http.get<Policy[]>(localDashboardExpiringPoliciesURL+days, {'headers': headers});
  }

  getPrediction(systemId: number): Observable<any>{
    console.info("getting prediction");
    const headers = { 'content-type': 'application/json' }
    return this.http.get<any>(predictionurl+systemId, {'headers': headers});
  }
  getPieChartInfoForInsuranceType(): Observable<any>{
    const headers = { 'content-type': 'application/json' }
    return this.http.get<any>(localDashboardPieChartDataURL, {'headers': headers});
  }
  getExpiringSoonCountInDateRange(): Observable<any>{
    const headers = { 'content-type': 'application/json' }
    return this.http.get<any>(localDashboardBarChartDataURL, {'headers': headers});
  }
}
