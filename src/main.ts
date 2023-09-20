import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import { Field, Toast } from 'vant';
import VueClipBoard from 'vue-clipboard2'
import 'vant/lib/index.css';
const app = createApp(App);
app.use(router)
app.use(Field);
app.use(Toast);
app.mount("#app")
app.use(VueClipBoard)

// createApp(App).use(router).mount('#app')
