type Attribute<Characteristic> = Characteristic extends {$value: infer Value} | {$value: infer Value}[]
  ? Attribute<Value>
  : Characteristic extends number
  ? string
  : Characteristic extends boolean
  ? 'true' | 'false'
  : Characteristic;
type Attributes<Characteristics> = {[Key in keyof Characteristics]: Attribute<Characteristics[Key]>};

type QtiModelProps<BaseCharacteristics, Characteristics> = Attributes<BaseCharacteristics> &
  Attributes<Characteristics>;

export {Attribute, Attributes, QtiModelProps};
