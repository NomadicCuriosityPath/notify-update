<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { langDataMapType, langType } from ".";
  const dispatch = createEventDispatcher();

  export let info: any = "";
  export let langDataObj: langDataMapType = {
    zh: {
      title: "有新版本发布，是否更新?",
      ignore: "忽略",
      upgrade: "更新",
    },
    en: {
      title: "A new version has been released, would you like to update?",
      ignore: "ignore",
      upgrade: "upgrade",
    },
  };
  export let lang: langType = "zh";
  export let langData = langDataObj[lang] || {
    title: "有新版本发布，是否更新?",
    ignore: "忽略",
    upgrade: "更新",
  };

  function upgrade() {
    dispatch("upgrade");
  }
  function ignore() {
    dispatch("ignore");
  }
</script>

<main class="raiden-version-notice">
  <div class="raiden-version-notice-body">
    <div class="notice-title">{langData.title}</div>
    <div class="notice-content">
      {#each info as text}
        <div>{text}</div>
      {/each}
    </div>
    <div class="notice-handle">
      <button class="notice-handle-btn btn-text" on:click={ignore}
        >{langData.ignore}</button
      >
      <button class="notice-handle-btn btn-primary" on:click={upgrade}
        >{langData.upgrade}</button
      >
    </div>
  </div>
</main>

<style>
  .raiden-version-notice {
    box-sizing: border-box;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum";
    position: fixed;
    z-index: 10000;
    margin: 0 24px 0 0;
    right: 0px;
    top: 24px;
    bottom: auto;
  }
  .raiden-version-notice-body {
    position: relative;
    width: 300px;
    max-width: calc(60vw);
    margin-bottom: 16px;
    margin-left: auto;
    overflow: hidden;
    background: #fff;
    padding: 16px 24px;
    line-height: 1.5715;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  .notice-title {
    margin-bottom: 8px;
    color: #1890ff;
    font-size: 16px;
    line-height: 24px;
  }
  .notice-content {
    font-size: 14px;
  }
  .notice-handle {
    text-align: right;
    margin-top: 8px;
  }
  .notice-handle-btn {
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    padding: 2px 8px;
    font-size: 14px;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.85);
    background: #fff;
    border: 1px solid #d9d9d9;
    margin-left: 8px;
  }
  .btn-primary {
    color: #fff;
    background: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  }
  .btn-text {
    color: #ff4d4f;
    background: 0 0;
    border-color: transparent;
    box-shadow: none;
  }
</style>
