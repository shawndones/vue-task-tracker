<template>
    <!-- can use v-if or v-show directives to show/hide AddTask form -->
    <AddTask v-show="showAddTask" @add-task="addTask" />
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/>
</template>

<script>
    import Tasks from '../components/Tasks';
    import AddTask from '../components/AddTask';
    export default {
        name: 'Home',
        props: {
            showAddTask: Boolean
        },
        components:  {
            Tasks,
            AddTask
        },
        data() {
            return {
                tasks: []
            }
        },
          methods: {
            async addTask(task) {
            const res = await fetch('api/tasks', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                },
                body: JSON.stringify(task)
            })

            const data = await res.json();

            // create new array with current tasks spread and add new task to array
            this.tasks = [...this.tasks, data]
            },
            updateTask(task) {
            console.log(task)

            this.tasks = this.tasks.map(
                // for each task if the id matches the id of selected task then change text, or date, or reminder
                (task) => task.id === id 
                // return the other task's values with the edited reminder value
                ? { ...task, reminder: !data.reminder } 
                : task

            )
            },


            async deleteTask(id) {

            const res = await fetch(`api/tasks/${id}`, {
                method: 'DELETE', 
                })

            // get the response and filter the tasks removing the task with the given id
            res.status === 200 
                ? (this.tasks = this.tasks.filter((task) => task.id !== id))
                : alert('Error deleting task') 
            
            // do not directly edit the tasks array or any data for that matter
            // replace entire array with a new array
            // filter out all the tasks that do not match the task id to be deleted and return them as a new array
            if (confirm('Are you sure?')) {
                this.tasks = this.tasks.filter(
                (task) => task.id !== id  
                )
            }
            },

            async toggleReminder(id) {
            const taskToToggle = await this.fetchTask(id)
            const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

            const res = await fetch(`api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedTask)

            })

            const data = await res.json();
            // return new array of updated tasks
            this.tasks = this.tasks.map(
                // for each task if the id matches the id of selected task then change reminder true/false
                (task) => task.id === id 
                // return the other task's values with the edited reminder value
                ? { ...task, reminder: !data.reminder } 
                : task
                )
            
            },
            async fetchTasks() {
            const res = await fetch('api/tasks')
            
            const data = await res.json()
            console.log(data)
            return data
            },
            async fetchTask(id) {
            const res = await fetch(`api/tasks/${id}`)
            
            const data = await res.json()
            console.log(data)
            return data
            },

        }, 
        // Life Cycle Methods

        async created() {
            this.tasks = await this.fetchTasks()
        }
    }
</script>