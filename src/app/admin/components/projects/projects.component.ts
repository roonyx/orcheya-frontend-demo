import { Component, OnInit } from '@angular/core';

import { Project } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public displaing: Project[];
  public filter: string | undefined = undefined;

  tgTypes = {
    timedoctor: 'timedoctor',
    upwork: 'upwork'
  };

  constructor(
    private _projectService: ProjectService
  ) { }

  ngOnInit() {
    this._projectService
      .getProjectsList()
      .subscribe(projects => {
        this.projects = projects.sort((a: Project, b: Project) => {
          return a.createdAt > b.createdAt ? -1 : 1;
        });
        this.filtering();
      });
  }

  public setPaidProject(event, id: number): void {
    this._projectService
      .updateProject(id, { paid: event.target.checked })
      .subscribe();
  }

  filtering(): void {
    if (this.filter === undefined) {
      this.displaing = this.projects;
    } else {
      this.displaing = this.projects.filter(
        project => project.platform === this.filter
      );
    }
  }
}
