import mysql from 'mysql2/promise';
import { SQL_SCHEMA } from './schema';
import { Service } from '../types/database';

export class DatabaseInitializer {
  private connection: mysql.Connection;

  constructor(connection: mysql.Connection) {
    this.connection = connection;
  }

  async initialize(): Promise<void> {
    await this.createTables();
    await this.createViews();
    await this.inserttInitialService();
  }

  private async createTables(): Promise<void> {
    const tableSchemas = ['customers', 'services', 'customerInterests'];

    for (const tableName in tableSchemas) {
      await this.connection.execute(SQL_SCHEMA[tableName]);
    }
  }

  private async createViews(): Promise<void> {
    await this.connection.execute(SQL_SCHEMA.customerInterestSummary);
  }

  private async inserttInitialService(): Promise<void> {
    const initalServices: Omit<Service, 'service_id' | 'created_at'>[] = [
      {
        service_name: 'delivery', description: 'Delivery service'
      },
      {
        service_name: 'pick-up', description: 'Pick-up service'
      },
      {
        service_name: 'payment', description: 'Payment service'
      }
    ];

    const insertQuery = `
      INSERT IGNORE INTO services (service_name, description)
      VALUES(?, ?, ?)
    `;

    for (const service of initalServices) {
      await this.connection.execute(insertQuery, [
        service.service_name,
        service.description
      ]);
    }

  }
}

