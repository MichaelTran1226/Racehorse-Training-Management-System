import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';

@ApiTags('Accounts Management')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('staff')
  @ApiOperation({ summary: 'Xem danh bạ nhân sự nội bộ CLB' })
  getStaffDirectory() {
    return this.accountsService.getStaffDirectory();
  }
}
