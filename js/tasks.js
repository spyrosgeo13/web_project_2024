document.addEventListener('DOMContentLoaded', function () {
    fetchTasks();

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('complete-task-button')) {
            var taskId = e.target.getAttribute('data-task-id');
            var isAnnouncement = e.target.getAttribute('data-is-announcement');
            if (isAnnouncement === 'true') {
                completeAnnouncement(taskId);
            } else {
                completeRequest(taskId);
            }
        } else if (e.target.classList.contains('cancel-task-button')) {
            var taskId = e.target.getAttribute('data-task-id');
            var isAnnouncement = e.target.getAttribute('data-is-announcement');
            if (isAnnouncement === 'true') {
                cancelAnnouncement(taskId);
            } else {
                cancelRequest(taskId);
            }
        }
    });

    function fetchTasks() {
        Promise.all([
            fetch('php/get_accepted_requests.php').then(response => response.json()),
            fetch('php/get_accepted_announcements.php').then(response => response.json())
        ])
        .then(([acceptedRequests, acceptedAnnouncements]) => {
            var tasksPanel = document.getElementById('tasks-panel');
            tasksPanel.innerHTML = '<h2>Current Tasks</h2>';

            acceptedRequests.forEach(request => {
                var taskDiv = createTaskDiv(request, false); // Pass false for isAnnouncement
                tasksPanel.appendChild(taskDiv);
            });

            acceptedAnnouncements.forEach(announcement => {
                var taskDiv = createTaskDiv(announcement, true); // Pass true for isAnnouncement
                tasksPanel.appendChild(taskDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
    }

    function createTaskDiv(task, isAnnouncement = false) {
        var taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <b>${isAnnouncement ? 'Announcement' : 'Request'}</b><br>
            Name: ${task.username}<br>
            Phone: ${task.telephone_number}<br>
            Item: ${task.item}<br>
            Quantity: ${task.quantity}<br>
            Date: ${isAnnouncement ? task.timestamp_accepted_resquer : task.request_timestamp}<br>
            <button class="complete-task-button" data-task-id="${isAnnouncement ? task.announcement_id : task.request_id}" data-is-announcement="${isAnnouncement}">Completed</button>
            <button class="cancel-task-button" data-task-id="${isAnnouncement ? task.announcement_id : task.request_id}" data-is-announcement="${isAnnouncement}">Cancel</button>
        `;
        return taskDiv;
    }

    function completeAnnouncement(announcementId) {
        fetch('php/complete_announcement.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ announcement_id: announcementId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Announcement completed successfully!');
                fetchTasks();
            } else {
                alert('Failed to complete announcement: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error completing announcement:', error);
        });
    }

    function cancelAnnouncement(announcementId) {
        fetch('php/cancel_announcement.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ announcement_id: announcementId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Announcement cancelled successfully!');
                fetchTasks(); // Refresh the tasks panel after cancellation
            } else {
                alert('Failed to cancel announcement: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error cancelling announcement:', error);
        });
    }

    function completeRequest(requestId) {
        fetch('php/complete_request.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ request_id: requestId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Request completed successfully!');
                fetchTasks(); // Refresh the tasks panel after completion
            } else {
                alert('Failed to complete request: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error completing request:', error);
        });
    }

    function cancelRequest(requestId) {
        fetch('php/cancel_request.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ request_id: requestId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Request cancelled successfully!');
                fetchTasks(); // Refresh the tasks panel after cancellation
            } else {
                alert('Failed to cancel request: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error cancelling request:', error);
        });
    }
});

