// define arrays to store users and tasks
let users = [];
let tasks = [];

// get HTML elements
const userForm = document.querySelector('form:nth-of-type(1)');
const taskForm = document.querySelector('form:nth-of-type(2)');
const taskNameFilter = document.getElementById('task-name-filter');
const taskStatusFilter = document.getElementById('task-status-filter');
const taskDueDateFilter = document.getElementById('task-due-date-filter');
const taskList = document.querySelector('table tbody');

// user creation form submission event listener
userForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const userNameInput = userForm.elements['user-name'];
	const userName = userNameInput.value.trim();
	if (userName !== '') {
		users.push(userName);
		populateUserOptions();
		userNameInput.value = '';
	}
});

// task creation form submission event listener
taskForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const taskUserInput = taskForm.elements['task-user'];
	const taskNameInput = taskForm.elements['task-name'];
	const taskDueDateInput = taskForm.elements['task-due-date'];
	const taskUser = taskUserInput.value;
	const taskName = taskNameInput.value.trim();
	const taskDueDate = taskDueDateInput.value;
	if (taskUser !== '' && taskName !== '' && taskDueDate !== '') {
		tasks.push({
			user: taskUser,
			name: taskName,
			dueDate: taskDueDate,
			status: 'pending'
		});
		renderTaskList();
		taskUserInput.value = '';
		taskNameInput.value = '';
		taskDueDateInput.value = '';
	}
});

// task name filter input event listener
taskNameFilter.addEventListener('input', () => {
	renderTaskList();
});

// task status filter input event listener
taskStatusFilter.addEventListener('change', () => {
	renderTaskList();
});

// task due date filter input event listener
taskDueDateFilter.addEventListener('input', () => {
	renderTaskList();
});

// delete task button click event listener
taskList.addEventListener('click', (event) => {
	if (event.target.classList.contains('delete')) {
		const taskId = parseInt(event.target.parentElement.parentElement.dataset.id);
		tasks = tasks.filter(task => task.id !== taskId);
		renderTaskList();
	}
});

// edit task button click event listener
taskList.addEventListener('click', (event) => {
	if (event.target.classList.contains('edit')) {
		const taskId = parseInt(event.target.parentElement.parentElement.dataset.id);
		const task = tasks.find(task => task.id === taskId);
		const taskUserInput = taskForm.elements['task-user'];
		const taskNameInput = taskForm.elements['task-name'];
		const taskDueDateInput = taskForm.elements['task-due-date'];
		taskUserInput.value = task.user;
		taskNameInput.value = task.name;
		taskDueDateInput.value = task.dueDate;
		tasks = tasks.filter(task => task.id !== taskId);
		renderTaskList();
	}
});

// change status button click event listener
taskList.addEventListener('click', (event) => {
	if (event.target.classList.contains('change-status')) {
		const taskId = parseInt(event.target.parentElement.parentElement.dataset.id);
		const task = tasks.find(task => task.id === taskId);
		task.status = (task.status === 'pending') ? 'completed' : 'pending';
		renderTaskList();
	}
});

// populate user options in task creation form
function populateUserOptions() {
	const taskUserInput = taskForm.elements['task-user'];
	taskUserInput.innerHTML = '<option value="">Select user</option>';
	users.forEach(user => {
		taskUserInput.innerHTML += `<option value="${user}">${user}</option>`;
	});
}

// render task list
function renderTaskList() {
	let filteredTasks = tasks.filter(task => {
		const taskName = task.name.toLowerCase();
		const taskStatus = task.status.toLowerCase();
		const taskDueDate = task.dueDate;
		const taskNameFilterValue = taskNameFilter.value.toLowerCase();
		const taskStatusFilterValue = taskStatusFilter.value.toLowerCase();
		const taskDueDateFilterValue = taskDueDateFilter.value;
		return taskName.includes(taskNameFilterValue) && taskStatus.includes(taskStatusFilterValue) && taskDueDate.includes(taskDueDateFilterValue);
	});

	taskList.innerHTML = '';
	filteredTasks.forEach((task, index) => {
		const row = document.createElement('tr');
		row.dataset.id = index;
		row.innerHTML = `
			<td>${task.user}</td>
			<td>${task.name}</td>
			<td>${task.dueDate}</td>
			<td>${task.status}</td>
			<td>
				<button class="edit">Edit</button>
				<button class="delete">Delete</button>
				<button class="change-status">Change Status</button>
			</td>
		`;
		taskList.appendChild(row);
	});
}

// initialize task list
renderTaskList();

// edit task
function editTask(taskId) {
    const task = tasks[taskId];
    const name = prompt('Enter new task name:', task.name);
    const dueDate = prompt('Enter new due date (YYYY-MM-DD):', task.dueDate);
    if (name !== null && dueDate !== null) {
      task.name = name;
      task.dueDate = dueDate;
      renderTaskList();
    }
  }
  
  // Add event listener to task list for edit
  taskList.addEventListener('click', event => {
    if (event.target.classList.contains('edit')) {
      const taskId = event.target.closest('tr').dataset.id;
      editTask(taskId);
    }
  });
  

// delete task
function deleteTask(taskId) {
	tasks.splice(taskId, 1);
	renderTaskList();
}

// change task status
function changeStatus(taskId) {
  const task = tasks[taskId];
  if (newStatus !== null && (newStatus === 'pending' || newStatus === 'completed')) {
    task.status = newStatus;
    renderTaskList();
  }
}

// add event listener to task list for status change
taskList.addEventListener('click', event => {
  if (event.target.classList.contains('change-status')) {
    const taskId = event.target.closest('tr').dataset.id;
    const task = tasks[taskId];
    const newStatus = prompt('Enter new status (pending/completed):', task.status);
    if (newStatus !== null) {
      task.status = newStatus;
      renderTaskList();
    }
  }
});

  

// add event listeners to task list for edit, delete, and change status
taskList.addEventListener('click', event => {
if (event.target.classList.contains('delete')) {
		const taskId = event.target.closest('tr').dataset.id;
		deleteTask(taskId);
	} 
});
