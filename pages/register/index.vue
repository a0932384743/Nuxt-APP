<template>
  <b-container>
    <b-row class="align-items-center justify-content-center h-100">
      <b-col
        lg="5"
        md="7"
      >
        <h4 class="text-center text-light mb-3">
          {{ $t('signup.below') }}
        </h4>
        <b-card class="bg-light border-0 mb-0">
          <b-card-header class="bg-transparent pb-3 text-center">
            <img
              src="/img/brand/logo.png"
              class="m-auto"
              height="50"
              width="50"
              alt="Logo"
              tag="vue-app"
            >
            <div class="text-muted text-center mt-2 mb-3">
              <small>{{ $t('app.sign.message') }}</small>
            </div>
          </b-card-header>
          <b-card-body class="px-lg-3 py-lg-3">
            <b-form
              autocomplete="off"
              @submit.stop.prevent="onSubmit()"
            >
              <b-form-group
                label-for="username-input"
              >
                <b-input-group>
                  <template #prepend>
                    <div class="input-group-text bg-light">
                      <font-awesome-icon icon="fa-solid fa-user" />
                    </div>
                  </template>
                  <b-form-input
                    id="username-input"
                    v-model="form.username"
                    autofocus
                    autocomplete="off"
                    type="text"
                    name="username"
                    :placeholder="$t('username')"
                    :state="!userNameValidate"
                    aria-describedby="username-invalid-feedback"
                  />
                </b-input-group>
                <b-form-invalid-feedback
                  id="username-invalid-feedback"
                  class="text-right"
                  :state="!userNameValidate"
                >
                  {{ userNameValidate }}
                </b-form-invalid-feedback>
              </b-form-group>
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
                    autocomplete="off"
                    type="email"
                    name="email"
                    :placeholder="$t('email')"
                    :state="!emailValidate"
                    aria-describedby="email-invalid-feedback"
                  />
                </b-input-group>
                <b-form-invalid-feedback
                  id="email-invalid-feedback"
                  class="text-right"
                  :state="!emailValidate"
                >
                  {{ emailValidate }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                label-for="password-input"
              >
                <b-input-group>
                  <template #prepend>
                    <div
                      class="input-group-text bg-light btn"
                      @click="passwordType = !passwordType"
                    >
                      <font-awesome-icon :icon="passwordType? 'fa-solid fa-lock' : 'fa-solid fa-unlock'" />
                    </div>
                  </template>
                  <b-form-input
                    id="password-input"
                    v-model="form.password"
                    autocomplete="off"
                    :type="passwordType ? 'password' : 'text'"
                    name="password"
                    :placeholder="$t('password')"
                    :state="passwordScore >= 20"
                    aria-describedby="password-invalid-feedback"
                  />
                </b-input-group>
                <b-form-invalid-feedback
                  id="password-invalid-feedback"
                  class="text-right"
                  :state="passwordScore >= 20"
                >
                  <span
                    v-if="passwordScore === 0"
                    class="text-danger"
                  >
                    {{ $t('feedback.require', { e: $t('password') }) }}
                  </span>
                  <span
                    v-if="passwordScore < 10 && passwordScore > 0"
                    class="text-danger"
                  >
                    {{ $t('feedback.password.danger') }}
                  </span>
                  <span
                    v-if="passwordScore < 20 && passwordScore >= 10"
                    class="text-warning"
                  >
                    {{ $t('feedback.password.warning') }}
                  </span>
                </b-form-invalid-feedback>
                <b-form-valid-feedback
                  id="password-valid-feedback"
                  class="text-right"
                  :state="passwordScore >= 20"
                >
                  {{ $t('feedback.password.success') }}
                </b-form-valid-feedback>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox
                  id="Agreement"
                  v-model="form.agreement"
                  name="Agreement"
                  value="true"
                  unchecked-value="false"
                >
                  <small class="align-text-top">{{ $t('signup.agree') }}</small>
                </b-form-checkbox>
              </b-form-group>

              <div class="text-center">
                <b-button
                  class="px-5"
                  type="submit"
                  variant="primary"
                  :disabled="passwordScore<20 || !!emailValidate || !!userNameValidate"
                >
                  {{ $t('signup') }}
                  <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
                </b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
        <b-row>
          <b-col
            cols="12"
            class="text-right"
          >
            <router-link
              to="/login"
              class="text-light"
            >
              <small>{{ $t('app.has.account') }}</small>
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
  name: 'Register',
  layout: 'BaseLayout',
  data () {
    return {
      passwordType: true,
      form: {
        username: '',
        email: '',
        password: '',
        agreement: false,
      }
    };
  },
  computed: {
    userNameValidate (): any {
      if (!this.form.username) {
        return this.$i18n.t('feedback.require', { e: this.$i18n.t('username') });
      } else if (this.form.username.length < 5) {
        return this.$i18n.t('feedback.length.error', { e: 5 });
      }
      return false;
    },
    emailValidate (): any {
      if (!this.form.email) {
        return this.$i18n.t('feedback.require', { e: this.$i18n.t('email') });
      } else if (!/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(this.form.email)) {
        return this.$i18n.t('feedback.format.error', { e: this.$i18n.t('email') });
      }
      return false;
    },
    passwordScore (): number {
      const password = this.form.password;
      let score = password.length;
      if (/[A-Z]/.test(this.form.password)) score *= 1.25;
      if (/[a-z]/.test(this.form.password)) score *= 1.25;
      if (/[0-9]/.test(this.form.password)) score *= 1.25;
      if (/[A-Z]/.test(this.form.password)) score *= 1.25;
      return score;
    },
  },
  methods: {
    onSubmit () {

    }
  }
});

</script>
