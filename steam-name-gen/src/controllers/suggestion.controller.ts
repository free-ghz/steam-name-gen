// Uncomment these imports to begin using these cool features!

import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {SourceRepository} from '../repositories';
import { get, ParameterLocation } from '@loopback/rest';
import { Name, Source } from '../models';

// import {inject} from '@loopback/context';


const suggestionSpec = {
  parameters: [{name: 'amount', schema: {type: 'number'}, in: 'query' as ParameterLocation}],
  responses: {
    '200': {
      description: 'name suggestion',
      content: {
        'application/json': {
          schema: {type: 'name'},
        },
      },
    },
  },
};


export class SuggestionController {
  constructor(
    @repository(SourceRepository)
    public sourceRepository : SourceRepository
    ) {}

    @get('/suggestions', suggestionSpec)
    async getSuggestions(amount : number) {
      amount = amount == undefined ? 10 : amount;
      let generatedName = 'a'.repeat(amount);
      let canon = await this.sourceRepository.doesNameExist(generatedName);
      let name = new Name({
        name: generatedName,
        canon
      })
      return name;
    }

}
