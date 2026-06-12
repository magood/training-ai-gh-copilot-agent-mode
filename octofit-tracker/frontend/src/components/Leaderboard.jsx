import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      try {
        const result = await fetchCollection(leaderboardEndpoint)

        if (isMounted) {
          setEntries(result.items)
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

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Leaderboard</p>
          <h2>Competitive Standings</h2>
        </div>
        <span className="record-count">{total} records</span>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading leaderboard...</div>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}

      {status === 'ready' && (
        <div className="table-responsive data-frame">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Athlete</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.username}`}>
                  <td className="rank-cell">#{entry.rank}</td>
                  <td>{entry.displayName}</td>
                  <td>{entry.teamName}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {entries.length === 0 && <p className="empty-state">No leaderboard entries found.</p>}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
