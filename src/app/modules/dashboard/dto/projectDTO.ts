export class ProjectDTO {
  constructor(
    public name: string,
    public description: string,
    public tags: string[] = []
  ) {}
}
