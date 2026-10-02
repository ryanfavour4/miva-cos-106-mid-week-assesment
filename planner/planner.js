/* =====================================================
   Academic Planner — planner.js
   Task management: add, complete, delete, filter, stats.
   Uses localStorage for persistence.
   ===================================================== */

(function () {
  "use strict";

  /* ---- State ---- */
  var tasks = [];
  var currentFilter = "all";

  /* ---- DOM references ---- */
  var form = document.getElementById("task-form");
  var titleInput = document.getElementById("task-title");
  var subjectInput = document.getElementById("task-subject");
  var dueInput = document.getElementById("task-due");
  var titleError = document.getElementById("title-error");
  var taskList = document.getElementById("task-list");
  var emptyState = document.getElementById("empty-state");
  var clearDoneBtn = document.getElementById("clear-done");
  var filterBtns = document.querySelectorAll(".filter-btn");

  var statTotal = document.getElementById("stat-total");
  var statDone = document.getElementById("stat-done");
  var statRemaining = document.getElementById("stat-remaining");
  var progressFill = document.getElementById("progress-fill");
  var progressText = document.getElementById("progress-text");

  /* ---- Storage key ---- */
  var STORAGE_KEY = "rf_academic_tasks";

  /* ---- Load tasks from localStorage ---- */
  function loadTasks() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        tasks = JSON.parse(saved);
      } catch (e) {
        tasks = [];
      }
    }
  }

  /* ---- Save tasks to localStorage ---- */
  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  /* ---- Add a new task ---- */
  function addTask(title, subject, due) {
    var task = {
      id: Date.now(),
      title: title,
      subject: subject,
      due: due,
      done: false
    };
    tasks.unshift(task);
    saveTasks();
    render();
  }

  /* ---- Toggle task completion ---- */
  function toggleTask(id) {
    tasks.forEach(function (task) {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    saveTasks();
    render();
  }

  /* ---- Delete a task ---- */
  function deleteTask(id) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });
    saveTasks();
    render();
  }

  /* ---- Clear all completed tasks ---- */
  function clearCompleted() {
    tasks = tasks.filter(function (task) {
      return !task.done;
    });
    saveTasks();
    render();
  }

  /* ---- Check if a due date is overdue ---- */
  function isOverdue(dueDate) {
    if (!dueDate) return false;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var due = new Date(dueDate);
    return due < today;
  }

  /* ---- Format date for display ---- */
  function formatDate(dueDate) {
    if (!dueDate) return "";
    var d = new Date(dueDate);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()] + " " + d.getDate();
  }

  /* ---- Render the task list ---- */
  function render() {
    taskList.innerHTML = "";

    /* Filter tasks */
    var visible = tasks.filter(function (task) {
      if (currentFilter === "active") return !task.done;
      if (currentFilter === "done") return task.done;
      return true;
    });

    /* Show/hide empty state */
    if (visible.length === 0) {
      emptyState.classList.remove("hidden");
      if (tasks.length > 0) {
        emptyState.querySelector("p").textContent =
          currentFilter === "done"
            ? "No completed tasks yet."
            : "No active tasks. Everything is done!";
      } else {
        emptyState.querySelector("p").textContent =
          "No tasks yet. Add your first task using the form on the left.";
      }
    } else {
      emptyState.classList.add("hidden");
    }

    /* Create task elements */
    visible.forEach(function (task) {
      var li = document.createElement("li");
      li.className = "task-item";
      if (task.done) li.classList.add("task-item--done");

      /* Checkbox */
      var check = document.createElement("div");
      check.className = "task-check";
      check.setAttribute("role", "checkbox");
      check.setAttribute("aria-checked", task.done);
      check.addEventListener("click", function () {
        toggleTask(task.id);
      });

      /* Task body */
      var body = document.createElement("div");
      body.className = "task-body";

      var titleEl = document.createElement("div");
      titleEl.className = "task-title";
      titleEl.textContent = task.title;
      body.appendChild(titleEl);

      /* Meta row (subject + due date) */
      if (task.subject || task.due) {
        var meta = document.createElement("div");
        meta.className = "task-meta";

        if (task.subject) {
          var subj = document.createElement("span");
          subj.className = "task-subject";
          subj.textContent = task.subject;
          meta.appendChild(subj);
        }

        if (task.due) {
          var due = document.createElement("span");
          due.className = "task-due";
          if (!task.done && isOverdue(task.due)) {
            due.classList.add("task-due--overdue");
            due.textContent = "Overdue \u2014 " + formatDate(task.due);
          } else {
            due.textContent = "Due " + formatDate(task.due);
          }
          meta.appendChild(due);
        }

        body.appendChild(meta);
      }

      /* Delete button */
      var del = document.createElement("button");
      del.className = "task-delete";
      del.innerHTML = "&times;";
      del.setAttribute("aria-label", "Delete task");
      del.addEventListener("click", function () {
        deleteTask(task.id);
      });

      li.appendChild(check);
      li.appendChild(body);
      li.appendChild(del);
      taskList.appendChild(li);
    });

    updateStats();
  }

  /* ---- Update statistics ---- */
  function updateStats() {
    var total = tasks.length;
    var done = tasks.filter(function (t) { return t.done; }).length;
    var remaining = total - done;
    var percent = total > 0 ? Math.round((done / total) * 100) : 0;

    statTotal.textContent = total;
    statDone.textContent = done;
    statRemaining.textContent = remaining;
    progressFill.style.width = percent + "%";
    progressText.textContent = percent + "% complete";
  }

  /* ---- Form submission ---- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var title = titleInput.value.trim();

    /* Validate title */
    if (title === "") {
      titleError.textContent = "Task title is required.";
      titleInput.classList.add("input-error");
      return;
    }

    titleError.textContent = "";
    titleInput.classList.remove("input-error");

    addTask(title, subjectInput.value.trim(), dueInput.value);

    /* Reset form */
    form.reset();
    titleInput.focus();
  });

  /* ---- Clear input error on typing ---- */
  titleInput.addEventListener("input", function () {
    if (titleInput.value.trim() !== "") {
      titleError.textContent = "";
      titleInput.classList.remove("input-error");
    }
  });

  /* ---- Filter buttons ---- */
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      render();
    });
  });

  /* ---- Clear completed ---- */
  clearDoneBtn.addEventListener("click", function () {
    var doneCount = tasks.filter(function (t) { return t.done; }).length;
    if (doneCount === 0) return;
    clearCompleted();
  });

  /* ---- Initialise ---- */
  loadTasks();
  render();
})();
