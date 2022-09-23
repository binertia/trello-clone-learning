import { useRef } from "react";
import useItemDrag from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { useAppState } from "./state/AppStateContext";
import { isHidden } from "./utils/isHidden";
import { moveTask } from "./state/actions";
import { CardContainer } from "./styles";
import { DragItem } from "./DragItem";

type CardProps = {
  text: string;
  index: number;
  id: string;
  columnId: string;
  isPreview?: boolean;
};

const Card = ({ text,index, id, columnId, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({
    type: "CARD",
    id,
    index,
    text,
    columnId,
  });
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item:DragItem) {
      if (item.type === "CARD") {
        if (item.id === id) {
        return;
      }
      const dragIndex = item.index
      const hoverIndex = index
      const sourceColumn = item.columnId
      const targetColumn = columnId

      dispatch({type:"MOVE_TASK", payload: {dragIndex, hoverIndex, sourceColumn, targetColumn}})
      //dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
    }
  });

  drag(drop(ref));
  return (
    <CardContainer
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};

export default Card;
