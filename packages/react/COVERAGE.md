# Coverage of Iteractions and Children attributes in QTI Specification

This table represents status of implementation progress of interactions and characteristics which are supported by QtiViewer.

| Interaction / Children (27 / 46) | Characteristics (14 / 140)|
|--|--|
| Simple Interaction | |
| ✅ Choice | ✅ shuffle <br/> ✅ maxChoices <br/> ✅ minChoices <br/> ✅ orientation |
| ✅ Order | ✅ shuffle <br/> ✅ maxChoices <br/> ✅ minChoices <br/> ✅ orientation |
| ❌ Associate | ❌ shuffle <br/> ❌ maxAssociations <br/> ❌ minAssociations |
| ✅ Match | ❌ shuffle <br/> ❌ maxAssociations <br/> ❌ minAssociations |
| ✅ GapMatch | ❌ shuffle <br/> ❌ maxAssociations <br/> ❌ minAssociations |
| Text-based Interaction | |
| ✅ InlineChoice | ❌ shuffle <br/> ❌ required |
| ✅ TextEntry | ❌ responseIdentifier <br/> ❌ base <br/> ❌ stringIdentifier <br/> ❌ expectedLength <br/> ❌ patternMask <br/> ❌ placeholderText <br/> ❌ format |
| ✅ ExtendedText | ❌ responseIdentifier <br/> ❌ base <br/> ❌ stringIdentifier <br/> ❌ expectedLength <br/> ❌ patternMask <br/> ❌ placeholderText <br/> ❌ maxStrings <br/> ❌ minStrings <br/> ❌ expectedLines <br/> ❌ format |
| ✅ Hottext | ❌ maxChoices <br/> ❌ minChoices |
| Graphical Interaction | | |
| ✅ Hotspot | ❌ maxChoices <br/> ❌ minChoices |
| ❌ GraphicOrder | ❌ maxChoices <br/> ❌ minChoices |
| ❌ GraphicAssociate | ❌ maxAssociations <br/> ❌ minAssociations |
| ✅ GraphicGapMatch | ❌ maxAssociations <br/> ❌ minAssociations |
| ❌ SelectPoint | ❌ maxChoices <br/> ❌ minChoices |
| ❌ PositionObject | ❌ centerPoint <br/> ❌ maxChoices <br/> ❌ minChoices |
| Misc. Interaction | | |
| ✅ Slider | ❌ lowerBound <br/> ❌ upperBound <br/> ❌ step <br/> ❌ stepLabel <br/> ❌ orientation <br/> ❌ reverse |
| ✅ Media | ❌ autostart <br/> ❌ minPlays <br/> ❌ maxPlays <br/> ❌ loop <br/> ❌ coords |
| ❌ Drawing | |
| ❌ Upload | ❌ type |
| ❌ Custom | ❌ extension |
| Children | | |
| ✅ SimpleChoice | ❌ identifier <br/> ❌ fixed <br/> ❌ templateIdentifier <br/> ❌ showHide |
| ✅ Prompt |  |
| ✅ SimpleAssociableChoice | ❌ identifier <br/> ❌ fixed <br/> ❌ templateIdentifier <br/> ❌ showHide <br/> ❌ matchGroup <br/> ❌ matchMax <br/> ❌ matchMin |
| ✅ SimpleMatchSet |  |
| ❌ FeedbackBlock | ❌ outcomeIdentifier <br/> ❌ identifier <br/> ❌ showHide |
| ❌ FeedbackInline | ❌ outcomeIdentifier <br/> ❌ identifier <br/> ❌ showHide |
| ❌ TemplateInline | ❌ templateIdentifier <br/> ❌ identifier <br/> ❌ showHide |
| ❌ Gap | ❌ identifier <br/> ❌ templateIdentifier <br/> ❌ showHide <br/> ❌ matchGroup <br/> ❌ required |
| ❌ GapChoice | ❌ identifier <br/> ❌ templateIdentifier <br/> ❌ showHide <br/> ❌ matchGroup <br/> ❌ required |
| ✅ GapText | ❌ identifier <br/> ❌ templateIdentifier <br/> ❌ showHide <br/> ❌ matchGroup <br/> ❌ required <br/> ❌ matchMax <br/> ❌ matchMin |
| ✅ GapImage | ❌ identifier <br/> ❌ templateIdentifier <br/> ❌ showHide <br/> ❌ matchGroup <br/> ❌ required <br/> ❌ matchMax <br/> ❌ matchMin <br/> ❌ matchMin <br/> ❌ objectLabel <br/> ❌ top <br/> ❌ left
| ❌ Label | |
| ✅ HotText | ❌ identifier <br/> ❌ templateIdentifier <br/> ❌ showHide |
| ✅ InlineChoice | ❌ identifier <br/> ❌ fixed <br/> ❌ templateIdentifier <br/> ❌ showHide |
| ✅ MathML2 | |
| ✅ MathML3 | |
| ❌ Include | |
| ❌ InlineContentModel | See, [HTML Inline Content]() |
| ❌ BlockContentModel | See, [HTML Block Content]() |
| ❌ FlowContentModel | See, [HTML Flow Content]() |
| ✅ RubricBlock | ❌ use <br/> ✅ view (See, [View]()) |
| ❌ InfoControl | ❌ title |
| ✅ Object | ✅ data </br> ✅ type </br> ✅ width </br> ✅ height |
| ❌ Param | ❌ name </br> ❌ value </br> ❌ valueType </br> ❌ type |
| ✅ HotspotChoice | ❌ identifier <br/> ❌ templateIdentifier <br/> ❌ showHide <br/> ❌ shape <br/> ❌ coords <br/> ❌ hotspotLabel <br/> |
| ✅ AssociableHotspot | ❌ identifier <br/> ❌ templateIdentifier <br/> ❌ showHide <br/> ❌ matchGroup <br/> ❌ shape <br/> ❌ coords <br/> ❌ hotspotLabel <br/> ❌ matchMax <br/> ❌ matchMin |

- HTML Inline Content: img, br, object, em, a, code, span, sub, acronym, big, tt, kbd, q, i, dfn, abbr, strong, sup, var, small, samp, b, cite, bdo, bdi, label, ruby, ssml11Group
- HTML Block Content: pre, h1, h2, h3, h4, h5, h6, p, address, dl, ol, ul, hr, blockquote, table, div, article, aside, audio, figure, footer, header, nav, section, video
- HTML Flow Content: HTML Inline Content + HTML Block Content
- View: author, candidate, proctor, scorer, testConstructor, tutor