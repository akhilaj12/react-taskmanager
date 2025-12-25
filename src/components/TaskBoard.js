import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const STATUSES = [
  { id: "TO_DO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Done" }
];

export default function TaskBoard({ tasks, setTasks }) {

 const columns = STATUSES.reduce((acc, status) => {
  acc[status.id] = {
    ...status,
    tasks: tasks.filter(
      task => (task.status ?? "TO_DO") === status.id
    )
  };
  return acc;
}, {});


  const onDragEnd = (result) => {
  const { source, destination, draggableId } = result;
  if (!destination) return;

  if (source.droppableId === destination.droppableId) return;

  setTasks(prev =>
    prev.map(task =>
      task.id === Number(draggableId)
        ? { ...task, status: destination.droppableId }
        : task
    )
  );
};


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        {STATUSES.map((col) => (
          <Droppable key={col.id} droppableId={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: 260,
                  minHeight: 400,
                  padding: 8,
                  background: "#f4f5f7",
                  borderRadius: 6
                }}
              >
                <h5>{col.title}</h5>

                {columns[col.id].tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={String(task.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          padding: 10,
                          marginBottom: 8,
                          background: snapshot.isDragging ? "#e3f2fd" : "#fff",
                          borderRadius: 4
                        }}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
