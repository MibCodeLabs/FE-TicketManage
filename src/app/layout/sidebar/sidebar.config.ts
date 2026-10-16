import { AccountType } from '../../enum/account-type.enum';

export type SidebarOption = [message: string, icon: string, route: string];

const BASIC_OPTIONS = [
  ['Home', '/home.svg', '/home'],
  ['Tickets', '/ticket.svg', '/tickets'],
  ['Messages', '/message.svg', '/messages'],
  ['Settings', '/setting.svg', '/settings'],
  ['Report', '/report.svg', '/report'],
] as const satisfies readonly SidebarOption[];

export const sideBarOptions: Record<AccountType, readonly SidebarOption[]> = {
  [AccountType.Employee]: [...BASIC_OPTIONS],
  [AccountType.Manager]: [...BASIC_OPTIONS, ['Analytics', '/analytics.svg', '/analytics']],
  [AccountType.Support]: [
    ...BASIC_OPTIONS,
    ['Todo', '/todo.svg', '/Todo'],
    ['Complaints', '/complaints.svg', '/analytics'],
  ],
  [AccountType.QA]: [...BASIC_OPTIONS, ['Todo', '/todo.svg', '/Todo']],
  [AccountType.Developer]: [...BASIC_OPTIONS, ['Todo', '/todo.svg', '/Todo']],
  [AccountType.Admin]: [
    ...BASIC_OPTIONS,
    ['Accounts Management', '/account-management.svg', '/accounts-management'],
    ['Data Management', '/data-management.svg', '/data-management'],
  ],
};
