export interface ChatAction {
  type: 'button' | 'input';
  options?: {
    label: string;
    value: string;
    action: () => void;
  }[];
  inputFields?: {
    name: string;
    type: string;
    placeholder: string;
    required?: boolean;
  }[];
}