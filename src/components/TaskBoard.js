import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TaskBoard({ tasks, setTasks }) {

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        const reordered = Array.from(tasks);
        const [removed] = reordered.splice(result.source.index, 1)
        reordered.splice(result.destination.index, 0, removed)

        setTasks(reordered)
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                        style={{
                            margin: 8,
                            padding: 8,
                            width: 250,
                            backgroundColor: '#f0f0f0',
                            minHeight: 500,
                            display: "inline-block",
                            verticalAlign: "top"
                        }}>
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                        className="p-2 m-2 border rounded bg-white" >
                                        {task.title}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}