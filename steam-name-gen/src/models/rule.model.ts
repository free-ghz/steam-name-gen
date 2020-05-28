import {Entity, model, property} from '@loopback/repository';

@model()
export class Rule extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  input: string;

  @property({
    type: 'string',
    required: true,
  })
  output: string;

  @property({
    type: 'number',
    required: true,
  })
  strength: number;


  constructor(data?: Partial<Rule>) {
    super(data);
  }
}

export interface RuleRelations {
  // describe navigational properties here
}

export type RuleWithRelations = Rule & RuleRelations;
