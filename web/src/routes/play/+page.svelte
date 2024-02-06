<script lang="ts">
    import Combobox from "$lib/components/ui/combobox/combobox.svelte";
</script>
<div class="flex justify-center">
    <div class="max-w-screen-lg w-full px-8">
        <div>
            <Combobox options={[
                {value: "a", label: "A"},
                {value: "b", label: "B"},
                {value: "c", label: "C"},
            ]} multi={true}/>
        </div>
    </div>
</div>
