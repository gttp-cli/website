<script lang="ts">
    import {Textarea} from "$lib/components/ui/textarea"
    import {cn} from "$lib/utils";

    let template: string
    let parsedTemplate: string = ""
    let errors: string[] = []

    const api = "https://api.gttp.dev/api/v1/parse"

    function keyDown(e: KeyboardEvent) {
        if (e.key === "Tab") {
            e.preventDefault()
            const start = this.selectionStart
            const end = this.selectionEnd
            template = template.substring(0, start) + "  " + template.substring(end)
            this.selectionStart = this.selectionEnd = start + 2
        }

        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({template})
        }).then(res => res.json()).then(data => {
            parsedTemplate = data.rendered
            errors = []
            errors = data.errors
        })
    }
</script>
<div class="flex justify-center">
    <div class="max-w-screen-lg w-full px-8">
        <div>
            <Textarea
                    on:keyup={keyDown}
                    class={cn("h-96")}
                    bind:value={template}
            />
        </div>
        <div class="mt-16">
            {#if errors && errors.length > 0}
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Error</strong>
                    <ul class="list-disc list-inside">
                        {#each errors as error}
                            <li>{error}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
            <pre>
                {parsedTemplate}
            </pre>
        </div>
    </div>
</div>
