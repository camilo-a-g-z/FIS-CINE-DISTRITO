import { TestBed } from '@angular/core/testing';

import { CompraTicketService } from './compra-ticket.service';

describe('CompraTicketService', () => {
  let service: CompraTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
