import { ResolveFn } from '@angular/router';
import { AgentService } from '../services/agent.service';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs';
import { Agent } from '../interfaces/agent';

export const agentResolver: ResolveFn<Agent[]> = (route, state) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.show();
  return inject(AgentService).getAgents().pipe(
    finalize(() => spinnerService.hide())
  );
};
