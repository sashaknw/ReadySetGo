import { useState } from "react";
import "./AddTaskModal.css";

const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="modal-backdrop">
    <div className="confirm-modal">
      <h4>Delete Task</h4>
      <p>This action cannot be undone. Are you sure?</p>
      <div className="confirm-actions">
        <button onClick={onCancel}>Cancel</button>
        <button
          className="delete-btn"
          onClick={() => {
            onConfirm();
            const successOverlay = document.createElement("div");
            successOverlay.className = "success-notification-overlay";

            const successMsg = document.createElement("div");
            successMsg.className = "success-notification";
            successMsg.innerHTML = "<p>Task successfully deleted!</p>";

            successOverlay.appendChild(successMsg);
            document.body.appendChild(successOverlay);

            setTimeout(() => successOverlay.remove(), 3000);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const AddTaskModal = ({
  isOpen,
  onClose,
  task,
  setTask,
  onSubmit,
  onDelete,
  categories,
  isEditing,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  if (!isOpen) return null;

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setTimeout(() => {
        onDelete();
        onClose();
      }, 1000);
    }, 2000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update task with image and set preview
        setTask({ ...task, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    // Remove image from task and preview
    setTask({ ...task, image: null });
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById("task-image-upload");
    if (fileInput) fileInput.value = "";
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={onSubmit} className="task-form">
            <div className="modal-header">
              <h3>{isEditing ? "Update Task" : "Add New Task"}</h3>
              {isEditing && (
                <img
                  src="/src/assets/icons/delete.png"
                  className="delete-button-png"
                  alt="delete icon"
                  onClick={() => setShowDeleteConfirm(true)}
                />
              )}
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Task Image</label>
              <input
                type="file"
                id="task-image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="image-upload-input"
              />

              {imagePreview && (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Task preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="remove-image-btn"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={task.category}
                  onChange={(e) =>
                    setTask({ ...task, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={task.priority}
                  onChange={(e) =>
                    setTask({ ...task, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">
                {isEditing ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>

        {showDeleteConfirm && (
          <DeleteConfirmModal
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </div>
      {showSuccess && <SuccessNotification />}
    </>
  );
};

export default AddTaskModal;
