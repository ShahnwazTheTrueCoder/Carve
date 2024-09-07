import { TestBed } from '@angular/core/testing';

import { ChatServerService } from './chat-server.service';

describe('ChatServerService', () => {
  let service: ChatServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
