import {Entity, model, property} from '@loopback/repository';

@model()
export class Source extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    jsonSchema: {
      minLength: 3,
      maxLength: 20
    }
  })
  text: string;


  constructor(data?: Partial<Source>) {
    super(data);
  }
}

export interface SourceRelations {
  // describe navigational properties here
}

export type SourceWithRelations = Source & SourceRelations;
