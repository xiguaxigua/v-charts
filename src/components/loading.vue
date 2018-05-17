<template>
  <div class="v-charts-component-loading">
    <div class="loader">
      <div class="loading-spinner">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style>
.v-charts-component-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, .9);
  z-index: 10;
}

.v-charts-component-loading .circular {
  width: 42px;
  height: 42px;
  animation: loading-rotate 2s linear infinite;
}

.v-charts-component-loading .path {
  animation: loading-dash 1.5s ease-in-out infinite;

  stroke: #20a0ff;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 2;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
