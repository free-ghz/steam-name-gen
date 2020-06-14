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
  ): Promise<Source> {

    // No duplicates
    let alreadyInHere = await this.sourceRepository.doesNameExist(source.text);
    if (alreadyInHere) {
      throw new Error("Alredy here");
    }

    // divide input text into key+value pairs, all permutations
    let empty = '\x01' // wanted to use empty string but loopback says no. this is probably a bad idea, but whatever.
    let components = []
    let text = source.text;
    let maxLookbehind = 20;
    for (let i = 0; i <= text.length; i++) {
      let value = empty;
      if (i < text.length) value = text.charAt(i);
      for (let lb = 1; lb <= i && lb <= 20; lb++) {
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

  @get('/sources', {
    responses: {
      '200': {
        description: 'Array of Source model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Source, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Source) filter?: Filter<Source>,
  ): Promise<Source[]> {
    return this.sourceRepository.find(filter);
  }

  @patch('/sources', {
    responses: {
      '200': {
        description: 'Source PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Source, {partial: true}),
        },
      },
    })
    source: Source,
    @param.where(Source) where?: Where<Source>,
  ): Promise<Count> {
    return this.sourceRepository.updateAll(source, where);
  }

  @get('/sources/{id}', {
    responses: {
      '200': {
        description: 'Source model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Source, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Source, {exclude: 'where'}) filter?: FilterExcludingWhere<Source>
  ): Promise<Source> {
    return this.sourceRepository.findById(id, filter);
  }

  @patch('/sources/{id}', {
    responses: {
      '204': {
        description: 'Source PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Source, {partial: true}),
        },
      },
    })
    source: Source,
  ): Promise<void> {
    await this.sourceRepository.updateById(id, source);
  }

  @put('/sources/{id}', {
    responses: {
      '204': {
        description: 'Source PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() source: Source,
  ): Promise<void> {
    await this.sourceRepository.replaceById(id, source);
  }

  @del('/sources/{id}', {
    responses: {
      '204': {
        description: 'Source DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sourceRepository.deleteById(id);
  }
}
