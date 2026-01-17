import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import API from "./API";

const STATUS_COLORS = {
    TO_DO: {
        bg: "#fff3e0",
        border: "#fb8c00"
    },
    IN_PROGRESS: {
        bg: "#e3f2fd",
        border: "#1e88e5"
    },
    COMPLETED: {
        bg: "#e8f5e9",
        border: "#43a047"
    }
};

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

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) return;

        const taskId = Number(draggableId);
        const newStatus = destination.droppableId;

        const previousTasks = tasks;


        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? { ...task, status: newStatus }
                    : task
            )
        );

        try {
            await API.patch(`/tasks/${taskId}/status`, JSON.stringify(newStatus), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("❌ Failed to update task status", error);
            setTasks(previousTasks);
            alert("Failed to update task status. Please try again.");
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: "flex", gap: 16, overflowX: "auto", padding: 16 }}>
                {STATUSES.map((col) => (
                    <div
                        key={col.id}
                        style={{
                            width: 260,
                            minHeight: 400,
                            padding: 8,
                            background: "#f4f5f7",
                            borderRadius: 6,
                            flex: "0 0 auto"
                        }}
                    >
                        {/* Column header */}
                        <h5 style={{ marginBottom: 8, fontWeight: "bold" }}>
                            {col.title} ({columns[col.id].tasks.length})
                        </h5>

                        {/* Droppable task area */}
                        <Droppable droppableId={col.id}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        minHeight: 120,
                                        padding: 4,
                                        background: snapshot.isDraggingOver
                                            ? "#e3f2fd"
                                            : "transparent",
                                        transition: "background 0.2s ease"
                                    }}
                                >
                                    {columns[col.id].tasks.map((task, index) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={String(task.id)}
                                            index={index}
                                        >
                                            {(provided, snapshot) => {
                                                const colors = STATUS_COLORS[task.status] || STATUS_COLORS.TO_DO;

                                                return (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            padding: 10,
                                                            marginBottom: 8,
                                                            background: snapshot.isDragging
                                                                ? "#bbdefb"
                                                                : colors.bg || "#fff",
                                                            borderLeft: `4px solid ${colors.border || "#ccc"}`,
                                                            borderRadius: 4,
                                                            boxShadow: snapshot.isDragging
                                                                ? "0 4px 10px rgba(0,0,0,0.2)"
                                                                : "none",
                                                            opacity: task.status === "COMPLETED" ? 0.85 : 1,
                                                            cursor: "grab"
                                                        }}
                                                    >
                                                        <p style={{ margin: 0, fontWeight: "bold", fontSize: 14 }}>
                                                            {task.title}
                                                        </p>
                                                        {task.description && (
                                                            <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#666" }}>
                                                                {task.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
}