<script setup lang="ts">
import type { Post, TimeLinePost } from '@/posts'
import { useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'
import { usePostStore } from '@/stores/posts'

const route = useRouter()

const emit = defineEmits<{
  (e: 'savepost', payload: Post): void
}>()
const props = defineProps<{
  post: TimeLinePost | Post
}>()
const postStore = usePostStore()

const title = ref(props.post.title)
const content = ref(props.post.markup)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

onMounted(() => {
  if (!contentEditable.value) {
    throw new Error('Condent Editable dom node was not found')
  }
  contentEditable.value.innerText = content.value
})

// watchEffect(() => {
//   marked.parse(content.value, (err: any, parseReslt: any) => {
//     html.value = parseReslt
//   })
// })

function parseHtml(markup: string) {
  marked.parse(
    markup,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAuto(code).value
      }
    },
    (err: any, parseReslt: any) => {
      html.value = parseReslt
    }
  )
}

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent)
  }, 250),
  {
    immediate: true //calls when component loaded
  }
)

// marked.parse(content.value, (err: any, parseReslt: any) => {
//   html.value = parseReslt
//   console.log(html.value    )
// })

function handleInput() {
  if (!contentEditable.value) {
    throw new Error('Condent Editable dom node was not found')
  }
  content.value = contentEditable.value?.innerText
}
async function handleClick() {
  const post: Post = {
    ...props.post,
    created:
      typeof props.post.created == 'string' ? props.post.created : props.post.created.toISO(),
    title: title.value,
    last_updated:
      typeof props.post.last_updated == 'string'
        ? props.post.last_updated
        : props.post.last_updated!.toISO(),
    markup: content.value,
    html: html.value
  }
  emit('savepost', post)
}
</script>
<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title" />
      </div>
      <div class="columns">
        <div class="column">
          <div contenteditable ref="contentEditable" @input="handleInput()" />
        </div>
        <div class="column">
          <div v-html="html"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick()">Save Post</button>
    </div>
  </div>
</template>

<style scoped></style>
