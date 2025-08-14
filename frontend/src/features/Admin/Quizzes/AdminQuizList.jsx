// src/features/Admin/Quizzes/AdminQuizList.jsx
import React, { useEffect, useState } from "react";
import { getAllQuizzes, deleteQuiz } from "../../../services/quizService";
import { useNavigate } from "react-router-dom";

export default function AdminQuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const res = await getAllQuizzes();
      setQuizzes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this quiz?")) {
      try {
        await deleteQuiz(id);
        loadQuizzes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-content">
      {/* Page header */}
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Quizzes</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Tạo, chỉnh sửa và quản lý các bài quiz khám phá Hệ Mặt Trời
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/quizzes/new")}
          className="button-primary"
        >
          + Add Quiz
        </button>
      </div>

      {/* Quizzes Table */}
      <div className="list-card scrollable">
        <table className="min-w-full divide-y divide-[var(--color-border)]">
          <thead className="bg-[var(--color-bg)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">
                Level
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">
                Updated At
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">
                History
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[var(--color-border)]">
            {quizzes.map((q) => (
              <tr key={q._id}>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{q.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{q.level}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">
                  {q.createdAt ? new Date(q.createdAt).toLocaleString() : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">
                  {q.updatedAt ? new Date(q.updatedAt).toLocaleString() : '—'}
                </td>
                <td className="px-6 py-4 whitespace-normal text-[var(--color-text)]">
                  {Array.isArray(q.history) && q.history.length > 0 ? (
                    <ul className="list-disc list-inside text-xs text-[var(--color-text-muted)]">
                      {q.history.map((h, i) => (
                        <li key={i}>
                          <span className="font-medium text-[var(--color-text)]">{h.title}</span>{' '}
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {h.updatedAt
                              ? `(${new Date(h.updatedAt).toLocaleDateString()})`
                              : '—'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-[var(--color-text-muted)]">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => navigate(`/admin/quizzes/${q._id}/edit`)}
                    className="px-2 py-1 text-xs button-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="px-2 py-1 text-xs button-secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
