import { Injectable } from '@nestjs/common';
type OtpRecord = { code: string; expiresAt: number; attempts: number };
@Injectable()
export class OtpStore {
  private readonly records = new Map<string, OtpRecord>();
  issue(email: string) { const record = { code: '123456', expiresAt: Date.now() + 15 * 60 * 1000, attempts: 0 }; this.records.set(email.trim().toLowerCase(), record); return { expiresAt: record.expiresAt, developmentCode: record.code }; }
  verify(email: string, code: string) { const key = email.trim().toLowerCase(); const record = this.records.get(key); if (!record || Date.now() > record.expiresAt || record.attempts >= 5) return false; record.attempts += 1; if (code !== record.code) return false; this.records.delete(key); return true; }
}
