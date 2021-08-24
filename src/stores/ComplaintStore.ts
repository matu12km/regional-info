import { observable } from 'mobx';

export class Complaint {
  @observable id: string = Math.random.toString();
  @observable name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export const ComplaintStore = () => {
  return {
    complaints: [new Complaint('legacy code is a pain')],

    get complaintByLength(): Complaint[] {
      return this.complaints.sort((a, b) => a.name.length - b.name.length);
    },

    get complaintCount(): number {
      return this.complaints.length;
    },

    addComplaint(name: string) {
      this.complaints.push(new Complaint(name));
    },
  };
};

export type ComplaintStoreT = ReturnType<typeof ComplaintStore>;
