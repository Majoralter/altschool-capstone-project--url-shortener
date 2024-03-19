<template>
  <form @submit.prevent="handleUserAuth(emailRef, passwordRef)">
    <h1>
      {{ route.params.slug === 'sign-up' ? "Sign up" : "Welcome back" }}
    </h1>
    <div class="fields sign-up" v-if="route.params.slug === 'sign-up'">
      <button class="alt-sign-in--button" type="button" @click="signInWithOAuth">Sign in with Github</button>
      <span class="divider">
        <hr> OR
        <hr>
      </span>
      <div class="field">
        <label for="email">Email address</label>
        <input type="email" id="email" v-model="emailRef" required>
      </div>
      <div class="field">
        <label class="input-label" :class="{ error: hasError }" for="password"><input type="password" id="password"
            placeholder="Password" v-model="passwordRef" ref="passwordElRef" required>
          <button type="button" @click="showHidePasswordInput(passwordElRef)">toggle</button></label>
      </div>
      <div class="field">
        <label class="input-label" :class="{ error: hasError }" for="confirm-password"><input type="password"
            v-model="confirmPasswordRef" id="confirm-password" placeholder="Confirm password" ref="confirmPasswordElRef"
            required> <button type="button" @click="showHidePasswordInput(confirmPasswordElRef)">toggle</button></label>
      </div>
      <button class="submit--button">
        <Loader spanDimension="20px" v-if="isAuthenticatingUser" />
        <span v-else>Create your account</span>
      </button>

      <router-link to="/authenticate/login">
        Have an account? Login instead
      </router-link>
    </div>

    <div class="fields login" v-if="route.params.slug === 'login'">
      <button class="alt-sign-in--button" type="button" @click="signInWithOAuth">Sign in with Github</button>
      <span class="divider">
        <hr> OR
        <hr>
      </span>
      <div class="field">
        <label for="email">Email address</label>
        <input type="email" id="email" v-model="emailRef" required>
      </div>
      <div class="field">
        <label class="input-label" for="password"><input type="password" id="password" placeholder="Password"
            v-model="passwordRef" ref="passwordElRef" required>
          <button type="button" @click="showHidePasswordInput(passwordElRef)">toggle</button></label>
      </div>
      <button class="submit--button">
        <Loader spanDimension="20px" v-if="isAuthenticatingUser" />
        <span v-else>Login</span>
      </button>
      <router-link to="/authenticate/sign-up">
        Don't have an account? Sign up instead
      </router-link>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '@/lib/supabaseClient';
import Loader from '@/components/Loader.vue';

export default defineComponent({
  name: 'AuthenticateUser',

  components: {
    Loader
  },


  setup() {
    const emailRef: Ref<string> = ref("")
    const passwordRef: Ref<string> = ref("")
    const confirmPasswordRef: Ref<string> = ref("")
    const hasError: Ref<Boolean> = ref(false)
    const isAuthenticatingUser: Ref<Boolean> = ref(false)
    const passwordElRef: Ref<HTMLInputElement | undefined> = ref()
    const confirmPasswordElRef: Ref<HTMLInputElement | undefined> = ref()
    const route = useRoute()
    const redirectURL: Ref<string> = ref("")

    const showHidePasswordInput = (inputEl: HTMLInputElement | undefined): void => {
      if (inputEl) {
        if (inputEl.type === 'password') inputEl.type = 'text'
        else inputEl.type = 'password'
      } else {
        return
      }
    }

    const signInWithOAuth = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redirectURL.value
        }
      })
    }

    const handleUserAuth = async (userEmail: string, userPassword: string) => {
      if (passwordRef.value !== confirmPasswordRef.value && route.params.slug === "sign-up") {
        hasError.value = true
        return
      }

      if (route.params.slug === 'sign-up') {
        hasError.value = false
        isAuthenticatingUser.value = true

        try {
          const response = await supabase.auth.signUp({
            email: userEmail,
            password: userPassword
          })

          if (response) {
            isAuthenticatingUser.value = false
            window.location.href = redirectURL.value
          }
        } catch (error: any) {
          console.log(error.message)
        }
      }

      if (route.params.slug === 'login') {
        hasError.value = false
        isAuthenticatingUser.value = true

        try {
          const response = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword
          })
          if (response) {
            isAuthenticatingUser.value = false
            window.location.href = redirectURL.value
          }
          console.log(response)
        } catch (error: any) {
          console.log(error.message)
        }
      }
    }

    onMounted(() => {
      redirectURL.value = `${window.location.origin}/user/dashboard`
    })

    return {
      emailRef,
      passwordRef,
      confirmPasswordRef,
      handleUserAuth,
      route, hasError,
      passwordElRef,
      confirmPasswordElRef,
      showHidePasswordInput,
      isAuthenticatingUser,
      signInWithOAuth
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../sass/app.scss";

form {
  @include flex(column, center, center, 1em);
  height: 75dvh;

  h1 {
    color: $black;
  }

  .fields {
    @include flex(column, center, center, 1em);
    width: 40%;
    padding: 2em;
    background-color: $white;
    box-shadow: var(--shadow-2);
    border-radius: var(--radius-2);

    .alt-sign-in--button {
      width: 100%;
      padding-block: 8px;
      border: none;
      background-color: $black;
      color: $white;
      font-size: var(--font-size-3);
      border-radius: var(--radius-2);
      cursor: pointer;
    }

    .divider {
      display: inline-block;
      width: 100%;
      @include flex(row, center, center, .4em);

      hr {
        width: 100%;
      }
    }

    .field {
      width: 100%;
      @include flex(column, flex-start, flex-start, .4em);

      input {
        padding-block: 8px;
        padding-inline-start: 4px;
        width: 100%;
        border-radius: var(--radius-2);
        border: solid var(--border-size-1) $dark-gray;
        font-size: var(--font-size-2);

        &:focus {
          outline: solid var(--border-size-2) $light-green;
        }
      }

      label {
        color: $black;
        font-size: var(--font-size-2);
      }

      .input-label {
        width: 100%;
        border: solid var(--border-size-1) $dark-gray;
        padding-inline-end: 4px;
        @include flex(row, center, space-between, 0);
        border-radius: var(--radius-2);
        position: relative;

        &.error {
          outline: solid var(--border-size-1) #FF1F1F;
          border: none;
          animation: var(--animation-shake-x);

          &::after {
            display: block;
            position: absolute;
            top: -30%;
            left: 20px;
            color: #FF1F1F;
            background-color: $white;
            padding: .1em;
            content: "passwords don't match!";
            font-size: 12px;
          }
        }

        &:focus-within {
          outline: solid var(--border-size-2) $light-green;

          input {
            outline: none;
          }
        }

        input {
          width: 90%;
          border: none;

          &::placeholder {
            font-size: var(--font-size-2);
            color: $black;
          }
        }

        button {
          padding: 4px 8px;
          border: none;
          background-color: #191716;
          color: $white;
          border-radius: var(--radius-1);
          cursor: pointer;
        }
      }
    }

    .submit--button {
      width: 100%;
      padding-block: 8px;
      font-size: var(--font-size-3);
      border: none;
      background-color: $green;
      color: $black;
      border-radius: var(--radius-2);
      cursor: pointer;
      transform: all .3s var(--ease-3);

      &:hover {
        transform: scale(.99);
      }
    }
  }
}

@media (max-width: 768px) {
  form {
    .fields {
      width: 90%;
      padding: var(--size-3);
    }
  }
}
</style>
