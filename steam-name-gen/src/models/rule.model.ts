import {Entity, model, property} from '@loopback/repository';

@model()
export class Rule extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 0,
      maxLength: 20
    },
    allowBlank: true
  })
  input: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 0,
      maxLength: 10 // actually 1, but what is unicode anyway?
    },
    allowBlank: true
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
