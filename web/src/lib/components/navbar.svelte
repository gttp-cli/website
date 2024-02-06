<script>
import {toggleMode} from "mode-watcher";
import {Moon, Sun} from "lucide-svelte";
import {Button} from "$lib/components/ui/button";
</script>

<nav class="px-8 h-16 flex p-2 justify-between items-center mb-16 border-b border-gray-700">
    <!-- Logo -->
    <div>
        <a href="/" class="flex items-center justify-center font-bold text-lg">
            GTTP.dev
        </a>
    </div>

    <!-- Links -->
    <div class="flex items-center space-x-4">
        <a href="/play" class="hover:scale-105">Playground</a>
        <a href="https://github.com/gttp-cli/gttp" class="hover:scale-105">GitHub</a>
        <a href="https://docs.gttp.dev" class="hover:scale-105">Docs</a>
    </div>

    <!-- Darkmode Switch -->
    <div class="flex items-center space-x-4">
        <Button on:click={toggleMode} variant="outline" size="icon">
            <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            <span class="sr-only">Toggle theme</span>
        </Button>
    </div>
</nav>

