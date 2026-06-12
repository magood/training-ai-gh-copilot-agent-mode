import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      try {
        const result = await fetchCollection(workoutsEndpoint)

        if (isMounted) {
          setWorkouts(result.items)
          setTotal(result.total)
          setStatus('ready')
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Workouts</p>
          <h2>Suggested Sessions</h2>
        </div>
        <span className="record-count">{total} records</span>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading workouts...</div>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}

      {status === 'ready' && (
        <div className="table-responsive data-frame">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Workout</th>
                <th scope="col">Focus</th>
                <th scope="col">Level</th>
                <th scope="col">Duration</th>
                <th scope="col">Exercises</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? workout.title}>
                  <td>{workout.title}</td>
                  <td className="text-capitalize">{workout.focusArea}</td>
                  <td className="text-capitalize">{workout.level}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{Array.isArray(workout.exercises) ? workout.exercises.join(', ') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {workouts.length === 0 && <p className="empty-state">No workouts found.</p>}
        </div>
      )}
    </section>
  )
}

export default Workouts
