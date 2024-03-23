import { createApp } from "vue";
import "ant-design-vue/dist/antd.css";
import 'element-plus/dist/index.css'
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import axios from "axios";
import store from "./store";

// test operation
axios.defaults.baseURL = "http://59.110.149.33:8001/api";

const app = createApp(App);
app.use(Antd);
app.use(store);
app.use(router).mount("#app");

