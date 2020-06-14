import {
  repository
} from '@loopback/repository';
import {SourceRepository, RuleRepository} from '../repositories';
import { get, ParameterLocation } from '@loopback/rest';
import { Name, Rule } from '../models';

const suggestionSpec = {
  parameters: [
    {name: 'amount', schema: {type: 'number'}, in: 'query' as ParameterLocation},
    {name: 'quality', schema: {type: 'number'}, in: 'query' as ParameterLocation}
  ],
  responses: {
    '200': {
      description: 'name suggestion',
      content: {
        'application/json': {
          schema: {type: 'Name[]'},
        },
      },
    },
  },
};


export class SuggestionController {
  constructor(
    @repository(SourceRepository)
    public sourceRepository : SourceRepository,
    @repository(RuleRepository)
    public ruleRepository : RuleRepository
    ) {}

    @get('/suggestions', suggestionSpec)
    async getSuggestions(amount : number, quality : number) {
      amount = amount == undefined || amount > 10 || amount < 1 ? 5 : amount;
      quality = quality == undefined || quality > 10 || quality < 1 ? 1 : quality;

      let answer = []
      for (let i = 0; i < amount; i++) {
        answer.push(await this.generateName(quality));
      }
      
      return answer;
    }

    private async generateName(quality : number) {
      const empty = '\x01'
      let nextChar = empty;
      let result = '';
      do {
        let input = getInput(result === '' ? empty : result, quality);
        let applicableRules = await this.ruleRepository.find({where: {input: {eq: input}}});
        nextChar = weightedRandom(applicableRules, input).output;
        if (nextChar !== empty) result += nextChar;
      } while (nextChar !== empty);
      

      let generatedName = result;
      let canon = await this.sourceRepository.doesNameExist(generatedName);
      let name = new Name({
        name: generatedName,
        canon
      })
      return name;
    }

}

function getInput(result : string, quality: number): string {
  if (result.length <= quality) return result;
  return result.substr(result.length - quality, quality)
}

function weightedRandom(rules : Rule[], input : string) : Rule {
  rules = rules.filter(rule => rule.input === input); // i cant believe i have to do this. wtf.
  let weightSum = rules.reduce((sum : number, rule: Rule) => sum + rule.strength, 0);

  let sum=0, r=Math.random();
  for (let i = 0; i < rules.length; i++) {
    sum += rules[i].strength / weightSum;
    if (r <= sum) return rules[i];
  }
  console.log("using rule 0 as fallback")
  return rules[0]; // fallback, should never happen
}