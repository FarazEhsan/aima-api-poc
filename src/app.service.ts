import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private manager: EntityManager) {}
  getHello(): string {
    return 'Hello World!';
  }
  //creating a service to initialize db functions
  async runInitScript() {
    const filePath = path.join(process.cwd(), 'db-init/db-init-scripts.sql');
    const sql = fs.readFileSync(filePath, 'utf8');
    await this.manager.query(sql);
  }
}
