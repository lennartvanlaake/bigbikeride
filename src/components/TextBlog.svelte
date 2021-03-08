<script>
    import marked from "marked";
    import { afterUpdate } from "svelte";

    export let data;

    let overflows = false;
    let blogContent;

    afterUpdate(() => {
        overflows = contentOverflows();
    });

    function contentOverflows() {
        console.log("Checking overflow of" + blogContent)
        if (!blogContent) return false;
        console.log("Client height: " + blogContent.clientHeight)
        console.log("Scroll height: " + blogContent.scrollHeight)
        if ((blogContent.scrollHeight - blogContent.clientHeight) > 20) {
            return true;
        } else {
            return false;
        }
    }

</script>

<div class="w-full rounded border p-5 my-2 bg-white text-container">
    <h1 class="text-lg font-medium mb-4">{data.title}</h1>
    <div
        class="text-sm max-h-36 overflow-hidden blog-content p-2"
        bind:this={blogContent}
    >
        {#if overflows}
            <div class="fadeout-overlay transition-all ease-in-out" />
            <strong
                class="bg-white
        text-gray-400
        absolute
        bottom-0
        z-40
        font-semibold
        hover:text-gray-600
        left-1/2
        -ml-10"
            >
                Show content
            </strong>
        {/if}
        {@html marked(data.content)}
    </div>
</div>

<!--         class:invisible="{fadeOut}"
        on:click="{fadeOut = !fadeOut}" -->
<style>
    .blog-content {
        position: relative;
    }
    .fadeout-overlay {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        padding-bottom: 10px;
        background-image: linear-gradient(
            to bottom,
            transparent 10%,
            white 75%,
            white 100%
        );
        z-index: 30;
    }
</style>
