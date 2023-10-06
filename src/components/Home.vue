<template>
    <div class="pt-12 md:px-18 justify-self-center w-full md:max-w-4xl">
        <h1 class="font-bold text-blue-500 dark:text-blue-300 text-6xl">TaskGlow</h1>
        <transition v-if="incompleteTaskCount > 0" name="fade">
            <h4 class="mt-4" >You have got 
                <strong class="text-blue-500 dark:text-blue-300 underline"> {{ incompleteTaskCount }} </strong> 
                {{ ((incompleteTaskCount < 2) ? ' task':' tasks') }} today. <span class="text-blue-500 dark:text-blue-300 font-semibold">Time to shine!</span>
            </h4>
        </transition>
    
        <span v-else>
            <transition name="fade">
                <h3 class="mt-2">Take a breather if you'd like.<br></h3>
            </transition>
            <transition>
                <small>Or, Add some tasks — Let's get <span class="text-blue-500 dark:text-blue-300 font-semibold">productive</span> and tackle them all.</small>
            </transition>
        </span>

        <h4 class="mt-7 font-bold">My Tasks</h4>

        <form @submit.prevent="addTask">
            <div class="flex flex-col space-y-4 align-middle mt-2 md:flex-row md:space-x-4 md:space-y-0">
                <input type="text"
                    class="basis-3/5"
                    name="title"
                    required
                    v-model="newTask.title"
                    placeholder="New task"
                >

                <VueDatePicker
                    class="basis-2/5 h-full"
                    v-model="newTask.due_date" 
                    :enable-time-picker="false"
                    name="dueDate"
                    :format="dateFormat"
                    placeholder="Select Date"
                    required>
                </VueDatePicker>

                <button type="submit"
                    title="Save"
                    class="button rounded bg-blue-500 px-4 py-2 text-white"
                >
                    <font-awesome-icon :icon="['fas', 'floppy-disk']" /> <span class="ml-1 md:hidden">Save</span>
                </button>
            </div>
        </form>

        <transition name="fade">
            <TaskList v-if="tasks.length"
            :tasks="tasks" 
            @update-tasks="updateTasks" 
            />
        </transition>
        
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import TaskList from './TaskList.vue'

export default {
    name:'Home',
    components: { VueDatePicker, TaskList },
    data() {
        return {
            dateFormat: 'dd MMMM yyyy',
            initialTask: {
                title: '',
                due_date: '',
                completed: false
            },
            newTask: {
                title: '',
                due_date: '',
                completed: false
            },
            tasks: [],
        };
    },
    computed: {
        incompleteTaskCount() {

            return this.tasks.filter(function(task){
                return task.completed == false
            }).length
        }
    },
    methods: {
        updateTasks(newTasks) {
            this.tasks = newTasks
        },
        addTask() {
            if (this.newTask.title && this.newTask.due_date) {
                this.tasks.push(this.newTask)
                this.newTask = JSON.parse(JSON.stringify(this.initialTask))
            }
        }
    }
}
</script>
