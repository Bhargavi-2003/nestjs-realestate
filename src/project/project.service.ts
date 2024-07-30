import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ServerDescription } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(
    private readonly databaseService: DatabaseService) {}

  async create(createProjectDto: CreateProjectDto): Promise<{ projectId: number, status: string }> {
    try{
      const user = await this.databaseService.user.findUnique({where:{email}});
      if(!user){
        throw new Error('User not found');
      }
      let data: Prisma.ProjectCreateInput = {
        builderId : createProjectDto.builderId,
        projectname : createProjectDto.projectName,
        description: createProjectDto.description,
        location: createProjectDto.location,
        user:{
          connect: {email: user.email},
        },
      }
      console.log(data)
      const project = await this.databaseService.project.create({data});
      return { projectId: project.id, status: 'Project created successfully' };

    }catch(err){
      return err
    }
    // const project = await this.databaseService.project.create(createProjectDto);
    // await this.databaseService.project.save(project);
    
  }
}
