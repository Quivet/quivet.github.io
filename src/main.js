import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)({
    data() {
        return {
            title: "Isles of Darkness",
            copyright: "&copy; 2022."
        }
    }
})

app.use(router)

app.mount('#app')
