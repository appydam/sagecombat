export interface AadhaarVerificationInitiationReq {
  userId: number;
  aadhaarnumber: string;
}

export interface AadhaarVerificationInitiationResp {
  code: number;
  data: {
    resp_code: string;
    resp_desc?: string;
    rrn: string;
    token: string;
    captcha: string;
  };
}

export interface OTPGenerationReq {
  captcha: string;
  token: string;
  userId: number;
}

export interface OTPGenerationResp {
  code: number;
  data: {
      resp_code: string;
      resp_desc?: string;
  }
}

export interface AadhaarVerificationReq {
  userId: string;
  token: string;
  otp: string;
}

export interface AadhaarVerificationResp {
  Verfied: boolean;
}

export const KYC_STEPS = ['selection', 'aadhaar-input', 'captcha', 'otp', 'success'];
