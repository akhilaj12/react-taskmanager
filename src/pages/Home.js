import { useAuth } from "../context/AuthContext";
import AuthPrompt from "../components/AuthPrompt";
import TaskSection from "../components/TaskSection";

function Home() {
    const { token } = useAuth();

    return (
        <div>
            <h2 className="text-center mt-5">Welcome to the Task Manager</h2>
            {token ? <TaskSection /> : <AuthPrompt />}
        </div>
    );
}

export default Home;