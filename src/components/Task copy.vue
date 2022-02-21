<template >
<div v-if="showEditTask" :class="[task.reminder ? 'reminder' : '', 'task']">

    <form @submit="onSubmit" class="edit-form">
            <!-- if editing task display input field otherwise show title -->
        <input type="text" v-model="text" name="text" placeholder="Add Task" />
        <!-- if editing task display input field otherwise show date -->
        <input
        type="text"
        v-model="day"
        name="day"
        placeholder="Add Day &amp; Time"
      />

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</div>
    <div v-else @dblclick="$emit('toggle-reminder', task.id)" :class="[task.reminder ? 'reminder' : '', 'task']">

        <h3>{{ task.text }} </h3>
        <p>{{ task.day }} </p>
          <span class="options">
            <i @click="$emit('delete-task', task.id)" class="fas fa-times"></i>
            <i @click="showEditTask = !showEditTask" class="fas fa-edit"></i>
          </span>
    </div>
</template>
<script>
export default {
    name: 'Task',
    data() {
      return {
        showEditTask: false,
        text: this.$parent.task.text,
        day: ''
      }
    },
    props: {
        task: Object
    },
    methods: {
           onSubmit(e) {
            e.preventDefault();
            if(!this.text ) {
                alert('please add a task');
                return
            }
            console.log(this.day)
            const updatedTask = {
                // id: Math.floor(Math.random()*10000), // <- You would do this for id in real life as you might get duplicate ids
                text: this.text,
                day: this.day,
                reminder: this.reminder
            }
            this.$emit('update-task', updatedTask)
        }
    } 

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