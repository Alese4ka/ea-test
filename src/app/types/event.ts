
export type Event = {
  id: string;
  name: string;
  active: boolean;
  photo: {
    url: string;
    block: string;
    name: string;
    date: string;
    text: string;
  }[];
};
