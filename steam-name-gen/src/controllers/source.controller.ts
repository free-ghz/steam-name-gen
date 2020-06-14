import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  ParameterLocation,
} from '@loopback/rest';
import {Source, Rule} from '../models';
import {SourceRepository, RuleRepository} from '../repositories';

export class SourceController {
  constructor(
    @repository(SourceRepository)
    public sourceRepository : SourceRepository,
    @repository(RuleRepository)
    public ruleRepository : RuleRepository
  ) {}

  @post('/sources', {
    parameters: [
      {name: 'password', schema: {type: 'string'}, in: 'query' as ParameterLocation}, // yaya get query to post. whatever
    ],
    responses: {
      '200': {
        description: 'Source model instance',
        content: {'application/json': {schema: getModelSchemaRef(Source)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Source, {
            title: 'NewSource',
            
          }),
        },
      },
    })
    source: Source,
    password: string
  ): Promise<Source> {

    //user: process.env.CSGO_DATABASE_USER,
    if (password !== process.env.CSGO_POST_PASSWORD || password == undefined) {
      throw new Error('Its wrong')
    }

    // No duplicates
    let alreadyInHere = await this.sourceRepository.doesNameExist(source.text);
    if (alreadyInHere) {
      throw new Error("Alredy here");
    }

    // divide input text into key+value pairs, all permutations
    const empty = '\x01' // wanted to use empty string but loopback says no. this is probably a bad idea, but whatever.
    let components = []
    let text = source.text;
    let maxLookbehind = 10;
    for (let i = 0; i <= text.length; i++) {
      let value = empty;
      if (i < text.length) value = text.charAt(i);
      for (let lb = 1; lb <= i && lb <= maxLookbehind; lb++) {
        let key = text.substr(i-lb, lb);
        components.push({input: key, output: value})
      }
      if (i === 0) components.push({input : empty, output: value})
    }

    // push to db
    components.forEach(async component => {
      let rules = await this.ruleRepository.find({where: component})
      if (rules.length > 0) {
        let rule = rules[0];
        rule.strength += 1;
        await this.ruleRepository.update(rule)
      } else {
        let rule = new Rule({ strength: 1, ...component });
        await this.ruleRepository.save(rule);
      }
    })

    return this.sourceRepository.create(source);
  }

  @get('/sources/count', {
    responses: {
      '200': {
        description: 'Source model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Source) where?: Where<Source>,
  ): Promise<Count> {
    return this.sourceRepository.count(where);
  }

}
