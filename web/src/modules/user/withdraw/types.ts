export interface WithdrawPayload {
    beneficiary_id: string;
    currency: string;
    otp: string;
    amount: string;
    account_no: string;
    bank_code: string;
};

export interface WithdrawDataPayload {
    action: string;
    amount: number;
    beneficiary_id: string;
    created_at: string;
    currency: string;
    reference: string;
    status: string;
    tid: string;
    uid: string;
};