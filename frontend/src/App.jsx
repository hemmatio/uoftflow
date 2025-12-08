import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1'

function App() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Input state for dynamic IDs
  const [departmentId, setDepartmentId] = useState('1')
  const [courseId, setCourseId] = useState('1')
  const [professorId, setProfessorId] = useState('1')
  const [courseOfferingId, setCourseOfferingId] = useState('1')
  const [reviewId, setReviewId] = useState('1')
  const [searchQuery, setSearchQuery] = useState('')

  // Form data for POST requests
  const [signupData, setSignupData] = useState({ email: '', password: '', password_confirmation: '' })
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [departmentData, setDepartmentData] = useState({ code: '', name: '' })
  const [courseData, setCourseData] = useState({ code: '', name: '', department_id: '' })
  const [professorData, setProfessorData] = useState({ first_name: '', last_name: '' })
  const [courseOfferingData, setCourseOfferingData] = useState({ course_id: '', professor_id: '', year: '', term: '' })
  const [reviewData, setReviewData] = useState({ course_offering_id: '', rating: '', content: '' })

  const apiCall = async (method, endpoint, body = null) => {
    setLoading(true)
    setError(null)
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
      if (body) {
        options.body = JSON.stringify(body)
      }
      const res = await fetch(`${API_BASE}${endpoint}`, options)
      const data = await res.json()
      setResponse({ status: res.status, data, endpoint: `${method} ${endpoint}` })
    } catch (err) {
      setError(err.message)
      setResponse({ status: 'Error', data: err.message, endpoint: `${method} ${endpoint}` })
    } finally {
      setLoading(false)
    }
  }

  const healthCheck = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL?.replace('/api/v1', '') || ''}/up`)
      const text = await res.text()
      setResponse({ status: res.status, data: text || 'OK', endpoint: 'GET /up' })
    } catch (err) {
      setError(err.message)
      setResponse({ status: 'Error', data: err.message, endpoint: 'GET /up' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>🎓 UofTFlow API Tester</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        Click any button to test the corresponding API endpoint. Results will appear below.
      </p>

      {/* Authentication Section */}
      <div className="api-section">
        <h2>🔐 Authentication</h2>

        <h3>Sign Up</h3>
        <div className="input-group">
          <input
            placeholder="Email"
            value={signupData.email}
            onChange={(e) => setSignupData({...signupData, email: e.target.value})}
          />
          <input
            placeholder="Password"
            type="password"
            value={signupData.password}
            onChange={(e) => setSignupData({...signupData, password: e.target.value})}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            value={signupData.password_confirmation}
            onChange={(e) => setSignupData({...signupData, password_confirmation: e.target.value})}
          />
        </div>
        <div className="button-group">
          <button className="btn-post" onClick={() => apiCall('POST', '/signup', { user: signupData })}>
            <span className="method-badge method-post">POST</span> /signup
          </button>
        </div>

        <h3>Login</h3>
        <div className="input-group">
          <input
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
          />
          <input
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
          />
        </div>
        <div className="button-group">
          <button className="btn-post" onClick={() => apiCall('POST', '/login', { user: loginData })}>
            <span className="method-badge method-post">POST</span> /login
          </button>
        </div>

        <h3>Session</h3>
        <div className="button-group">
          <button className="btn-get" onClick={() => apiCall('GET', '/me')}>
            <span className="method-badge method-get">GET</span> /me (Current User)
          </button>
          <button className="btn-delete" onClick={() => apiCall('DELETE', '/logout')}>
            <span className="method-badge method-delete">DELETE</span> /logout
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="api-section">
        <h2>🔍 Search</h2>
        <div className="input-group">
          <input
            placeholder="Search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className="btn-get" onClick={() => apiCall('GET', `/search?q=${encodeURIComponent(searchQuery)}`)}>
            <span className="method-badge method-get">GET</span> /search
          </button>
        </div>
      </div>

      {/* Departments Section */}
      <div className="api-section">
        <h2>🏛️ Departments</h2>
        <div className="input-group">
          <label>
            Department ID:
            <input
              type="number"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              style={{ width: '80px' }}
            />
          </label>
        </div>
        <div className="button-group">
          <button className="btn-get" onClick={() => apiCall('GET', '/departments')}>
            <span className="method-badge method-get">GET</span> /departments
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/departments/${departmentId}`)}>
            <span className="method-badge method-get">GET</span> /departments/:id
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/departments/${departmentId}/courses`)}>
            <span className="method-badge method-get">GET</span> /departments/:id/courses
          </button>
        </div>

        <h3>Create Department</h3>
        <div className="input-group">
          <input
            placeholder="Code (e.g., CSC)"
            value={departmentData.code}
            onChange={(e) => setDepartmentData({...departmentData, code: e.target.value})}
          />
          <input
            placeholder="Name (e.g., Computer Science)"
            value={departmentData.name}
            onChange={(e) => setDepartmentData({...departmentData, name: e.target.value})}
          />
        </div>
        <div className="button-group">
          <button className="btn-post" onClick={() => apiCall('POST', '/departments', { department: departmentData })}>
            <span className="method-badge method-post">POST</span> /departments
          </button>
        </div>
      </div>

      {/* Courses Section */}
      <div className="api-section">
        <h2>📚 Courses</h2>
        <div className="input-group">
          <label>
            Course ID:
            <input
              type="number"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              style={{ width: '80px' }}
            />
          </label>
        </div>
        <div className="button-group">
          <button className="btn-get" onClick={() => apiCall('GET', '/courses')}>
            <span className="method-badge method-get">GET</span> /courses
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/courses/${courseId}`)}>
            <span className="method-badge method-get">GET</span> /courses/:id
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/courses/${courseId}/reviews`)}>
            <span className="method-badge method-get">GET</span> /courses/:id/reviews
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/courses/${courseId}/course_offerings`)}>
            <span className="method-badge method-get">GET</span> /courses/:id/course_offerings
          </button>
        </div>

        <h3>Create Course</h3>
        <div className="input-group">
          <input
            placeholder="Code (e.g., CSC108)"
            value={courseData.code}
            onChange={(e) => setCourseData({...courseData, code: e.target.value})}
          />
          <input
            placeholder="Name (e.g., Intro to CS)"
            value={courseData.name}
            onChange={(e) => setCourseData({...courseData, name: e.target.value})}
          />
          <input
            placeholder="Department ID"
            type="number"
            value={courseData.department_id}
            onChange={(e) => setCourseData({...courseData, department_id: e.target.value})}
          />
        </div>
        <div className="button-group">
          <button className="btn-post" onClick={() => apiCall('POST', '/courses', { course: courseData })}>
            <span className="method-badge method-post">POST</span> /courses
          </button>
        </div>
      </div>

      {/* Professors Section */}
      <div className="api-section">
        <h2>👨‍🏫 Professors</h2>
        <div className="input-group">
          <label>
            Professor ID:
            <input
              type="number"
              value={professorId}
              onChange={(e) => setProfessorId(e.target.value)}
              style={{ width: '80px' }}
            />
          </label>
        </div>
        <div className="button-group">
          <button className="btn-get" onClick={() => apiCall('GET', '/professors')}>
            <span className="method-badge method-get">GET</span> /professors
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/professors/${professorId}`)}>
            <span className="method-badge method-get">GET</span> /professors/:id
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/professors/${professorId}/reviews`)}>
            <span className="method-badge method-get">GET</span> /professors/:id/reviews
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/professors/${professorId}/course_offerings`)}>
            <span className="method-badge method-get">GET</span> /professors/:id/course_offerings
          </button>
        </div>

        <h3>Create Professor</h3>
        <div className="input-group">
          <input
            placeholder="First Name"
            value={professorData.first_name}
            onChange={(e) => setProfessorData({...professorData, first_name: e.target.value})}
          />
          <input
            placeholder="Last Name"
            value={professorData.last_name}
            onChange={(e) => setProfessorData({...professorData, last_name: e.target.value})}
          />
        </div>
        <div className="button-group">
          <button className="btn-post" onClick={() => apiCall('POST', '/professors', { professor: professorData })}>
            <span className="method-badge method-post">POST</span> /professors
          </button>
        </div>
      </div>

      {/* Course Offerings Section */}
      <div className="api-section">
        <h2>📅 Course Offerings</h2>
        <div className="input-group">
          <label>
            Course Offering ID:
            <input
              type="number"
              value={courseOfferingId}
              onChange={(e) => setCourseOfferingId(e.target.value)}
              style={{ width: '80px' }}
            />
          </label>
        </div>
        <div className="button-group">
          <button className="btn-get" onClick={() => apiCall('GET', '/course_offerings')}>
            <span className="method-badge method-get">GET</span> /course_offerings
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/course_offerings/${courseOfferingId}`)}>
            <span className="method-badge method-get">GET</span> /course_offerings/:id
          </button>
          <button className="btn-get" onClick={() => apiCall('GET', `/course_offerings/${courseOfferingId}/reviews`)}>
            <span className="method-badge method-get">GET</span> /course_offerings/:id/reviews
          </button>
        </div>

        <h3>Create Course Offering</h3>
        <div className="input-group">
          <input
            placeholder="Course ID"
            type="number"
            value={courseOfferingData.course_id}
            onChange={(e) => setCourseOfferingData({...courseOfferingData, course_id: e.target.value})}
          />
          <input
            placeholder="Professor ID"
            type="number"
            value={courseOfferingData.professor_id}
            onChange={(e) => setCourseOfferingData({...courseOfferingData, professor_id: e.target.value})}
          />
          <input
            placeholder="Year (e.g., 2024)"
            type="number"
            value={courseOfferingData.year}
            onChange={(e) => setCourseOfferingData({...courseOfferingData, year: e.target.value})}
          />
          <input
            placeholder="Term (e.g., Fall)"
            value={courseOfferingData.term}
            onChange={(e) => setCourseOfferingData({...courseOfferingData, term: e.target.value})}
          />
        </div>
        <div className="button-group">
          <button className="btn-post" onClick={() => apiCall('POST', '/course_offerings', { course_offering: courseOfferingData })}>
            <span className="method-badge method-post">POST</span> /course_offerings
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="api-section">
        <h2>⭐ Reviews</h2>
        <div className="input-group">
          <label>
            Review ID:
            <input
              type="number"
              value={reviewId}
              onChange={(e) => setReviewId(e.target.value)}
              style={{ width: '80px' }}
            />
          </label>
        </div>

        <h3>Create Review</h3>
        <div className="input-group">
          <input
            placeholder="Course Offering ID"
            type="number"
            value={reviewData.course_offering_id}
            onChange={(e) => setReviewData({...reviewData, course_offering_id: e.target.value})}
          />
          <input
            placeholder="Rating (1-5)"
            type="number"
            min="1"
            max="5"
            value={reviewData.rating}
            onChange={(e) => setReviewData({...reviewData, rating: e.target.value})}
          />
          <input
            placeholder="Review content"
            value={reviewData.content}
            onChange={(e) => setReviewData({...reviewData, content: e.target.value})}
            style={{ width: '300px' }}
          />
        </div>
        <div className="button-group">
          <button className="btn-post" onClick={() => apiCall('POST', '/reviews', { review: reviewData })}>
            <span className="method-badge method-post">POST</span> /reviews
          </button>
          <button className="btn-delete" onClick={() => apiCall('DELETE', `/reviews/${reviewId}`)}>
            <span className="method-badge method-delete">DELETE</span> /reviews/:id
          </button>
        </div>
      </div>

      {/* Health Check */}
      <div className="api-section">
        <h2>💚 Health Check</h2>
        <div className="button-group">
          <button className="btn-get" onClick={() => healthCheck()}>
            <span className="method-badge method-get">GET</span> /up (Health Check)
          </button>
        </div>
      </div>

      {/* Response Area */}
      <div className="response-area">
        <h2>📤 API Response</h2>
        <div className="response-box">
          {loading && <pre className="loading">Loading...</pre>}
          {error && <pre className="error">Error: {error}</pre>}
          {response && !loading && (
            <pre>
              <span className={response.status >= 200 && response.status < 300 ? 'success' : 'error'}>
                {response.endpoint}
              </span>
              {'\n'}
              <span>Status: {response.status}</span>
              {'\n\n'}
              {JSON.stringify(response.data, null, 2)}
            </pre>
          )}
          {!response && !loading && !error && (
            <pre style={{ color: '#888' }}>Click a button above to make an API request...</pre>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

