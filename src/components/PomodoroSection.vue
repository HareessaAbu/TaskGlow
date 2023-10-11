<template>
    <div class="w-full mx-auto mt-10">
        <div class="bg-blue-50 shadow-lg rounded-lg overflow-hidden flex flex-col text-blue-950">
            <div class="flex flex-col divide-y px-4 p-2 relative">
                <div class="flex flex-row justify-center space-x-6">
                    <button
                        title="Save"
                        class="button btn-primary"
                    >
                        pomodoro
                    </button>

                    <button
                        title="Save"
                        class="button btn-primary"
                    >
                        short break
                    </button>

                    <button
                        title="Save"
                        class="button btn-primary"
                    >
                        long break
                    </button>
                </div>
                <span>{{ pomodoroChanges }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'PomodoroSection',
    components: { },
    emits: [],
    props: {
        
    },
    data() {
        return {
            pomodoro: 25 * 60, // initial time in seconds
        };
    },
    computed: {
        pomodoroChanges(){
            const minutes = Math.floor(this.pomodoro / 60)
            const seconds = this.pomodoro % 60
        
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        },
    },
    methods: {
        startTimer() {
            const timerInterval = setInterval(() => {
                if (this.pomodoro <= 0) {
                    clearInterval(timerInterval);
                    alert('Countdown complete!');
                } else {
                    this.pomodoro--;
                }
            }, 1000); // Update every 1 second
        },
    },
    created() {
        // this.startTimer(); // Start the countdown timer when the component is created
    },
}
</script>