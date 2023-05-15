import MyRadioGroup from './MyRadioGroup';
import RadioCheck from './RadioCheck';

export interface RadioItems {
  id: string
  value: string | number
  label: React.ReactNode
}

export { MyRadioGroup, RadioCheck };
