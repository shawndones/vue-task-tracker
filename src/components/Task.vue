<template >
    <div @dblclick="$emit('toggle-reminder', task.id)" :class="[task.reminder ? 'reminder' : '', 'task']">
        <input 
          v-if="showEditTask"
          v-model="taskTitle"
          @blur="blurTitle" 
          type="text" />
        <h3 v-else>{{ task.text }}</h3>
         <input 
          v-if="showEditTask"
          v-model="taskDate"
          @blur="blurDate" 
          type="text" />
        <p v-else>{{ task.day }} </p>
        <span class="options">
          <i @click="$emit('delete-task', task.id)" class="fas fa-times"></i>
          <i @click="showEditTask = !showEditTask" class="fas fa-edit"></i>
        </span>
    </div>
</template>
<script>
export default {
    name: 'Task',
    props: {
        task: Object
    },
    data() {
      return {
        showEditTask: false,
        taskTitle: this.task.text,
        taskDate: this.task.day
      }
    },
    methods: {
      blurTitle() {
         if(!this.taskTitle) {
              alert('please add a task');
              return
          } else if (!this.taskDate) {
            alert('please add a date');
              return
          }
        const updateTask = {
          id: this.task.id,
          taskTitle: this.taskTitle,
          taskDate: this.taskDate
        }
        this.showEditTask = !this.showEditTask;
        this.$parent.$emit('update-task', updateTask);
      },
      blurDate() {
         if(!this.taskDate) {
              alert('please add a task');
              return
          } else if (!this.taskDate) {
            alert('please add a date');
              return
          }
        const updateTask = {
          id: this.task.id,
          taskTitle: this.taskTitle,
          taskDate: this.taskDate
        }
        this.showEditTask = !this.showEditTask;
        this.$parent.$emit('update-task', updateTask);
      }
    },
    emits: ['update-task']
}
</script>
<style scope>
.fa-times {
  color: red;
}
.fa-edit {
  color: navy;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px; 
  cursor: pointer;
  position: relative;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.options {
  position: absolute;
  right: 8px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-around;
  height: 100%;
  /* padding: 10px 0; */
  /* width: 40px; */
}
</style>