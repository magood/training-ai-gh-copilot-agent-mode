import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTeams() {
      try {
        const result = await fetchCollection(teamsEndpoint)

        if (isMounted) {
          setTeams(result.items)
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

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Teams</p>
          <h2>Training Groups</h2>
        </div>
        <span className="record-count">{total} records</span>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading teams...</div>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}

      {status === 'ready' && (
        <div className="table-responsive data-frame">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">City</th>
                <th scope="col">Captain</th>
                <th scope="col">Members</th>
                <th scope="col">Weekly Goal</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{team.city}</td>
                  <td>{team.captain}</td>
                  <td>{team.members}</td>
                  <td>{team.weeklyGoalMinutes} min</td>
                </tr>
              ))}
            </tbody>
          </table>
          {teams.length === 0 && <p className="empty-state">No teams found.</p>}
        </div>
      )}
    </section>
  )
}

export default Teams
