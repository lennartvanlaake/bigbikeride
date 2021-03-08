<script>
    import marked from "marked";
    import { afterUpdate } from "svelte";
	import { fade } from 'svelte/transition';
    export let data;

    let overflows = false;
    let hideOverflow = true;
    let blogContent;

    afterUpdate(() => {
        if (overflows) return;
        overflows = contentOverflows();
    });

    function contentOverflows() {
        if (!blogContent) return false;
        if ((blogContent.scrollHeight - blogContent.clientHeight) > 20) {
            return true;
        } else {
            return false;
        }
    };

    function toggleShowContent() {
        hideOverflow = !hideOverflow;
    };

</script>

<div class="w-full rounded border p-5 my-2 bg-white text-container">
    <h1 class="text-lg font-medium mb-4">{data.title}</h1>
    <div
        class="text-sm overflow-hidden blog-content p-2"
        class:hide-overflow="{hideOverflow}"
        class:display-overflow="{!hideOverflow}"
        bind:this={blogContent}  >
        { #if overflows && hideOverflow }
            <div class="fadeout-overlay" transition:fade/>
        { /if }

        { #if overflows  }
            <strong class="bg-white
                text-gray-400
                absolute
                bottom-0
                z-40
                font-semibold
                hover:text-gray-600
                left-1/2
                -ml-10"
            on:click={toggleShowContent}>
            { #if hideOverflow }
                Show content
            { :else }
                Hide content
            { /if }
            </strong>
        { /if }

            
        {@html marked(data.content)}
    </div>
</div>

<style>
    .hide-overflow {
        max-height: 9rem;
        transition: max-height 1s ease-out;
    }
    .display-overflow {
        max-height: 1000rem;
        transition: max-height 2s ease-in;
    }
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
