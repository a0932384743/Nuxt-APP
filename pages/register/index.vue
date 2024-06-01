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
          <h5 class="text-center">
            <strong>{{ $t('app.welcome') }}</strong>
          </h5>
          <div class="text-center">
            <img
              src="/img/brand/logo-3.png"
              height="80"
              alt="Logo"
            >
          </div>
          <div
            class="text-muted d-flex flex-wrap mb-4 justify-content-center align-content-center flex-row mb-2 mt-3 flex-sm-column"
          >
            <div class="text-nowrap">
              <small> {{ $t('signup.below') }}</small>
            </div>
          </div>
          <b-form
            autocomplete="off"
            @submit.stop.prevent="onSubmit()"
          >
            <b-form-group label-for="username-input">
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
            <b-form-group label-for="password-input">
              <b-input-group>
                <template #prepend>
                  <div
                    class="input-group-text bg-light btn"
                    @click="passwordType = !passwordType"
                  >
                    <font-awesome-icon
                      :icon="
                        passwordType ? 'fa-solid fa-lock' : 'fa-solid fa-unlock'
                      "
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

            <div class="text-center my-2">
              <b-button
                class="px-5"
                type="submit"
                pill
                variant="info"
                :disabled="
                  passwordScore < 20 || !!emailValidate || !!userNameValidate || loading
                "
              >
                {{ $t('signup') }}
                <font-awesome-icon
                  v-if="!loading"
                  icon="fa-solid fa-arrow-right-to-bracket"
                />
                <b-spinner
                  v-if="loading"
                  label="Loading..."
                  small
                />
              </b-button>
            </div>
            <div class="d-flex justify-content-end">
              <router-link
                to="/login"
                class="text-secondary"
              >
                <small>{{ $t('app.has.account') }}</small>
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

export default Vue.extend({
  name: 'Register',
  layout: 'BaseLayout',
  data() {
    return {
      passwordType: true,
      loading: false,
      form: {
        username: '',
        email: '',
        password: '',
        agreement: false
      }
    };
  },
  computed: {
    userNameValidate() {
      if (!this.form.username) {
        return this.$i18n.t('feedback.require', {
          e: this.$i18n.t('username')
        });
      } else if ((this.form.username || '').length < 5) {
        return this.$i18n.t('feedback.length.error', { e: 5 });
      }
      return false;
    },
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
    async onSubmit() {
      this.loading = true;
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.form.email,
          this.form.password
        );
        this.$bvToast.toast('Success', {
          title: '註冊成功',
          variant: 'success',
          solid: true
        });
        this.$router.push('/login');
      } catch (e) {
        this.$bvToast.toast('Error', {
          title: e.toLocaleString(),
          variant: 'danger',
          solid: true
        });
      }
      this.loading = false;
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
  max-height: calc(100vh - $header-height);
}
</style>
