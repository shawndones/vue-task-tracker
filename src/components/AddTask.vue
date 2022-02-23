<template>
     <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input type="text" v-model="text" name="text" placeholder="Add Task" />
    </div>
    <div class="form-control">
      <label>Day &amp; Time</label>
      <input
        type="text"
        v-model="day"
        name="day"
        placeholder="Add Day &amp; Time"
      />

      {{day}}
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder"  name="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>


<script>
export default {
    name: 'AddTask',
    // data - a function that returns an object
    data() {
      return {
        text: '',
        day: '',
        reminder: false
      }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            if(!this.text ) {
                alert('please add a task');
                return
            }
            
            const newTask = {
                // id: Math.floor(Math.random()*10000), // <- You would do this for id in real life as you might get duplicate ids
                text: this.text,
                day: this.day,
                reminder: this.reminder
            }
            this.$emit('add-task', newTask)

            // clear the form
            this.text = ''
            this.day = ''
            this.reminder = false
        }
    },
    emits: ['add-task']
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>