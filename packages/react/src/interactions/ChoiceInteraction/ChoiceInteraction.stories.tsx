import {QtiViewerTemplate} from '../QtiViewerTemplate';

export default {
  title: 'Interaction/Choice',
};

export const choice = QtiViewerTemplate.bind({});

choice.args = {
  assessmentItemSrc: 'tests/items/choice.xml',
};

export const choice_multiple = QtiViewerTemplate.bind({});

choice_multiple.args = {
  assessmentItemSrc: 'tests/items/choice_multiple.xml',
};

export const choice_multiple2 = QtiViewerTemplate.bind({});

choice_multiple2.args = {
  assessmentItemSrc: 'tests/items/choice_multiple_2.xml',
};

export const choice_fixed = QtiViewerTemplate.bind({});

choice_fixed.args = {
  assessmentItemSrc: 'tests/items/choice_fixed.xml',
};

export const choice_orientation = QtiViewerTemplate.bind({});

choice_orientation.args = {
  assessmentItemSrc: 'tests/items/choice_orientation.xml',
};

export const orkney1 = QtiViewerTemplate.bind({});

orkney1.args = {
  assessmentItemSrc: 'tests/items/orkney1.xml',
};

export const correctResponse = QtiViewerTemplate.bind({});

correctResponse.args = {
  assessmentItemSrc: 'tests/items/choice.xml',
  inputState: {RESPONSE: ['ChoiceA']},
  onChange: null,
  options: {
    showCorrectResponse: true,
  },
};

export const incorrectResponse = QtiViewerTemplate.bind({});

incorrectResponse.args = {
  assessmentItemSrc: 'tests/items/choice.xml',
  inputState: {RESPONSE: ['ChoiceB']},
  onChange: null,
  options: {
    showCorrectResponse: true,
  },
};

export const multiple_correct_answers = QtiViewerTemplate.bind({});

multiple_correct_answers.args = {
  assessmentItemSrc: 'tests/items/choice_multiple.xml',
  inputState: {RESPONSE: ['H', 'O']},
  onChange: null,
  options: {
    showCorrectResponse: true,
  },
};

export const one_correct_answer_missing_one_select = QtiViewerTemplate.bind({});

one_correct_answer_missing_one_select.args = {
  assessmentItemSrc: 'tests/items/choice_multiple.xml',
  inputState: {RESPONSE: ['H']},
  onChange: null,
  options: {
    showCorrectResponse: true,
  },
};

export const one_correct_answer_one_incorrect_answer = QtiViewerTemplate.bind({});

one_correct_answer_one_incorrect_answer.args = {
  assessmentItemSrc: 'tests/items/choice_multiple.xml',
  inputState: {RESPONSE: ['H', 'He']},
  onChange: null,
  options: {
    showCorrectResponse: true,
  },
};

export const two_incorrect_answers = QtiViewerTemplate.bind({});

two_incorrect_answers.args = {
  assessmentItemSrc: 'tests/items/choice_multiple.xml',
  inputState: {RESPONSE: ['C', 'N']},
  onChange: null,
  options: {
    showCorrectResponse: true,
  },
};
