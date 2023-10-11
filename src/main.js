import './input.css'
import './assets/main.css'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { inject } from '@vercel/analytics';

inject();

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFloppyDisk, faTrashCan, faEllipsis, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add({ faFloppyDisk, faTrashCan, faEllipsis, faChevronLeft, faChevronRight })

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
