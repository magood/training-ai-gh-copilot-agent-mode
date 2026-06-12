import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        const result = await fetchCollection(usersEndpoint)

        if (isMounted) {
          setUsers(result.items)
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

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="view-heading">
        <div>
          <p className="eyebrow">Users</p>
          <h2>Member Profiles</h2>
        </div>
        <span className="record-count">{total} records</span>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading users...</div>}
      {status === 'error' && <div className="alert alert-danger">{error}</div>}

      {status === 'ready' && (
        <div className="table-responsive data-frame">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Team</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.username}>
                  <td>{user.displayName}</td>
                  <td>{user.username}</td>
                  <td className="text-capitalize">{user.role}</td>
                  <td>{user.teamName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="empty-state">No users found.</p>}
        </div>
      )}
    </section>
  )
}

export default Users
