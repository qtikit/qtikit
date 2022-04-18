# @qtikit/react

## 0.0.25

### Patch Changes

- Use MathML and MathJax custom version
- Updated dependencies
  - @qtikit/mathjax-react@0.0.4

## 0.0.24

### Patch Changes

- Use @qtikit/mathjax-full instead of official
- Updated dependencies
  - @qtikit/mathjax-react@0.0.2

## 0.0.23

### Patch Changes

- fc471eb: Fix XML parser to prevent removing attrs

## 0.0.22

### Patch Changes

- af73e00: Change default notation value is box in mencloser of MathML

## 0.0.21

### Patch Changes

- b12f23d: Improve content rendering in simple choice
- d141945: De-select choice item when maxChoices is 1

## 0.0.20

### Patch Changes

- f79c119: Fixed image re-rendering with old baseurl

## 0.0.19

### Patch Changes

- c64c9cf: Remove raw Xml string trimming

## 0.0.18

### Patch Changes

- 02a1520: Add options to show correct responses in choice interaction

  # Breaking Changes

  ## Show correct, incorrect answers on choice interaction

  - CSS has been changed `data-qtikit-correct` dataset added to .qtikit-interaction\_\_choice
  - `showCorrectResponse` option added, onChange must not be passed

## 0.0.15

### Patch Changes

- Updated dependencies
  - @qtikit/model@0.0.5

## 0.0.14

### Patch Changes

#### Fixes

- 0d471bc: - fix: Prevent multiple rendering after first render

#### Breaking Changes

- 5143a73: - Characteristic implements in Choice Interaction
  - Simple Choice control type changed, [radio -> checkbox](https://github.com/riiid/qtikit/commit/5143a732a9ea07fd2d2334b614f6a413ab4215fa#diff-4f876bf01afd270e32dc037505a41a7e3362efd3b8d49365d8ed23704bb75207L35), to support multi select
- 20d3f13: - Improve order interaction
  - [Query selector for order interaction changed](https://github.com/riiid/qtikit/commit/20d3f1340d61bd328b796585a67fba6e34b0ea63#diff-4f876bf01afd270e32dc037505a41a7e3362efd3b8d49365d8ed23704bb75207R1)

## 0.0.13

### Patch Changes

- 6d9db57: Add data attr for checked checkbox

## 0.0.12

### Patch Changes

- f1f9689: Bug Fixes
- 762e001: Handle div props for `<QtiViewer/>`

## 0.0.11

### Patch Changes

- Fix some custom stylesheet bugs

## 0.0.10

### Patch Changes

- Fix bugs

## 0.0.9

### Patch Changes

- Support external stylesheet
- Remove unimplemented interactions
- Updated dependencies [6f50d98]
- Updated dependencies [092b1a0]
  - @qtikit/model@0.0.4

## 0.0.5

### Patch Changes

- Implement HottextInteraction
- Implement RubricBlock
- Implement HotspotChoice
- Implement OrderInteraction
- Implement OrderSimpleChoice
- Implement HotspotInteraction
- Updated dependencies
  - @qtikit/model@0.0.2

## 0.0.4

### Patch Changes

- Support SSR #25

## 0.0.3

### Patch Changes

- Fixed non-resolvable dependency reference bug

## 0.0.2

### Patch Changes

- Implement GapMatchInteraction
- Implement TextEntryInteraction #10
- Implement InlineChoiceInteraction #11

## 0.0.1

### Patch Changes

- start tracking with changesets
- Updated dependencies
  - @qtikit/model@0.0.1
