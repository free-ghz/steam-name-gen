import {DefaultCrudRepository} from '@loopback/repository';
import {Rule, RuleRelations} from '../models';
import {MariaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RuleRepository extends DefaultCrudRepository<
  Rule,
  typeof Rule.prototype.input,
  RuleRelations
> {
  constructor(
    @inject('datasources.maria') dataSource: MariaDataSource,
  ) {
    super(Rule, dataSource);
  }
}
