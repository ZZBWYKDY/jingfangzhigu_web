import{ createRouter,createWebHashHistory } from "vue-router";

const routes=[
    {
        path:"/",
        redirect:"/welcome"
    },
    {
        path:'/login',//路径
        name:'login',//名字
        component:()=>import('../views/login.vue')
    },
    {
        path:'/goLogin',//路径
        name:'goLogin',//名字
        component:()=>import('../views/goLogin.vue')
    },
    {
        path:'/goRegister',//路径
        name:'goRegister',//名字
        component:()=>import('../views/goRegister.vue')
    },
    {
        path:'/welcome',//路径
        name:'welcome',//名字
        component:()=>import('../views/welcome.vue')
    },
    {
        path:'/check',//路径
        name:'check',//名字
        component:()=>import('../views/check.vue')
    },
    {
        path:'/test',
        name:'',
        component: ()=>import('../components/chat/healthQA.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/setting.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '/user',
            name: 'user',
            component: () => import('../components/settings/UserSetting.vue'),
          },
          {
            path: '/customization',
            name: 'customization',
            component: () => import('../components/settings/Customization.vue'),
          },
          {
            path: '/notification',
            name: 'notification',
            component: () => import('../components/settings/Notification.vue'),
          },
          {
            path: '/data',
            name: 'data',
            component: () => import('../components/settings/Data.vue'),
          },
        ],
    },
    {
        path:'/chat',//路径
        name:'chat',//名字
        component:()=>import('../views/chat.vue'),
        meta: { requiresAuth: true }
      },
      {
        path:'/personal',
        name:'/personal',
        component:() => import('../views/personal.vue'),
        meta: { requiresAuth: true }
      },
      {
        path:"/DataScouting",
        name:'DataScouting',//名字
        component:()=>import('../views/DataScouting.vue')
    },
    {
      path:"/switchtab",
      name:'switchtab',//名字
      redirect: '/switchtab/underjkzswd',
      component:()=>import('../components/chat/switchtab.vue'),
      children:[
        {
          path:"/switchtab/underjkzswd",
          name:'underjkzswd',//名字
          component:()=>import('../components/chat/underjkzswd.vue')
        },
          {
            path: '/switchtab/MediRush',
            name: 'MediRush',
            component: () => import('../components/chat/MediRush/MediRush.vue'),
          },
          {
            path: '/switchtab/face',
            name: 'face',
            component: () => import('../components/chat/mianzhen.vue'),
          },
          {
            path: '/switchtab/ViewQ&A',
            name: 'ViewQ&A',
            component: () => import('../components/chat/healthQA.vue'),
          },
      ]
  },
]

const router = createRouter({
    history:createWebHashHistory('/'),
    routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router