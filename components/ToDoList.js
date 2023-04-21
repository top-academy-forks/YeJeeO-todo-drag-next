import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DataContext } from "./MyContext";

export default function ToDoList() {
  const [data, setData] = useContext(DataContext);

  const deleteItem = (id) => {
    setData(data.filter((x) => x.id !== id));
  };
  const handleEnd = (result) => {
    console.log(result);
    if (!result.destination) return; 
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <ul {...provided.droppableProps} 
             ref={provided.innerRef}
            >
              {data.map((item, index) => (<Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}>
                  {(provided, snapshot) => (
                    <li
                      {...provided.draggableProps}
                       ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      key={item.id}
                      className={
                        snapshot.isDragging ? "selected" : "not-selected"
                      }
                    >
                      {index + 1}.{item.name}
                    <img src="./delete.png" alt="delete" className="deleteItem" onClick={e=>{e.stopPropagation(); deleteItem(item.id);}}/>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
