import { observable } from 'mobx';

// export class EditorStateRaw {
//   @observable rawString: string;

//   constructor(rawString: string) {
//     this.rawString = rawString;
//   }
// }

export const EditorStateStore = () => {
  return {
    value: '',

    newEditorState(value: string) {
      this.value = value;
      console.log('new editor value:', this.value);
    },
  };
};
