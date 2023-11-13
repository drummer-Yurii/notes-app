<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSignOut, useUserId } from '@nhost/vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';

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

const { 
        loading: notesLoadin, 
        result: notesResult, 
        refetch: notesRefetch 
    } = useQuery(gql`
    query ($userId: String!) {
        notes (
            order_by: { created: desc },
            where: { user_id: { _eq: $userId }}
        ) {
            id,
            title,
            content,
            created
        }
    }
`, { userId: userId.value })
</script>

<template>
    <main>
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold">My Notes App</h1>
            <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
        </div>

        <form @submit.prevent="">
            <label class="block mb-4">
                <span class="block text-sm uppercase mb-2">Title</span>
                <input 
                    type="text" 
                    v-model="newNote.title" 
                    placeholder="What's the title?"
                    class="block w-full text-slate-800 px-4 py-2"
                />
            </label>
            <label class="block mb-4">
                <span class="block text-sm uppercase mb-2">Content</span>
                <textarea
                    v-model="newNote.content" 
                    placeholder="Write your content"
                    class="block w-full text-slate-800 px-4 py-2"
                >
                </textarea>
            </label>
            <input 
                type="submit" 
                value="Create note"
                class="text-green-500 hover:underline cursor-pointer" 
            />
        </form>
    </main>
</template>