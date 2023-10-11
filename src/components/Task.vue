<template>
    <div class="p-4 flex flex-row items-center w-full justify-between flex-wrap">
        <div class="inline-flex flex-row flex-start relative text-black w-4/5 md:w-5/6">
            <div class="flex item-property leading-6 h-7 items-center">
                <input type="checkbox" :id="`completed${index}`" :name="`completed${index}`" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" v-model="newTask.completed">
            </div>
            <div class="leading-6 ml-3 w-full border-solid item-property">
                <label :for="`completed${index}`" class="task-title" :title="task.title">{{ task.title }}</label>
                <p class="text-xs font-normal text-gray-500 dark:text-gray-450">{{ parseDate(task.due_date) }}</p>
            </div> 
        </div>
        <!-- Card Actions (Buttons) -->
        <div class="inline-flex item-property">
            <button 
                class="px-4 py-2 self-end text-gray-300 rounded-full hover:text-red-500" 
                @click="$emit('remove-task', index)">
                <font-awesome-icon :icon="['fas', 'trash-can']" />
            </button>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Task',
    emits: ['toggle-complete','remove-task'],
    props: {
        task: Object,
        index: Number
    },
    data(){
        return {
            newTask: {
                title: this.task.title,
                due_date: this.task.due_date,
                completed: this.task.completed
            }
        }
    },
    watch: {
        'newTask.completed': function(){
            this.$emit('toggle-complete', {
                'index': this.index,
                'completed' : this.newTask.completed
            })
        }
    },
    methods: {
        parseDate(due_date){
            let date = new Date(due_date)

            let day = date.getDate();
            let month = date.toLocaleString('default', { month: 'long' });;
            let year = date.getFullYear();

            return `${day} ${month} ${year}`
        }
    }
}
</script>