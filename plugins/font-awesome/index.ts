import Vue from 'vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';

/* import specific icons */
import { far } from '@fortawesome/free-regular-svg-icons';

/* import specific icons */
import { fab } from '@fortawesome/free-brands-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);
library.add(far);
library.add(fab);

/* add font awesome icon component */
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

