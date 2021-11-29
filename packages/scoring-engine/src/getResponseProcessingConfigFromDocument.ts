import {
  responseDeclarationDomToModel,
  outcomeDeclarationDomToModel,
  responseProcessingDomToModel,
} from '@qtikit/model/lib/qti2_2-dom-to-model';

import {ResponseProcessingConfig} from './responseProcessing';

export default function getResponseProcessingConfigFromDocument(doc: Document): ResponseProcessingConfig {
  const result: ResponseProcessingConfig = {};
  const responseDeclarationElements = Array.from(doc.getElementsByTagName('responseDeclaration'));
  const outcomeDeclarationElements = Array.from(doc.getElementsByTagName('outcomeDeclaration'));
  // const templateDeclarationElements = Array.from(doc.getElementsByTagName('templateDeclaration'));
  // const templateProcessingElement = doc.getElementsByTagName('templateProcessing')[0];
  const responseProcessingElement = doc.getElementsByTagName('responseProcessing')[0];
  if (responseDeclarationElements.length) {
    result.responseDeclarations = responseDeclarationElements.map(responseDeclarationDomToModel);
  }
  if (outcomeDeclarationElements.length) {
    result.outcomeDeclarations = outcomeDeclarationElements.map(outcomeDeclarationDomToModel);
  }
  // TODO: templateDeclaration
  // TODO: templateProcessing
  if (responseProcessingElement) {
    result.responseProcessing = responseProcessingDomToModel(responseProcessingElement);
  }
  return result;
}
