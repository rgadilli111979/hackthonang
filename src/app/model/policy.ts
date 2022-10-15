export class Policy {
    constructor(
     public systemId: number,
    public areaType: string ,
    public channelId: string,
    public insuranceType: number,
    public policyEffectiveDate: string,
    public policyExpirationDate: string,
    public policyNumber: string,
    public predictedResult: string,
    public premiumAmount: number,
    public result: string,
    public uWScore: number,
    public customerId: number,){
    }
    
}
