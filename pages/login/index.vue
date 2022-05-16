<template>
  <b-container class="mt-5">
    <b-row class="justify-content-center">
      <b-col
        lg="5"
        md="7"
      >
        <b-card class="bg-light border-0 mb-0">
          <b-card-header class="bg-transparent pb-3">
            <div class="text-muted text-center mt-2 mb-3">
              <small>{{ $t('login.below') }}</small>
            </div>
            <div class="btn-wrapper text-center">
              <b-button
                variant="outline-secondary"
                size="sm"
              >
                <img
                  src="~/static/img/brand/github.svg"
                  height="20"
                >
                Github
              </b-button>
              <b-button
                variant="outline-secondary"
                size="sm"
              >
                <img
                  src="~/static/img/brand/google.svg"
                  height="20"
                >
                Google
              </b-button>
            </div>
          </b-card-header>
          <b-card-body class="px-lg-3 py-lg-3">
            <div class="text-center text-muted mb-3">
              <small>{{ $t('login.credential') }}</small>
            </div>
            <b-form @submit.stop.prevent="onSubmit()">
              <b-form-group
                label-for="email-input"
              >
                <b-input-group>
                  <template #prepend>
                    <div class="input-group-text bg-light">
                      <font-awesome-icon icon="fa-solid fa-envelope" />
                    </div>
                  </template>
                  <b-form-input
                    id="email-input"
                    v-model="form.email"
                    name="email"
                    :state="/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(form.email)"
                    aria-describedby="email-invalid-feedback"
                  />
                </b-input-group>
                <b-form-invalid-feedback id="email-invalid-feedback">
                  {{ $t('feedback.format.error', { e: 'Email' }) }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                label-for="password-input"
              >
                <b-input-group>
                  <template #prepend>
                    <div class="input-group-text bg-light">
                      <font-awesome-icon icon="fa-solid fa-lock" />
                    </div>
                  </template>
                  <b-form-input
                    id="password-input"
                    v-model="form.password"
                    name="password"
                    :state="/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(form.password)"
                    aria-describedby="password-invalid-feedback"
                  />
                </b-input-group>
                <b-form-invalid-feedback id="password-invalid-feedback">
                  {{ $t('feedback.format.error', { e: 'Email' }) }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox
                  id="rememberMe"
                  v-model="form.remember"
                  name="rememberMe"
                  value="true"
                  unchecked-value="false"
                >
                  <small class="align-text-top">{{ $t('remember.me') }}</small>
                </b-form-checkbox>
              </b-form-group>

              <div class="text-center">
                <b-button
                  class="px-5"
                  type="submit"
                  variant="primary"
                >
                  {{ $t('login') }}
                </b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
        <b-row>
          <b-col col="6">
            <router-link
              to="/password/reset"
              class="text-light"
            >
              <small>{{ $t('forgot.password') }}</small>
            </router-link>
          </b-col>
          <b-col
            col="6"
            class="text-right"
          >
            <router-link
              to="/register"
              class="text-light"
            >
              <small>{{ $t('create.account') }}</small>
            </router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  layout: 'BaseLayout',
  data () {
    return {
      form: {
        email: '',
        password: '',
        remember: false,
      }
    };
  },
  methods: {
    onSubmit () {

    }
  }
});

</script>
