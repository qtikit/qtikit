import {UserInput} from '@qtikit/model/lib/user-input';
import {
  ResponseDeclaration,
  OutcomeDeclaration,
  TemplateDeclaration,
  TemplateProcessing,
  ResponseProcessing,
} from '@qtikit/model/lib/qti2_2';

import {OutcomeValues} from '.';

export interface ResponseProcessingConfig {
  responseDeclarations?: ResponseDeclaration[];
  outcomeDeclarations?: OutcomeDeclaration[];
  templateDeclarations?: TemplateDeclaration[];
  templateProcessing?: TemplateProcessing;
  responseProcessing?: ResponseProcessing;
}

export interface ResponseProcessingResult {
  score: number;
  outcomeValues: OutcomeValues;
}

export default function responseProcessing(
  config: ResponseProcessingConfig,
  input: UserInput
): ResponseProcessingResult {
  console.log({config, input}); // TODO
  const outcomeValues: OutcomeValues = {};
  return {score: 0, outcomeValues};
}
