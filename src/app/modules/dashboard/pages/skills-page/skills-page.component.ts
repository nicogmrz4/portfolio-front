import { Component, ViewChild } from '@angular/core';
import { SkillsTableComponent } from './components/skills-table/skills-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewSkillModalComponent } from './components/new-skill-modal/new-skill-modal.component';
import { Skill } from '@modules/dashboard/interfaces/skill';

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss',
  standalone: true,
  imports: [
    SkillsTableComponent,
    MatButtonModule
  ],
  providers: [
    MatDialog
  ]
})
export class SkillsPageComponent {
  @ViewChild(SkillsTableComponent) skillsTable!: SkillsTableComponent;
  constructor(private dialog: MatDialog) {}

  openCreateSkillModal() {
    let dialogRef = this.dialog.open(NewSkillModalComponent, {
      width: '750px',
      autoFocus: false,
    })

    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        if (result == false) return;
        this.skillsTable.dataSource.addSkill(result) // result should be an skill 
      }
    })
  }
}
