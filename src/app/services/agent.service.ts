import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Agent } from '../interfaces/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getAgents() {
    return this.http.get<Agent[]>(this.commonService.getAPI() + '/agents');
  }

  saveAgent(agent: Agent) {
    return this.http.post<Agent>(this.commonService.getAPI() + '/agents', agent);
  }
}
