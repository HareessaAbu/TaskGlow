<template>
    <div class="w-full mx-auto mt-10">
        <div class="bg-blue-50 shadow-lg rounded-lg overflow-hidden flex flex-col">
            <!-- Card Image -->
            <div v-if="tasks" class="flex flex-col divide-y px-4 pb-2 relative">
                <div v-for="(task, index) in paginatedTasks" :key="task">
                    <transition name="fade">
                        <Task :task="task" :index="index" @toggle-complete="toggleComplete" @remove-task="removeTask"/>
                    </transition>
                </div>
                
                <transition name="fade">
                    <Pagination v-if="paginatedTasks.length > 0" @page-changed="changePage" :total-pages="pageCount" :per-page="size" :current-page="pageNum"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
import Task from './Task.vue'

export default {
    name:'TaskList',
    components: { Pagination, Task },
    emits: ['update-tasks'],
    props: {
        tasks: {default: []},
        size: {
            type: Number,
            required: false,
            default: 5
        }
    },
    data() {
        return {
            pageNum: 1, //the first page
            newTasks: this.tasks
        };
    },
    computed: {
        pageCount(){
            return Math.ceil(this.newTasks.length / this.size)
        },
        paginatedTasks(){
            const start = (this.pageNum - 1) * this.size,
                end = start + this.size;
            return this.newTasks.slice().reverse().slice(start, end)
        }
    },
    methods:{
        removeTask(index) {
            const reversedTasks = this.newTasks.slice().reverse()
            reversedTasks.splice(index, 1);
            this.newTasks = reversedTasks.slice().reverse()
            this.$emit('update-tasks', this.newTasks)
        },
        changePage(value){
            this.pageNum = value
        },
        toggleComplete(value){
            const reversedTasks = this.newTasks.slice().reverse()
            reversedTasks[value.index].completed = value.completed
            this.newTasks = reversedTasks.slice().reverse()
            this.$emit('update-tasks', this.newTasks)
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>