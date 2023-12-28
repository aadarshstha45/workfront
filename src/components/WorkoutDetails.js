import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//date fns
import formatDate from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      throw Error("You must be logged in");
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUTS", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong> Load (kg): {workout.load}</strong>
      </p>
      <p>
        <strong> Reps: {workout.reps}</strong>
      </p>

      <p>{formatDate(new Date(workout.createdAt), { addSuffix: true })}</p>

      <span onClick={handleClick} className="material-symbols-outlined">
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
