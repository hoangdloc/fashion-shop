export class OTP {
  constructor(
    public email: string,
    public otp: string,
    public createdAt: Date,
    public expiredAt: Date
  ) {}
}
