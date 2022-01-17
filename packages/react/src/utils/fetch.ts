import {isUrlString} from '.';

type ResourceSrc = URL | string;

function isUrlResourceType(src: ResourceSrc) {
  return typeof src === typeof URL || (typeof src === 'string' && isUrlString(src));
}

async function fetchText(href: string): Promise<string> {
  return fetch(href).then(response => response.text());
}

async function fetchAssessment(assessmentItemSrc: string[]) {
  return Promise.all(
    assessmentItemSrc.map(async src => {
      return {
        src,
        content: await fetchText(src),
      };
    })
  );
}

export {ResourceSrc, isUrlResourceType, fetchText, fetchAssessment};
