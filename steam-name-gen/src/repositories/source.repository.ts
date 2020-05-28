import {DefaultCrudRepository} from '@loopback/repository';
import {Source, SourceRelations} from '../models';
import {MariaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SourceRepository extends DefaultCrudRepository<
  Source,
  typeof Source.prototype.text,
  SourceRelations
> {
  constructor(
    @inject('datasources.maria') dataSource: MariaDataSource,
  ) {
    super(Source, dataSource);
  }
}
