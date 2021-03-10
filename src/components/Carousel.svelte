<script>
    export let images;
    let index = 0;
    $: currentImage = images[index % images.length]
    function next() {
        index++;
    };

    //{
//   "id": "757fc2be-eec8-4c81-92b8-fdc1ad0c1b15",
//   "path": "public/1615384250384.png",
//   "description": "Svelte logo\n",
//   "timestamp": "2021-03-10T13:50:50.401"
// }
</script>
<div class="relative" on:click={next}>
    <img class="object-cover w-full" src={currentImage.path} alt={currentImage.description}/>
    { #if currentImage.description }
    <p class="text-gray-800 py-2 text-center">{currentImage.description}</p>
    { /if }
</div>
