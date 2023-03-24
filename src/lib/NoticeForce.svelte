<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const langDataMap = {
    zh: {
      title: "有新版本发布，是否更新?",
      ignore: "忽略",
      upgrade: "更新",
    },
    en: {
      title: "There is a new version released, whether to update?",
      ignore: "ignore",
      upgrade: "upgrade",
    },
  };

  export let info = "";
  export let lang = "zh";
  export let langData = langDataMap[lang || "zh"] || {};

  function upgrade() {
    dispatch("upgrade");
  }
  function ignore() {
    dispatch("ignore");
  }
</script>

<main class="raiden-version-modal">
  <div class="raiden-version-notice">
    <div class="raiden-version-notice-body">
      <div class="notice-title">
        {langData.title}
        <div class="notice-close" on:click={ignore}>x</div>
      </div>
      <div class="notice-content">
        {#each info as text}
          <div>{text}</div>
        {/each}
      </div>
      <div class="notice-handle">
        <button class="notice-handle-btn btn-primary" on:click={upgrade}>
          {langData.upgrade}
        </button>
      </div>
    </div>
  </div>
</main>

<style>
  .raiden-version-modal {
    font-variant: tabular-nums;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-feature-settings: "tnum";
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.4);
  }
  .raiden-version-notice {
    box-sizing: border-box;
    line-height: 1.5715;
    list-style: none;
    padding: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .raiden-version-notice-body {
    position: relative;
    width: 384px;
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
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    color: #1890ff;
    font-size: 16px;
    line-height: 24px;
  }
  .notice-close {
    cursor: pointer;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
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
