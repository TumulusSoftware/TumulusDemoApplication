import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/start'
	},
	{
		path: '/start',
		component: () => import('@/views/Start.vue')
	},
	{
		path: '/user/signUp',
		component: () => import('@/views/user/SignUp.vue')
	},
	{
		path: '/user/signIn',
		component: () => import('@/views/user/SignIn.vue')
	},
	{
		path: '/user/verify',
		component: () => import('@/views/user/Verify.vue')
	},
	{
		path: '/u/',
		component: TabsPage,
		children: [
			{
				path: '',
				redirect: '/u/owner'
			},
			{
				path: 'owner',
				component: () => import('@/views/OwnerHome.vue')
			},
			{ path: 'owner/assets'        , component: () => import('@/views/owner/Assets.vue'        ) },
			{ path: 'owner/agreements'    , component: () => import('@/views/owner/Agreements.vue'    ) },
			{ path: 'owner/assign'        , component: () => import('@/views/owner/Assign.vue'        ) },
			{ path: 'owner/authorizations', component: () => import('@/views/owner/Authorizations.vue') },
			{ path: 'owner/request'       , component: () => import('@/views/owner/Request.vue'       ) },
			{ path: 'owner/states'        , component: () => import('@/views/owner/States.vue'        ) },
			{ path: 'owner/upload'        , component: () => import('@/views/owner/Upload.vue'        ) },
			{
				path: 'announcer',
				component: () => import('@/views/AnnouncerHome.vue')
			},
			{
				path: 'viewer',
				component: () => import('@/views/ViewerHome.vue')
			},
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
