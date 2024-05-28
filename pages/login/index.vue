<template>
  <div class="d-flex align-content-center justify-content-center h-100">
    <div
      class="d-none d-sm-block h-100"
      style="flex: 1 1 calc(100% - 400px)"
    >
      <img
        src="/img/background/system-bg.png"
        class="bg-image"
        alt="Logo"
        tag="vue-app"
      >
    </div>
    <div style="flex: 1 1 400px">
      <b-card class="h-100 rounded-0">
        <b-card-body class="px-lg-3 py-lg-5">
          <h5 class="text-center"><strong>{{ $t('app.welcome') }}</strong></h5>
          <div class="text-center">
            <img src="/img/brand/logo-3.png" height="80" alt="Logo">
          </div>
          <div
            class="text-muted d-flex flex-wrap mb-4 justify-content-center align-content-center flex-row mb-2 mt-3 flex-sm-column"
          >
            <div class="text-nowrap">
              <small>{{ $t('login.below') }}</small>
            </div>
            <div class="btn-wrapper text-center mx-2">
              <b-button
                variant="outline-secondary"
                size="sm"
                @click.prevent="loginByGoogle"
              >
                <img
                  src="/img/brand/google.svg"
                  height="20"
                >
                Google
              </b-button>
            </div>
            <div class="text-nowrap">
              <small>{{ $t('login.credential') }}</small>
            </div>
          </div>
          <b-form
            autocomplete="off"
            @submit.stop.prevent="loginByEmail()"
          >
            <b-form-group label-for="email-input">
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
            <b-form-group label-for="password-input">
              <b-input-group>
                <template #prepend>
                  <div
                    class="input-group-text"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-lock"
                    />
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
                <template #append>
                  <div
                    class="input-group-text bg-light btn"
                    @click="passwordType = !passwordType"
                  >
                    <font-awesome-icon
                      :icon="
                        passwordType
                          ? 'fa-solid fa-eye-slash'
                          : 'fa-solid fa-eye'
                      "
                    />
                  </div>
                </template>
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
                id="rememberMe"
                v-model="form.remember"
                name="rememberMe"
                value="true"
                unchecked-value="false"
              >
                <small class="align-text-top">{{ $t('remember.me') }}</small>
              </b-form-checkbox>
            </b-form-group>
            <div class="text-center my-2">
              <b-button
                type="submit"
                pill
                variant="info"
                style="min-width: 100px"
                :disabled="passwordScore < 20 || !!emailValidate"
              >
                {{ $t('login') }}
              </b-button>
            </div>
            <div class="d-flex justify-content-between">
              <router-link
                class="text-secondary"
                to="/register"
              >
                <small>{{ $t('forgot.password') }}</small>
              </router-link>
              <router-link
                class="text-secondary"
                to="/register"
              >
                <small>{{ $t('create.account') }}</small>
              </router-link>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GoogleAuthProvider } from 'firebase/auth';
export default Vue.extend({
  name: 'Login',
  layout: 'BaseLayout',
  data() {
    return {
      passwordType: true,
      form: {
        email: '',
        password: '',
        remember: false
      }
    };
  },
  computed: {
    emailValidate(): any {
      if (!this.form.email) {
        return this.$i18n.t('feedback.require', { e: this.$i18n.t('email') });
      } else if (
        !/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
          this.form.email
        )
      ) {
        return this.$i18n.t('feedback.format.error', {
          e: this.$i18n.t('email')
        });
      }
      return false;
    },
    passwordScore(): number {
      const password = this.form.password;
      let score = password.length;
      if (/[A-Z]/.test(this.form.password)) score *= 1.25;
      if (/[a-z]/.test(this.form.password)) score *= 1.25;
      if (/[0-9]/.test(this.form.password)) score *= 1.25;
      if (/[A-Z]/.test(this.form.password)) score *= 1.25;
      return score;
    }
  },
  methods: {
    async loginByEmail() {
      try {
        const res = await this.$fire.auth.signInWithEmailAndPassword(
          this.form.email,
          this.form.password
        );
        this.$store.dispatch('common/setUser', res.user);
        this.$router.push('/dashboard');
      } catch (e) {
        console.warn('loginByEmail Error', e);
      }
    },
    async loginByGoogle() {
      try {
        const res = await this.$fire.auth.signInWithPopup(
          new GoogleAuthProvider()
        );
        this.$store.dispatch('common/setUser', res.user);
        this.$router.push('/dashboard');
      } catch (e) {
        console.warn('loginByGoogle Error', e);
      }
    }
  }
});
</script>
<style lang="scss">
@import 'asserts/scss/_variables.scss';
.bg-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  max-height: calc( 100vh - $header-height);
}
</style>
