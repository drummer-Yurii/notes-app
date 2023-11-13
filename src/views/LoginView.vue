<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/vue';

const router = useRouter();

const isRegister = ref(false);

const email = ref('');
const password = ref('');

const { signUpEmailPassword } = useSignUpEmailPassword();
const { signInEmailPassword } = useSignInEmailPassword();

const registerOrLogin = async async => {
    if (!email.value || !password.value) {
        return alert("Please fill in all fiealds!")
    }

    const res = isRegister.value
        ? await signUpEmailPassword(email.value, password.value)
        : await signInEmailPassword(email.value, password.value)

    if (res.isError) return alert(res.error.message)
    router.push('/');
}
</script>

<template>
    <main>
        Login
    </main>
</template>