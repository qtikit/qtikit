import type {ResponseProcessing} from '@qtikit/model/lib/qti2_2';

import matchCorrect from './match-correct';

export function expandRptemplates(responseProcessing: ResponseProcessing): ResponseProcessing {
  return expandRptemplates.table[responseProcessing.template!] || responseProcessing;
}
expandRptemplates.table = {
  'http://www.imsglobal.org/question/qti_v2p2/rptemplates/match_correct': matchCorrect,
} as {[uri: string]: ResponseProcessing};
