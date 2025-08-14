// src/features/Admin/Quizzes/AdminQuizForm.jsx
import React, { useState, useEffect } from 'react';
import { createQuiz, updateQuiz, getQuizById } from '../../../services/quizService';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminQuizForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    title: '',
    level: 'basic',
    questions: [{ question: '', options: ['', ''], correctAnswer: '' }]
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      getQuizById(id).then(res => setForm(res.data));
    }
  }, [id, isEdit]);

  const updateField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onQuestionChange = (idx, field, val) => {
    setForm(prev => {
      const qs = [...prev.questions];
      qs[idx] = { ...qs[idx], [field]: val };
      return { ...prev, questions: qs };
    });
  };

  const addQuestion = () => {
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, { question: '', options: ['', ''], correctAnswer: '' }]
    }));
  };

  const removeQuestion = idx => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== idx)
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (isEdit) await updateQuiz(id, form);
    else await createQuiz(form);
    navigate('/admin/quizzes');
  };

  return (
    <div className="admin-content">
      {/* Page header */}
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">
            {isEdit ? 'Edit Quiz' : 'Create Quiz'}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {isEdit
              ? 'Chỉnh sửa quiz khám phá Hệ Mặt Trời'
              : 'Tạo mới một quiz khám phá Hệ Mặt Trời'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/quizzes')}
          className="button-secondary"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={onSubmit} className="form-card max-w-3xl mx-auto">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={e => updateField('title', e.target.value)}
            required
            placeholder="Enter quiz title"
            className="form-input"
          />
        </div>

        {/* Level */}
        <div className="form-group">
          <label htmlFor="level" className="form-label">Level</label>
          <select
            id="level"
            name="level"
            value={form.level}
            onChange={e => updateField('level', e.target.value)}
            className="form-select"
          >
            <option value="basic">Basic</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Questions */}
        {form.questions.map((q, i) => (
          <fieldset key={i} className="form-card space-y-4">
            <legend className="form-label font-medium">Question {i + 1}</legend>

            <div className="form-group">
              <label className="form-label">Question Text</label>
              <input
                type="text"
                value={q.question}
                onChange={e => onQuestionChange(i, 'question', e.target.value)}
                required
                placeholder="Enter question text"
                className="form-input"
              />
            </div>

            {q.options.map((opt, j) => (
              <div className="form-group" key={j}>
                <label className="form-label">Option {j + 1}</label>
                <input
                  type="text"
                  value={opt}
                  onChange={e => {
                    const newOpts = [...q.options];
                    newOpts[j] = e.target.value;
                    onQuestionChange(i, 'options', newOpts);
                  }}
                  required
                  placeholder={`Enter option ${j + 1}`}
                  className="form-input"
                />
              </div>
            ))}

            <div className="form-group">
              <label className="form-label">Correct Answer</label>
              <input
                type="text"
                value={q.correctAnswer}
                onChange={e => onQuestionChange(i, 'correctAnswer', e.target.value)}
                required
                placeholder="Enter the correct answer"
                className="form-input"
              />
            </div>

            <div className="form-actions">
              {form.questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(i)}
                  className="button-secondary"
                >
                  Remove Question
                </button>
              )}
              {i === form.questions.length - 1 && (
                <button
                  type="button"
                  onClick={addQuestion}
                  className="button-primary"
                >
                  + Add Question
                </button>
              )}
            </div>
          </fieldset>
        ))}

        {/* Submit */}
        <div className="form-actions">
          <button type="submit" className="button-primary">
            {isEdit ? 'Update Quiz' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}
