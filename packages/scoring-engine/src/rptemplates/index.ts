import type {ResponseProcessing} from '@qtikit/model/lib/qti2_2';

import mapResponse from './map-response';
import matchCorrect from './match-correct';

export function expandRptemplates(responseProcessing: ResponseProcessing): ResponseProcessing {
  return expandRptemplates.table[responseProcessing.template!] || responseProcessing;
}
expandRptemplates.table = {
  'http://www.imsglobal.org/question/qti_v2p2/rptemplates/map_response': mapResponse,
  'http://www.imsglobal.org/question/qti_v2p2/rptemplates/match_correct': matchCorrect,
} as {[uri: string]: ResponseProcessing};
