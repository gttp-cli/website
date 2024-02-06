<script lang="ts">
    import {Check, ChevronsUpDown} from "lucide-svelte"
    import * as Command from "$lib/components/ui/command"
    import * as Popover from "$lib/components/ui/popover"
    import {Button} from "$lib/components/ui/button"
    import {cn} from "$lib/utils"
    import {tick} from "svelte"

    export let multi: boolean = false

    export let options = [
        {value: "Option 1", label: "option 1"},
        {value: "Option 2", label: "option 2"},
        {value: "Option 3", label: "option 3"},
        {value: "Option 4", label: "option 4"},
        {value: "Option 5", label: "option 5"},
    ]

    let open = false
    let value = multi ? [] : ""
    let triggerButton // Reference to the trigger button

    $: selectedValue = multi
        ? options.filter(f => value.includes(f.value)).map(f => f.label).join(", ") || "Select frameworks..."
        : options.find(f => f.value === value)?.label ?? "Select a framework..."

    function closeAndFocusTrigger() {
        open = false
        tick().then(() => {
            triggerButton.focus()
        })
    }

    function updateValue(currentValue: string) {
        if (multi) {
            const index = value.indexOf(currentValue)
            if (index > -1) {
                value = [...value.slice(0, index), ...value.slice(index + 1)]
            } else {
                value = [...value, currentValue]
            }
        } else {
            value = currentValue
        }
        closeAndFocusTrigger()
    }
</script>

<Popover.Root bind:open>
    <Popover.Trigger asChild let:builder>
        <Button
                builders={[builder]}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                class="w-[200px] justify-between"
                bind:this={triggerButton}
        >
            {selectedValue}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
    </Popover.Trigger>
    <Popover.Content class="w-[200px] p-0">
        <Command.Root>
            <Command.Input placeholder="Search framework..."/>
            <Command.Empty>No framework found.</Command.Empty>
            <Command.Group>
                {#each options as option}
                    <Command.Item
                            value={option.value}
                            onSelect={() => updateValue(option.value)}
                    >
                        {#if multi}
                            <Check
                                    class={cn("mr-2 h-4 w-4", {
                                        "opacity-0": !value.includes(option.value),
                                    })}
                            />
                        {:else}
                            <Check
                                    class={cn("mr-2 h-4 w-4", {
                                        "opacity-0": value !== option.value,
                                    })}
                            />
                        {/if}
                        {option.label}
                    </Command.Item>
                {/each}
            </Command.Group>
        </Command.Root>
    </Popover.Content>
</Popover.Root>
