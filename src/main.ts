import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
import { useRouter } from 'vue-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { IonicVue, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
	IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
	IonInput, IonItem, IonLabel, IonList,
} from '@ionic/vue';
const app = createApp(App) .use(IonicVue) .use(router);
app.component('ion-content'       , IonContent      );
app.component('ion-page'          , IonPage         );
app.component('ion-header'        , IonHeader       );
app.component('ion-toolbar'       , IonToolbar      );
app.component('ion-title'         , IonTitle        );
app.component('ion-button'        , IonButton       );
app.component('ion-input'         , IonInput        );
app.component('ion-item'          , IonItem         );
app.component('ion-label'         , IonLabel        );
app.component('ion-list'          , IonList         );
app.component('ion-card'          , IonCard         );
app.component('ion-card-content'  , IonCardContent  );
app.component('ion-card-header'   , IonCardHeader   );
app.component('ion-card-subtitle' , IonCardSubtitle );
app.component('ion-card-title'    , IonCardTitle    );
/*
app.component('ion-'  , Ion  );
app.component('ion-'  , Ion  );
*/



router.isReady().then(() => {
	app.mount('#app');
});

import { defineComponent } from 'vue';
export default defineComponent({
	setup() {
		const router = useRouter();
		return { router };
	},

});


