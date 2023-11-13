<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSignOut, useUserId } from '@nhost/vue';

const router = useRouter();
const { signOut } = useSignOut();
const userId = useUserId();

const newNote = ref({
    title: '',
    content: '',
});

const logout = () => {
    signOut()
    router.push('/login')
}
</script>

<template>
    <main>
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold">My Notes App</h1>
            <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
        </div>
    </main>
</template>