import {getBaseUrl, isUrlString} from '.';

// @TODO add more options, content are cached? no request if already loaded?
// ResourceSrc {
//   src: URL,
//   content: string,
// }

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

// async function fetchResource(resourceSrc: ResourceSrc): Promise<string | null> {
//   if (isUrlResourceType(resourceSrc)) {
//     return await fetchText(resourceSrc.toString());
//   } else if (typeof resourceSrc === 'string') {
//     return resourceSrc;
//   }

//   return null;
// }

interface Resource {
  src: string;
  content?: string;
}

class Resource implements Resource {
  constructor(public src: string, public content?: string) {}

  async fetch() {
    this.content = await fetch(this.src).then(response => response.text());
  }
}

class AssessmentItem {
  assessmentItem: Resource;
  stylesheets: Resource[] = [];
  correctResponses?: any;
  document?: Document;
  baseUrl: string;

  constructor(assessmentItem: Resource, stylesheetSrc?: Resource, public itemContent?: string) {
    this.assessmentItem = assessmentItem;

    if (stylesheetSrc) {
      this.stylesheets.push(stylesheetSrc);
    }

    this.baseUrl = getBaseUrl(this.assessmentItem.src);
  }

  hasAssessmentItem() {
    return !!this.assessmentItem.content;
  }

  async fetch(forceUpdate = false) {
    if (!forceUpdate && this.hasAssessmentItem()) {
      return;
    }

    await this.assessmentItem.fetch();

    if (this.assessmentItem.content) {
      this.document = new DOMParser().parseFromString(this.trim(this.assessmentItem.content), 'text/xml');
    }

    // get css

    // parse correctResponse
  }

  trim(xml: string) {
    return xml.replace(/(?<=>)(\s+)/gm, '');
  }
}

// class AssessmentItem2 extends Resource {
//   document?: Document;
//   baseUrl: string;

//   constructor(public src: string, public content?: string) {
//     super(src, content);

//     this.baseUrl = getBaseUrl(src);
//   }

//   async fetch() {
//     await super.fetch();

//     if (this.content) {
//       this.document = new DOMParser().parseFromString(this.trim(this.content), 'text/xml');
//     }
//   }

//   trim(xml: string) {
//     return xml.replace(/(?<=>)(\s+)/gm, '');
//   }
// }

// class StyleSheet extends Resource {
//   constructor(public src: string, public content?: string) {
//     super(src, content);
//   }

//   // replaced, locate, and replace
// }

export {Resource, ResourceSrc, isUrlResourceType, fetchText, fetchAssessment, AssessmentItem, StyleSheet};
