export interface Lookup {
    first_name: string;
    surname: string;
    bank_code: string;
    bank_name: string;
    account_no: string;
};

export interface LookupPayload {
    bank_code: string;
    account_no: string;
}