import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      try {
        const result = await fetchCollection(activitiesEndpoint)

        if (isMounted) {
          setActivities(result.items)
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

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Activities</p>
          <h2>Recent Training Logs</h2>
        </div>
        <span className="record-count">{total} records</span>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading activities...</div>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}

      {status === 'ready' && (
        <div className="table-responsive data-frame">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Athlete</th>
                <th scope="col">Activity</th>
                <th scope="col">Duration</th>
                <th scope="col">Calories</th>
                <th scope="col">Completed</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.username}-${activity.completedAt}`}>
                  <td>{activity.username}</td>
                  <td className="text-capitalize">{activity.activityType}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.completedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && <p className="empty-state">No activities found.</p>}
        </div>
      )}
    </section>
  )
}

export default Activities
