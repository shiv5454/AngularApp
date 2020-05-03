export interface CoronaDetails {
    country_name : string;
    cases :number;
    deaths:number;
    region: string,
    total_recovered:number;
    new_deaths:number;
    new_cases:number;
    serious_critical:number;
    active_cases:number;
    total_cases_per_1m_population:number;
    deaths_per_1m_population:number;
    total_tests:number;
    tests_per_1m_population:number;
}

export interface CountryWiseDetail {

}

export interface DistrictData{
    district?:string;
    active: number;
    confirmed: number;
    deceased: number;
    delta: {
        confirmed: number;
        deceased: number;
        recovered: number
    }
    notes: string;
    recovered: number;
}

export interface NewsData{
    author:string;
    content:string;
    description:string;
    publishedAt:string;
    source:{
        id:string;
        name:string;
    };
    title:string;
    url:string;
    urlToImage:string;
}