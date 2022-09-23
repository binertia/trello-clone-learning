export type CardDragItem = {
  type: "CARD";
  index: number;
  id: string;
  columnId: string;
  text: string;
};
export type ColumnDragItem = {
  type: "COLUMN";
  index: number;
  id: string;
  text: string;
};

export type DragItem = CardDragItem | ColumnDragItem;
