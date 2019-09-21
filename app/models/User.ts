
export default class User {
    _id: string = '' //underscroll to mimic mongodb
    email: string = ''
    userConfirmed: boolean = false
    name: string = ''
    currentLocation: string = ''
    branch: string = ''
    employment: string = ''
    familyStatus: string = ''
    component: string = ''
    profileUrl: string = ''
    paygrade: string = '0'
    pastGoodYears: number = 0
    totalGoodYears: number = 0
    yearsOfService: number = 0
    pastRetirementPoints: number = 0
    totalRetirementPoints: number = 0
}