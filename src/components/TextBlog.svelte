<script>
    import marked from 'marked'
    export let data;
</script>

<div class="w-full rounded border overflow-hidden p-5 my-2 bg-white">
    <h1 class="text-lg font-medium mb-4">{data.title}</h1>
    <p class="text-sm">{@html marked(data.content)}</p>
</div>
