const API_URL = "https://todo-backend-1kdd.onrender.com";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userId, setUserId] = useState(null);
  const [boards, setBoards] = useState([]);

  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  /* ---------- LOGIN ---------- */
  const login = async () => {
    setMessage("");
    setShowRegister(false);

    const res = await fetch(`${API_URL}/api/auth/login`
, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      if (data.message === "Invalid credentials") {
        setShowRegister(true);
      }
      return;
    }

    setUserId(data.userId);
  };

  /* ---------- REGISTER ---------- */
  const register = async () => {
  setMessage("");

  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    setMessage(data.message);
    return;
  }

  setUserId(data.userId); // auto login
};


  /* ---------- LOGOUT ---------- */
  const logout = () => {
    setUserId(null);
    setBoards([]);
    setEmail("");
    setPassword("");
    setMessage("");
    setShowRegister(false);
  };

  /* ---------- BOARDS ---------- */
  const loadBoards = async () => {
    const res = await fetch(
      `${API_URL}/api/boards?userId=${userId}`
    );
    const data = await res.json();
    setBoards(data);
  };

  const createBoard = async () => {
    if (!newBoardTitle.trim()) return;

    await fetch(`${API_URL}/api/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newBoardTitle, userId }),
    });

    setNewBoardTitle("");
    loadBoards();
  };

  const deleteBoard = async (id) => {
    await fetch(
      `${API_URL}/api/boards/${id}?userId=${userId}`,
      { method: "DELETE" }
    );
    loadBoards();
  };

  const startEdit = (board) => {
    setEditingBoardId(board._id);
    setEditingTitle(board.title);
  };

  const updateBoard = async (id) => {
    await fetch(
      `${API_URL}/api/boards/${id}?userId=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingTitle }),
      }
    );

    setEditingBoardId(null);
    setEditingTitle("");
    loadBoards();
  };

  useEffect(() => {
    if (userId) loadBoards();
  }, [userId]);

  /* ---------- UI ---------- */
  return (
    <div className="app-wrapper">
      <div className="card">
        {!userId ? (
          <>
            <h1>Login</h1>

            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="primary-btn" onClick={login}>
              Login
            </button>

            {showRegister && (
              <button className="secondary-btn" onClick={register}>
                Register
              </button>
            )}

            <p className="message">{message}</p>
          </>
        ) : (
          <>
            {/* LOGOUT */}
            <div className="logout-row">
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>

            <h1>Your Boards</h1>

            <div className="row">
              <input
                className="input"
                placeholder="Board title"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
              />
              <button className="primary-btn" onClick={createBoard}>
                Create
              </button>
            </div>

            {boards.length === 0 && (
              <p className="empty-text">No boards yet. Create your first one ✨</p>
            )}

            <ul className="board-list">
              {boards.map((b) => (
                <li className="board-item" key={b._id}>
                  {editingBoardId === b._id ? (
                    <>
                      <input
                        className="input"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                      />
                      <button
                        className="save-btn"
                        onClick={() => updateBoard(b._id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{b.title}</span>
                      <div>
                        <button
                          className="edit-btn"
                          onClick={() => startEdit(b)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteBoard(b._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
