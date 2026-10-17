import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAttachments } from './ticket-attachments';

describe('TicketAttachments', () => {
  let component: TicketAttachments;
  let fixture: ComponentFixture<TicketAttachments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketAttachments],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketAttachments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
