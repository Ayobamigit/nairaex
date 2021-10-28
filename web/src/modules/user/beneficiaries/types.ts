export interface BeneficiaryCrypto {
    address: string;
}

export interface BeneficiaryBank {
    bank_code?: string;
    country?: string;
    full_name?: string;
    account_no?: string;
    account_type?: string;
    bank_name?: string;
    bank_address?: string;
    bank_country?: string;
    bank_swift_code?: string;
    fiatDescription?: string;
    intermediary_bank_name?: string;
    intermediary_bank_address?: string;
    intermediary_bank_country?: string;
    intermediary_bank_swift_code?: string;
}

export interface BeneficiaryData extends BeneficiaryCrypto, BeneficiaryBank {}

export interface Beneficiary {
    id: number;
    currency: string;
    name: string;
    blockchain_key?: string;
    blockchain_name?: string;
    state: string;
    description?: string;
    data: BeneficiaryData;
}
