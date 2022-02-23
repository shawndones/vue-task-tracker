<template>
    <div :key="task.id" v-for="task in tasks">
        <Task 
            @toggle-reminder="$emit('toggle-reminder', task.id)"
            @delete-task="$emit('delete-task', task.id)" 
            @update-task="$emit('update-task', updateTask);"
            :task="task" 
        />
    </div>        
</template>

<script>
import Task from './Task.vue'

export default {
    name: 'Tasks',
    props: {
        tasks: Array,
    },
    components: {
        Task,
    },

    // array of events you want to emit
    emits: ['delete-task', 'toggle-reminder', 'update-task']
}
</script> 