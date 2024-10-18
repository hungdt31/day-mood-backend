import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  getRootPath = () => {
    return process.cwd();
  }

  ensureExists = (path: string) => {
    const fs = require('fs');
    const pathArr = path.split('/');
    let currentPath = '';
    pathArr.forEach((dir) => {
      currentPath += `${dir}/`;
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath);
      }
    });
  }
  
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './upload',
    };
  }
}
