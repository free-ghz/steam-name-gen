import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// Not so sure i can use process.env like this? But i hope so?
const config = {
  name: 'maria',
  connector: 'mysql',
  url: '',
  host: process.env.CSGO_DATABASE_HOST,
  port: 3307,
  user: process.env.CSGO_DATABASE_USER,
  password: process.env.CSGO_DATABASE_PASSWORD,
  database: process.env.CSGO_DATABASE
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MariaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'maria';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.maria', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
