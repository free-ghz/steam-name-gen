import {Model, model, property} from '@loopback/repository';

@model()
export class Name extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  canon: boolean;


  constructor(data?: Partial<Name>) {
    super(data);
  }
}

export interface NameRelations {
  // describe navigational properties here
}

export type NameWithRelations = Name & NameRelations;
