<script lang="ts">
  import "../app.pcss"

  import { ModeWatcher } from "mode-watcher";
  import Navbar from "$lib/components/navbar.svelte";
</script>

<ModeWatcher />
<Navbar />
<slot />
