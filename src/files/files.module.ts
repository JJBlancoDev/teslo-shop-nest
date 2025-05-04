import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ConfigService],
})
export class FilesModule {}
